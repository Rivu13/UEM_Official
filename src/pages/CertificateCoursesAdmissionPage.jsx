import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AdmissionStepper from "../components/admissions/AdmissionStepper"
import PaymentResultModal from "../components/admissions/PaymentResultModal"
import NewsAchievementsSection from "../components/home/NewsAchievementsSection"
import {
  createRazorpayOrder,
  fetchPaymentCatalog,
  loadRazorpayScript,
  openRazorpayCheckout,
  verifyRazorpayPayment,
} from "../utils/razorpay"
import { toDigitsOnly } from "../utils/inputFormatters"

const CATALOG_ENDPOINT = "payment/catalog?type=certificate"
const CREATE_ORDER_ENDPOINT = "payment/order"
const VERIFY_PAYMENT_ENDPOINT = "payment/verify"

const INITIAL_FORM_DATA = { name: "", email: "", phone: "", course: "" }

const LEVEL_BUCKETS = [
  { bucket: "Beginner", levels: ["A1", "A2"] },
  { bucket: "Intermediate", levels: ["B1", "B2"] },
  { bucket: "Advanced", levels: ["C1", "C2"] },
]

const steps = [
  { id: 1, label: "Personal Details" },
  { id: 2, label: "Registration" },
]

const inputClassName =
  "w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/10"

const navyButtonClassName =
  "rounded-md bg-brand-navy px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-navy-light"

