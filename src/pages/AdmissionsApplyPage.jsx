import { useState } from "react"
import { Link } from "react-router-dom"
import { Phone, Globe } from "lucide-react"
import naacLogo from "../assets/images/NAAC.png"
import whatsappLogo from "../assets/images/whatsapp.jpg"
import { admissionsContact } from "../data/admissionsContent"
import { siteConfig } from "../data/siteConfig"

export default function AdmissionsApplyPage() {
  const [appliedElsewhere, setAppliedElsewhere] = useState(true)

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
            <Link to="/admission/admissions" className="transition-colors hover:text-brand-gold">
              Admissions
            </Link>
            <span>/</span>
            <span className="text-white">Apply</span>
          </nav>
          <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">Apply for Admission</h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-brand-gold" />
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="flex items-center gap-3">
            <img src={naacLogo} alt="NAAC" className="h-12 w-auto object-contain" />
            <p className="text-sm font-bold text-brand-navy">Accredited by NAAC</p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-extrabold text-brand-navy sm:text-xl">Admissions</h2>

              <p className="mt-4 text-sm text-slate-600">For admissions from home through online method, call at:</p>
              <a
                href={`tel:+91${admissionsContact.phone}`}
                className="mt-1.5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
              >
                <Phone className="h-4 w-4" /> {admissionsContact.phone}
              </a>

              <p className="mt-4 text-sm text-slate-600">You may make WhatsApp video call at:</p>
              <a
                href={`https://wa.me/91${admissionsContact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
              >
                <img src={whatsappLogo} alt="WhatsApp" className="h-4 w-4 rounded-sm object-cover" />{" "}
                {admissionsContact.whatsapp}
              </a>

              <p className="mt-4 text-sm text-slate-600">Admissions may be taken online at:</p>
              <a
                href={admissionsContact.onlinePortal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline"
              >
                <Globe className="h-4 w-4" /> {admissionsContact.onlinePortal.label}
              </a>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Features include scanning all your documents, online payment, and receipt generation.
              </p>

              <a
                href={siteConfig.onlineAdmissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-lg bg-brand-navy px-6 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-brand-navy-light"
              >
                Apply for admission
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-base font-extrabold text-brand-navy sm:text-lg">
                  Have you applied for any national/state level/JEE-main/GATE?
                </h2>

                <div className="mt-4 flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="applied-elsewhere"
                      checked={appliedElsewhere}
                      onChange={() => setAppliedElsewhere(true)}
                      className="h-4 w-4 accent-brand-navy"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="applied-elsewhere"
                      checked={!appliedElsewhere}
                      onChange={() => setAppliedElsewhere(false)}
                      className="h-4 w-4 accent-brand-navy"
                    />
                    No
                  </label>
                </div>

                <Link
                  to={appliedElsewhere ? "/admission/provisional-admission" : "/"}
                  className="mt-6 inline-block rounded-lg bg-brand-navy px-6 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-brand-navy-light"
                >
                  {appliedElsewhere ? "Take Provisional Admission" : "Apply for IEMJEE"}
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-base font-extrabold text-brand-navy sm:text-lg">Certification Programs</h2>
                <p className="mt-2 text-sm text-slate-600">Take admission for certification programs here:</p>

                <Link
                  to="/admission/admissions/certificate-courses"
                  className="mt-6 inline-block rounded-lg bg-brand-navy px-6 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-brand-navy-light"
                >
                  Apply for Admission for Certificate Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
