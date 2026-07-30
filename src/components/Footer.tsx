import Link from "next/link";
import { site, routeGroups } from "@/data/site";
import { Phone, Mail, Pin, Clock, Chat, Instagram, Twitter, Facebook } from "./Icons";
import RouteBookLink from "./RouteBookLink";

const services = [
  "Outstation Cabs",
  "One-Way Drops",
  "Hill Station Trips",
  "Pilgrimage Routes",
];

const company = [
  { label: "About Us", href: "/how-it-works" },
  { label: "Premium Cabs", href: "/premium-cabs" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Reviews", href: "/#reviews" },
];

/** Top routes out of our home city, straight from the routes data. */
const popular = routeGroups[0].routes.slice(0, 6);

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-2 lg:col-span-3">
          <Link href="/" className="font-display text-3xl uppercase tracking-tight">
            Kobo<span className="text-taxi">Cabs</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Premium outstation and city cab booking across North India — safe,
            reliable, and always on time. Based in {site.city} since {site.since}.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, href: site.socials.instagram, label: "Instagram" },
              { Icon: Twitter, href: site.socials.twitter, label: "Twitter" },
              { Icon: Facebook, href: site.socials.facebook, label: "Facebook" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-taxi hover:bg-taxi hover:text-ink"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="lg:col-span-2">
          <h4 className="font-sans text-xs font-extrabold uppercase tracking-[0.18em] text-taxi">
            Services
          </h4>
          <ul className="mt-3 space-y-0 text-sm text-white/70">
            {services.map((s) => (
              <li key={s}>
                <Link href="/premium-cabs" className="block py-2.5 transition-colors hover:text-taxi">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="lg:col-span-2">
          <h4 className="font-sans text-xs font-extrabold uppercase tracking-[0.18em] text-taxi">
            Company
          </h4>
          <ul className="mt-3 space-y-0 text-sm text-white/70">
            {company.map((c) => (
              <li key={c.label}>
                <Link href={c.href} className="block py-2.5 transition-colors hover:text-taxi">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Routes */}
        <div className="lg:col-span-2">
          <h4 className="font-sans text-xs font-extrabold uppercase tracking-[0.18em] text-taxi">
            Popular Routes
          </h4>
          <ul className="mt-3 space-y-0 text-sm text-white/70">
            {popular.map((p) => (
              <li key={p}>
                <RouteBookLink
                  route={p}
                  className="block py-2.5 transition-colors hover:text-taxi"
                >
                  {p} Cabs
                </RouteBookLink>
              </li>
            ))}
            <li className="pt-1">
              <Link
                href="/routes"
                className="block py-2.5 font-bold text-taxi hover:underline"
              >
                View all routes →
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-2 lg:col-span-3">
          <h4 className="font-sans text-xs font-extrabold uppercase tracking-[0.18em] text-taxi">
            Contact
          </h4>
          <ul className="mt-4 space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-taxi" />
              <a href={`tel:${site.phoneRaw}`} className="-my-1 inline-block py-1 transition-colors hover:text-taxi">
                {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-taxi" />
              <a href={`mailto:${site.email}`} className="-my-1 inline-block break-all py-1 transition-colors hover:text-taxi">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Pin className="mt-0.5 h-4 w-4 shrink-0 text-taxi" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-taxi" />
              <span>{site.hours}</span>
            </li>
          </ul>
          <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn-taxi mt-6 w-full">
            <Chat className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} Technologies Pvt. Ltd. All
            rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6">
            <Link href="#" className="inline-block py-2 transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="#" className="inline-block py-2 transition-colors hover:text-white">Terms of Service</Link>
            <Link href="#" className="inline-block py-2 transition-colors hover:text-white">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