const grayButtonClassName =
  "rounded-md bg-slate-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-slate-600"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function CertificateCoursesAdmissionPage() {
  const [step, setStep] = useState(1)
  const [catalog, setCatalog] = useState({ status: "loading", general: [], languages: [], levels: [], keyId: "" })
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState(null)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)

  useEffect(() => {
    fetchPaymentCatalog(CATALOG_ENDPOINT)
      .then((data) =>
        setCatalog({
          status: "ready",
          general: data.certificate?.general ?? [],
          languages: data.certificate?.language?.languages ?? [],
          levels: data.certificate?.language?.levels ?? [],
          keyId: data.keyId,
        }),
      )
      .catch((error) =>
        setCatalog({ status: "error", general: [], languages: [], levels: [], keyId: "", message: error.message }),
      )
  }, [])

  const isLanguageCourse = formData.course.startsWith("language:")
  const [selectedLanguage, selectedLevel] = isLanguageCourse
    ? formData.course.slice("language:".length).split("||")
    : [null, null]
  const selectedGeneral = catalog.general.find((course) => `general:${course.code}` === formData.course)
  const selectedFee = isLanguageCourse
    ? catalog.levels.find((l) => l.level === selectedLevel)?.amountDisplay ?? 0
    : selectedGeneral?.amountDisplay ?? 0

  const updateField = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))

  const updatePhone = (e) => setFormData((prev) => ({ ...prev, phone: toDigitsOnly(e.target.value, 10) }))

  const goToStep2 = () => {
    const nextErrors = {}
    if (!formData.name.trim()) nextErrors.name = "Name is required."
    if (!formData.email.trim()) nextErrors.email = "Email is required."
    else if (!emailPattern.test(formData.email.trim())) nextErrors.email = "Enter a valid email address."
    if (!formData.phone.trim()) nextErrors.phone = "Phone number is required."
    else if (formData.phone.length !== 10) nextErrors.phone = "Enter a valid 10-digit phone number."

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setStep(2)
  }

  const goBackToStep1 = () => {
    setErrors({})
    setStep(1)
  }

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA)
    setErrors({})
    setStep(1)
  }

  const handleMakePayment = async () => {
    const nextErrors = {}
    if (!formData.course) nextErrors.course = "Please select a course."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsProcessing(true)

    try {
      const course = isLanguageCourse
        ? { category: "LANGUAGE", language: selectedLanguage, level: selectedLevel }
        : { category: "GENERAL", courseCode: selectedGeneral?.code }

      const order = await createRazorpayOrder(CREATE_ORDER_ENDPOINT, {
        formType: "CERTIFICATE",
        course,
        applicant: { name: formData.name, email: formData.email, phone: formData.phone },
      })

      await loadRazorpayScript()

      openRazorpayCheckout({
        order,
        amountRupees: selectedFee,
        keyId: catalog.keyId,
        name: "UEM Certificate Course Admission",
        description: isLanguageCourse ? `${selectedLanguage} ${selectedLevel}` : selectedGeneral?.name,
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        onSuccess: async (response) => {
          try {
            await verifyRazorpayPayment(VERIFY_PAYMENT_ENDPOINT, response)
            setPaymentResult({ state: "success", paymentId: response.razorpay_payment_id })
          } catch (error) {
            setPaymentResult({ state: "error", message: error.message })
          }
          resetForm()
        },
        onFailure: (error) => {
          setPaymentResult({ state: "error", message: error.message })
          resetForm()
        },
      })

      setIsProcessing(false)
    } catch (error) {
      setPaymentResult({ state: "error", message: error.message })
      setIsProcessing(false)
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-dark py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative mx-auto max-w-[1400px] px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-blue-200">
            <Link to="/" className="transition-colors hover:text-brand-gold">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Admission for Certificate Courses</span>
          </nav>
          <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            Admission for Certificate Courses
          </h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-brand-gold" />
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <AdmissionStepper currentStep={step} steps={steps} />

            {step === 1 && (
              <div className="mx-auto mt-10 max-w-xl">
                <label className="block text-sm font-semibold text-slate-800">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={updateField("name")}
                  className={`${inputClassName} mt-1.5 ${errors.name ? "border-red-400" : ""}`}
                />
                {errors.name && <p className="mt-1 text-xs font-semibold text-red-500">{errors.name}</p>}

                <label className="mt-5 block text-sm font-semibold text-slate-800">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={updateField("email")}
                  className={`${inputClassName} mt-1.5 ${errors.email ? "border-red-400" : ""}`}
                />
                {errors.email && <p className="mt-1 text-xs font-semibold text-red-500">{errors.email}</p>}

                <label className="mt-5 block text-sm font-semibold text-slate-800">
                  Phone<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={updatePhone}
                  className={`${inputClassName} mt-1.5 ${errors.phone ? "border-red-400" : ""}`}
                />
                {errors.phone && <p className="mt-1 text-xs font-semibold text-red-500">{errors.phone}</p>}

                <div className="mt-8 flex justify-end">
                  <button type="button" onClick={goToStep2} className={navyButtonClassName}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mx-auto mt-10 max-w-xl">
                <label className="block text-sm font-semibold text-slate-800">
                  Course<span className="text-red-500">*</span>
                </label>

                {catalog.status === "loading" && <p className="mt-1.5 text-sm text-slate-500">Loading courses…</p>}
                {catalog.status === "error" && (
                  <p className="mt-1.5 text-sm font-semibold text-red-600">
                    Could not load courses: {catalog.message}
                  </p>
                )}

                <select
                  value={formData.course}
                  onChange={updateField("course")}
                  disabled={catalog.status !== "ready"}
                  className={`${inputClassName} mt-1.5 ${errors.course ? "border-red-400" : ""}`}
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  <optgroup label="General">
                    {catalog.general.map((course) => (
                      <option key={course.code} value={`general:${course.code}`}>
                        {course.name} - {course.amountDisplay} INR
                      </option>
                    ))}
                  </optgroup>
                  {LEVEL_BUCKETS.map((bucket) => (
                    <optgroup key={bucket.bucket} label={bucket.bucket}>
                      {bucket.levels.map((level) => {
                        const fee = catalog.levels.find((l) => l.level === level)?.amountDisplay
                        return catalog.languages.map((language) => (
                          <option key={`${language}-${level}`} value={`language:${language}||${level}`}>
                            {language} {level} - {fee} INR
                          </option>
                        ))
                      })}
                    </optgroup>
                  ))}
                </select>
                {errors.course && <p className="mt-1 text-xs font-semibold text-red-500">{errors.course}</p>}

                <p className="mt-6 font-bold text-slate-800">Cancellation Policy</p>
                <p className="mt-1 text-sm text-slate-600">No refunds can be provided on the registration fee on cancellation.</p>

                <p className="mt-4 text-sm font-semibold text-slate-800">Total cost: {selectedFee} INR</p>

                <div className="mt-8 flex items-center justify-between">
                  <button type="button" onClick={goBackToStep1} className={grayButtonClassName}>
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleMakePayment}
                    disabled={isProcessing}
                    className="rounded-md bg-green-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isProcessing ? "Processing…" : "Make Payment"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="mt-8 font-bold text-slate-800">This provisional admission fees is non-refundable.</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            *Note: This is a provisional admission payment page. Your admission is subject to cancellation based on
            your fulfillment of admission criteria, and marksheet provided at the time of admission. Your marksheet
            needs to be deposited at the admission office in due time. The institute reserves the right to cancel
            your admission if any declaration of marks provided here is found to be incorrect.
          </p>
        </div>
      </section>

      <NewsAchievementsSection />

      <PaymentResultModal result={paymentResult} onClose={() => setPaymentResult(null)} />
    </>
  )
}
