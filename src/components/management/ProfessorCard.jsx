import { ZoomIn } from "lucide-react"

export default function ProfessorCard({ member, onImageClick }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <button
        type="button"
        onClick={() => onImageClick(member)}
        aria-label={`Zoom into photo of ${member.name}`}
        className="group relative aspect-[4/5] w-full overflow-hidden bg-slate-100"
      >
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-brand-navy-dark/0 transition-colors duration-300 group-hover:bg-brand-navy-dark/30">
          <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-base font-extrabold text-brand-navy">{member.name}</p>
        <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-brand-gold-dark">{member.designation}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
      </div>
    </div>
  )
}
