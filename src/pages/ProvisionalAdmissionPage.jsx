import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AdmissionStepper from "../components/admissions/AdmissionStepper"
import NewsAchievementsSection from "../components/home/NewsAchievementsSection"
import ratingsImage from "../assets/images/Ratings.png"
import { createRazorpayOrder, fetchPaymentCatalog, loadRazorpayScript, openRazorpayCheckout } from "../utils/razorpay"
import { toDigitsOnly, toMarksValue } from "../utils/inputFormatters"

const CATALOG_ENDPOINT = "/api/v1/payment/catalog"
const CREATE_ORDER_ENDPOINT = "/api/v1/payment/order"
const FALLBACK_FEE = 5000

const inputClassName =
  "w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/10"

const navyButtonClassName =
  "rounded-md bg-brand-navy px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-navy-light"

const grayButtonClassName =
  "rounded-md bg-slate-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-slate-600"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ProvisionalAdmissionPage() {
  const [step, setStep] = useState(1)
  const [catalog, setCatalog] = useState({ status: "loading", groups: [], keyId: "" })
  const [paymentStatus, setPaymentStatus] = useState({ state: "idle" })
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    programCode: "",
    xthMarks: "",
    xiithMarks: "",
  })

  useEffect(() => {
    fetchPaymentCatalog(CATALOG_ENDPOINT)
      .then((data) =>
        setCatalog({ status: "ready", groups: data.provisional?.programs ?? [], keyId: data.keyId }),
      )
      .catch((error) => setCatalog({ status: "error", groups: [], keyId: "", message: error.message }))
  }, [])

  const selectedProgram = catalog.groups
    .flatMap((group) => group.programs.map((program) => ({ ...program, group: group.group })))
    .find((program) => program.code === formData.programCode)

  const updateField = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))

  const updatePhone = (e) => setFormData((prev) => ({ ...prev, phone: toDigitsOnly(e.target.value, 10) }))

  const updateMarks = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: toMarksValue(e.target.value) }))

  const goToStep2 = () => {
    const nextErrors = {}
    if (!formData.name.trim()) nextErrors.name = "Name is required."
    if (!formData.email.trim()) nextErrors.email = "Email is required."
    else if (!emailPattern.test(formData.email.trim())) nextErrors.email = "Enter a valid email address."
    if (!formData.phone.trim()) nextErrors.phone = "Phone number is required."

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setStep(2)
  }

  const goToStep3 = () => {
    const nextErrors = {}
    if (!formData.programCode) nextErrors.programCode = "Please select a registration type."

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setStep(3)
  }

  const goBack = (targetStep) => {
    setErrors({})
    setStep(targetStep)
  }

  const handleMakePayment = async () => {
    setPaymentStatus({ state: "processing" })

    try {
      // NOTE: the exact field name the backend expects for the selected program could not be
      // confirmed — every combination tried (code, program.code, program.programCode, course.courseCode,
      // top-level programCode, with/without `group`) returned "Invalid or unavailable program selection".
      // This is the best structural guess (mirrors the confirmed-working certificate `course` shape).
      // Check the backend's /api/v1/payment/order controller for the real field name if this 400s.
      const order = await createRazorpayOrder(CREATE_ORDER_ENDPOINT, {
        formType: "PROVISIONAL",
        program: { group: selectedProgram?.group, code: formData.programCode },
        applicant: { name: formData.name, email: formData.email, phone: formData.phone },
      })

      await loadRazorpayScript()

      openRazorpayCheckout({
        order,
        amountRupees: selectedProgram?.amountDisplay ?? FALLBACK_FEE,
        keyId: catalog.keyId,
        name: "UEM Provisional Admission",
        description: `Provisional Admission — ${selectedProgram?.name ?? ""}`,
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        onSuccess: (response) =>
          setPaymentStatus({ state: "success", paymentId: response.razorpay_payment_id }),
        onFailure: (error) => setPaymentStatus({ state: "error", message: error.message }),
      })

      setPaymentStatus({ state: "idle" })
    } catch (error) {
      setPaymentStatus({ state: "error", message: error.message })
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-dark py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative mx-auto max-w-[1400px] px-6">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-gold">
            University of Engineering &amp; Management Jaipur
          </p>
          <nav className="mt-2 flex items-center gap-2 text-xs font-semibold text-blue-200">
            <Link to="/" className="transition-colors hover:text-brand-gold">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Provisional Admission</span>
          </nav>
          <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">Provisional Admission</h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-brand-gold" />
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <AdmissionStepper currentStep={step} />

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
                  Registration Type<span className="text-red-500">*</span>
                </label>

                {catalog.status === "loading" && <p className="mt-1.5 text-sm text-slate-500">Loading programs…</p>}
                {catalog.status === "error" && (
                  <p className="mt-1.5 text-sm font-semibold text-red-600">
                    Could not load programs: {catalog.message}
                  </p>
                )}

                <select
                  value={formData.programCode}
                  onChange={updateField("programCode")}
                  disabled={catalog.status !== "ready"}
                  className={`${inputClassName} mt-1.5 ${errors.programCode ? "border-red-400" : ""}`}
                >
                  <option value="" disabled>
                    Select Registration Type
                  </option>
                  {catalog.groups.map((group) => (
                    <optgroup key={group.group} label={group.group}>
                      {group.programs.map((program) => (
                        <option key={program.code} value={program.code}>
                          {program.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {errors.programCode && (
                  <p className="mt-1 text-xs font-semibold text-red-500">{errors.programCode}</p>
                )}

                <label className="mt-5 block text-sm font-semibold text-slate-800">Xth Marks</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Enter 10th Marks"
                  value={formData.xthMarks}
                  onChange={updateMarks("xthMarks")}
                  className={`${inputClassName} mt-1.5`}
                />

                <label className="mt-5 block text-sm font-semibold text-slate-800">XIIth Marks</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Enter 12th Marks"
                  value={formData.xiithMarks}
                  onChange={updateMarks("xiithMarks")}
                  className={`${inputClassName} mt-1.5`}
                />

                <div className="mt-8 flex justify-between">
                  <button type="button" onClick={() => goBack(1)} className={grayButtonClassName}>
                    Previous
                  </button>
                  <button type="button" onClick={goToStep3} className={navyButtonClassName}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mx-auto mt-10 max-w-2xl">
                <p className="font-bold text-slate-800">This provisional admission fees is non-refundable.</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  *Note: This is a provisional admission payment page. Your admission is subject to cancellation
                  based on your fulfillment of admission criteria, and marksheet provided at the time of admission.
                  Your marksheet needs to be deposited at the admission office in due time. The institute reserves
                  the right to cancel your admission if any declaration of marks provided here is found to be
                  incorrect.
                </p>
                <p className="mt-3 text-sm font-semibold text-slate-800">
                  Total cost: Rs. {selectedProgram?.amountDisplay ?? FALLBACK_FEE}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <button type="button" onClick={() => goBack(2)} className={grayButtonClassName}>
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleMakePayment}
                    disabled={paymentStatus.state === "processing"}
                    className="rounded-md bg-green-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {paymentStatus.state === "processing" ? "Processing…" : "Make Payment"}
                  </button>
                </div>

                {paymentStatus.state === "success" && (
                  <p className="mt-4 text-sm font-semibold text-green-700">
                    Payment successful! Reference ID: {paymentStatus.paymentId}
                  </p>
                )}
                {paymentStatus.state === "error" && (
                  <p className="mt-4 text-sm font-semibold text-red-600">{paymentStatus.message}</p>
                )}
              </div>
            )}
          </div>

          <div className="mt-10">
            <img src={ratingsImage} alt="Global Ratings — QS I-GAUGE, Indian University Ratings" className="h-auto w-full" />
          </div>
        </div>
      </section>

      <NewsAchievementsSection />
    </>
  )
}
