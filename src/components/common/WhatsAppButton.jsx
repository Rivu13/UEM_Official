import { MessageCircle } from "lucide-react"
import { siteConfig } from "../../data/siteConfig"

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition-transform duration-300 hover:scale-110"
    >
      <MessageCircle className="h-7 w-7 text-white" fill="white" />
    </a>
  )
}
