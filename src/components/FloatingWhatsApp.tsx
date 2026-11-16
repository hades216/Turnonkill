import { MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/booking';

export function FloatingWhatsApp() {
  return (
    <a
      href={buildGeneralWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HOME FIXER on WhatsApp (0342 0520846)"
      className="fixed bottom-5 right-5 z-40 group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1fb858] text-[#0b2917] font-bold px-4 py-3 animate-whatsapp-attention transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#142B45]"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline text-sm whitespace-nowrap">
        WhatsApp Us
      </span>
    </a>
  );
}
