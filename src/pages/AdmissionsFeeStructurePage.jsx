import { Link } from "react-router-dom"
import { admissionFeeRows } from "../data/admissionFeeStructure"
import { admissionOfficesNotice, paymentModes, neftDetails, feesNote } from "../data/admissionsContent"
import { siteConfig } from "../data/siteConfig"

function ApplyButton({ className = "" }) {
  return (
    <a
      href={siteConfig.onlineAdmissionUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-lg bg-brand-navy px-5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-brand-navy-light ${className}`}
    >
      Apply Online
    </a>
  )
}

export default function AdmissionsFeeStructurePage() {
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
            <span className="text-white">UEM Kolkata</span>
          </nav>
          <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">UEM Kolkata Admission</h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-brand-gold" />
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-extrabold text-brand-navy">Admission Helpline Number</p>
              <a
                href={`tel:+91${admissionOfficesNotice.helpline}`}
                className="text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                {admissionOfficesNotice.helpline}
              </a>
            </div>
            <ApplyButton className="px-8! py-3! text-sm!" />
          </div>

          <h2 className="mt-10 text-center text-xl font-extrabold text-brand-navy sm:text-2xl">
            Fees structure for 2026 admission batch
          </h2>

          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th className="px-4 py-3 font-bold">Course & Stream</th>
                  <th className="px-4 py-3 font-bold">Qualification</th>
                  <th className="px-4 py-3 font-bold">Entrance</th>
                  <th className="px-4 py-3 font-bold">Semester Fee</th>
                  <th className="px-4 py-3 font-bold">Admission</th>
                </tr>
              </thead>
              <tbody>
                {admissionFeeRows.map((row, i) => (
                  <tr key={row.id} className={i % 2 === 1 ? "bg-slate-50" : "bg-white"}>
                    <td className="px-4 py-4 align-top font-semibold text-brand-navy">
                      {row.course}
                      {row.duration && <div className="mt-0.5 text-xs font-medium text-slate-400">({row.duration})</div>}
                    </td>
                    <td className="px-4 py-4 align-top text-slate-600">
                      {row.qualification.map((q, j) => (
                        <div key={j}>{q}</div>
                      ))}
                    </td>
                    <td className="px-4 py-4 align-top text-slate-600">{row.entrance}</td>
                    <td className="px-4 py-4 align-top text-slate-600">
                      {row.fee.firstSem && <div>1st Sem: {row.fee.firstSem}</div>}
                      <div>{row.fee.laterSem}</div>
                      <div className="mt-1 font-semibold text-brand-navy">Total: {row.fee.total}</div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      {row.bookingAmount && (
                        <p className="mb-2 text-xs font-semibold text-slate-600">
                          Booking Amount: {row.bookingAmount}
                        </p>
                      )}
                      {row.showApplyButton && <ApplyButton />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-lg border border-amber-300 bg-amber-100/70 p-5 text-sm font-semibold leading-relaxed text-amber-900">
            {feesNote}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
              <h3 className="text-center text-base font-extrabold text-brand-navy sm:text-lg">Mode of Payment</h3>
              <p className="mt-4 text-sm text-slate-700">{paymentModes.methods}</p>
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-bold">DD Name:</span> {paymentModes.ddName}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-700">{paymentModes.bookingAmountNote}</p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {paymentModes.notes.map((note, i) => (
                  <li key={i} className="text-sm text-slate-600">
                    ✓ {note}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
              <h3 className="text-center text-base font-extrabold text-brand-navy sm:text-lg">{neftDetails.title}</h3>
              <p className="mt-4 text-sm text-slate-700">
                <span className="font-bold">A/C Name:</span> {neftDetails.accountName}
              </p>
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-bold">Bank's Name:</span> {neftDetails.bankName}
              </p>
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-bold">A/C No:</span> {neftDetails.accountNumber}
              </p>
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-bold">IFSC Code:</span> {neftDetails.ifscCode}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
