import whatsappLogo from "../../assets/images/whatsapp.jpg"
import { siteConfig } from "../../data/siteConfig"

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full shadow-xl transition-transform duration-300 hover:scale-110"
    >
      <img src={whatsappLogo} alt="WhatsApp" className="h-full w-full object-cover" />
    </a>
  )
}
