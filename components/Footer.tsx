import Link from "next/link";
import { BRAND, CATEGORIES } from "@/lib/data";
import { IconInstagram, IconWhatsApp } from "./Icons";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-20 bg-panel">
      <div className="wrap py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="text-muted text-sm mt-4 max-w-xs">
            {BRAND.tagline} Cricket gear tested by our own team before it reaches yours.
          </p>
          <div className="flex gap-3 mt-5">
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <IconInstagram className="w-4 h-4" /> Instagram
            </a>
            <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <IconWhatsApp className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div>
          <p className="label">Shop</p>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/?cat=${c.slug}`} className="text-muted hover:text-fg">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label">Explore</p>
          <ul className="space-y-2 text-sm">
            {[
              ["/team/", "Run Machine XI"],
              ["/reels/", "Reels & video share"],
              ["/bat-finder/", "Bat Finder"],
              ["/compare/", "Compare products"],
              ["/orders/", "My orders"],
              ["/track/", "Track order"],
              ["/help/", "Shipping, returns & COD"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-muted hover:text-fg">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label">Contact</p>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hover:text-fg">{BRAND.phone}</a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="hover:text-fg">{BRAND.email}</a>
            </li>
            <li>{BRAND.address}</li>
          </ul>
          <div className="flex flex-wrap gap-2 mt-5">
            {["COD", "UPI", "Visa", "Mastercard", "RuPay"].map((m) => (
              <span key={m} className="text-[11px] font-bold px-2.5 py-1 rounded border border-line text-muted">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="wrap py-5 text-xs text-muted flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} {BRAND.full}. All rights reserved.</span>
          <span>Demo store — products, prices and team data are placeholders.</span>
        </div>
      </div>
    </footer>
  );
}
