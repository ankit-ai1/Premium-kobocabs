import { site } from "@/data/site";
import { Phone, Mail, Pin, Instagram, Twitter, Facebook } from "./Icons";

export default function TopBar() {
  return (
    <div className="hidden bg-ink text-white md:block">
      <div className="wrap flex h-9 items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 text-white/70">
            <Pin className="h-3.5 w-3.5 text-taxi" /> {site.city}
          </span>
          <a href={`tel:${site.phoneRaw}`} className="flex items-center gap-1.5 text-white/70 hover:text-taxi">
            <Phone className="h-3.5 w-3.5 text-taxi" /> {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 text-white/70 hover:text-taxi lg:flex">
            <Mail className="h-3.5 w-3.5 text-taxi" /> {site.email}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-white/50 lg:inline">{site.hours}</span>
          <span className="hidden h-3 w-px bg-white/20 lg:inline" />
          {[
            { Icon: Instagram, href: site.socials.instagram },
            { Icon: Twitter, href: site.socials.twitter },
            { Icon: Facebook, href: site.socials.facebook },
          ].map(({ Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noreferrer" className="text-white/60 hover:text-taxi">
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
