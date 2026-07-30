import { site } from "@/data/site";
import { Whatsapp } from "./Icons";

export default function WhatsAppFab() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_-6px_rgba(37,211,102,0.6)] transition-transform duration-300 ease-out hover:scale-110"
    >
      <Whatsapp className="h-7 w-7" />
    </a>
  );
}
