"use client";

import { Check, Clock, Star, Users } from "@/components/Icons";
import { useReveal } from "@/hooks/useGsap";

const features = [
  { Icon: Check, title: "100% Safe", text: "Verified drivers and sanitised cabs on every single trip." },
  { Icon: Clock, title: "Fast Pickup", text: "Driver dispatched 30 minutes before your scheduled time." },
  { Icon: Star, title: "Fixed Fares", text: "One all-inclusive price — toll, GST and allowance covered." },
  { Icon: Users, title: "24×7 Support", text: "Call or WhatsApp our team any hour, any day of the year." },
];

export default function FeatureIcons() {
  const ref = useReveal<HTMLDivElement>("[data-reveal]", { stagger: 0.1, y: 30 });

  return (
    <section className="wrap -mt-12 relative z-20 pb-8">
      <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ Icon, title, text }) => (
          <div
            key={title}
            data-reveal
            className="card card-hover group p-6 text-center"
          >
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-ink text-taxi transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-taxi group-hover:text-ink">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="card-title mt-4">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
