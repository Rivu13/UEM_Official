import { Info } from "lucide-react"

export default function AdmissionsNotice({ notice }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-100/70 p-5 sm:p-6">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
      <p className="text-sm leading-relaxed text-amber-900">
        {notice.intro}{" "}
        {notice.addresses.map((addr, i) => (
          <span key={addr.label}>
            <span className="font-bold">{addr.label}:</span> {addr.text}
            {i < notice.addresses.length - 1 ? " | " : " | "}
          </span>
        ))}
        {notice.disclaimer} Our official website is{" "}
        <a
          href={notice.website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-700 underline hover:text-blue-900"
        >
          {notice.website.label}
        </a>{" "}
        | Helpline: <span className="font-bold">{notice.helpline}</span>
      </p>
    </div>
  )
}
