import type { Metadata } from "next";
import { site, faqs } from "@/data/site";
import { PageHero, SectionHead } from "@/components/Bits";
import { Phone, Chat, Mail, Pin, Clock, Arrow } from "@/components/Icons";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description:
    "Available for bookings and support every day. Our team typically responds within two hours — and instantly on WhatsApp.",
};

const methods = [
  { Icon: Phone, tag: "Call Us", value: site.phone, note: site.hours, href: `tel:${site.phoneRaw}` },
  { Icon: Chat, tag: "WhatsApp", value: site.phone, note: "Chat for instant booking · 24/7", href: site.whatsapp },
  { Icon: Mail, tag: "Email", value: site.email, note: "We reply within 2 hours", href: `mailto:${site.email}` },
  { Icon: Pin, tag: "Visit Us", value: site.address, note: "", href: site.mapUrl },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact"
        hi="Us"
        sub="Available for bookings and support every day. Our team typically responds within two hours — and instantly on WhatsApp."
      />

      {/* min-w-0 on the grid items: without it their default min-width:auto
          lets long content (the address) push the whole page wider than the
          phone viewport. */}
      <section className="wrap grid gap-12 py-16 lg:grid-cols-2">
        {/* Reach us */}
        <div className="min-w-0">
          <SectionHead eyebrow="Reach Us Directly" title="Always" hi="Available" sub="Our team is ready to help with bookings, quotes, route advice or support." />

          <Reveal className="mt-8 space-y-4" stagger={0.08}>
            {methods.map((m) => (
              <a
                key={m.tag}
                data-reveal
                href={m.href}
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="card card-hover group flex items-center gap-4 p-4"
              >
                <span className="chip-taxi h-12 w-12 shrink-0 transition-transform duration-300 ease-out group-hover:scale-105">
                  <m.Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                    {m.tag}
                  </div>
                  {/* Wraps rather than truncating — on a phone an ellipsised
                      address hides the part people actually need. */}
                  <div className="break-words font-bold">{m.value}</div>
                  {m.note && <div className="text-xs text-ink-muted">{m.note}</div>}
                </div>
                <Arrow className="ml-auto h-5 w-5 shrink-0 -translate-x-1 text-ink-muted opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:text-ink group-hover:opacity-100" />
              </a>
            ))}

            <div data-reveal className="card bg-paper/70 p-5">
              <div className="flex items-center gap-2.5">
                <Clock className="h-5 w-5 text-taxi" />
                <span className="card-title !text-base">Support hours</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {site.hours}
                <br />
                Emergency bookings: 24/7 on WhatsApp
              </p>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal className="min-w-0">
          <div data-reveal>
            <ContactForm />
          </div>
        </Reveal>
      </section>

      {/* Common questions */}
      <section className="border-t border-ink/[0.08] bg-paper py-24">
        <div className="wrap">
          <SectionHead center eyebrow="FAQ" title="Common" hi="Questions" />
          <div className="mt-12">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
