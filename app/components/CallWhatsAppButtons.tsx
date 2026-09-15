import { MessageCircle, Phone } from "lucide-react";
import { buildTelLink, buildWhatsAppLink } from "@/lib/whatsapp";

export default function CallWhatsAppButtons({
  propertyName,
  className = "",
}: {
  propertyName?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <a
        href={buildTelLink()}
        className="inline-flex items-center gap-2 rounded-full bg-[#1b1a18] px-4 py-2.5 text-sm font-semibold text-white"
      >
        <Phone size={16} /> Call now
      </a>
      <a
        href={buildWhatsAppLink(propertyName)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"
      >
        <MessageCircle size={16} /> WhatsApp
      </a>
    </div>
  );
}
