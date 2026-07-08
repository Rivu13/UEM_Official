import { ImageIcon } from "lucide-react"

const gradients = [
  "from-slate-600 via-slate-700 to-slate-800",
  "from-indigo-600 via-slate-700 to-slate-800",
  "from-blue-600 via-slate-700 to-slate-800",
  "from-teal-600 via-slate-700 to-slate-800",
]

export default function PlaceholderImage({ label = "Replace with real image", seed = 0, className = "" }) {
  const gradient = gradients[seed % gradients.length]

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:20px_20px]" />
      <div className="relative flex flex-col items-center gap-1.5 px-3 text-center text-white/70">
        <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
        <span className="text-[10px] font-medium leading-tight">{label}</span>
      </div>
    </div>
  )
}
