import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  Menu,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import "./_group.css";

const paths = {
  home: "/__mockup/preview/money-sense/Home",
  card: "/__mockup/preview/money-sense/CardProfile",
  bank: "/__mockup/preview/money-sense/BankProfile",
};

export function Wordmark() {
  return (
    <a className="ms-wordmark" href={paths.home} aria-label="The Daily Star Money Sense home">
      <span className="ms-wordmark-paper">The Daily Star</span>
      <span className="ms-wordmark-money">Money Sense</span>
      <span className="ms-wordmark-slab" aria-hidden="true" />
    </a>
  );
}

export function SiteHeader({ active = "home" }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: "Cards", href: paths.card, id: "cards" },
    { label: "Offers", href: `${paths.home}#offers`, id: "offers" },
    { label: "Compare", href: `${paths.card}#compare`, id: "compare" },
    { label: "Card finder", href: `${paths.home}#finder`, id: "finder" },
    { label: "Guides", href: `${paths.home}#guides`, id: "guides" },
  ];

  return (
    <header className="ms-header">
      <div className="ms-container">
        <div className="ms-topline">
          <span>A new money vertical from The Daily Star</span>
          <a href="https://www.thedailystar.net/" target="_blank" rel="noreferrer">
            The Daily Star <ArrowRight size={12} aria-hidden="true" />
          </a>
        </div>
        <div className="ms-header-main">
          <Wordmark />
          <nav className="ms-nav" aria-label="Main navigation">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                aria-current={active === link.id ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="ms-header-actions">
            <button className="ms-search-button" type="button" aria-label="Search">
              <Search size={16} aria-hidden="true" />
              Search
            </button>
            <a className="ms-button" href={`${paths.home}#finder`}>
              Find a card <ArrowRight size={16} aria-hidden="true" />
            </a>
            <button
              className="ms-menu-button"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="ms-mobile-nav" aria-label="Mobile navigation">
            {links.map((link) => (
              <a key={link.id} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="ms-footer">
      <div className="ms-container">
        <div className="ms-footer-top">
          <div className="ms-footer-brand">
            <Wordmark />
            <p>
              Clear information to help you discover, compare and use financial
              products with confidence.
            </p>
          </div>
          <div className="ms-footer-col">
            <h3>Explore</h3>
            <a href={paths.card}>Cards</a>
            <a href={`${paths.home}#offers`}>Today&apos;s offers</a>
            <a href={`${paths.home}#finder`}>Card finder</a>
          </div>
          <div className="ms-footer-col">
            <h3>Learn</h3>
            <a href={`${paths.home}#guides`}>Money guides</a>
            <a href={`${paths.home}#methodology`}>How we work</a>
            <a href={`${paths.home}#privacy`}>Privacy</a>
          </div>
          <div className="ms-footer-col">
            <h3>For institutions</h3>
            <a href={paths.bank}>Bank profiles</a>
            <a href={`${paths.home}#partners`}>Partner with us</a>
            <a href="mailto:moneysense@thedailystar.net">Get in touch</a>
          </div>
        </div>
        <div className="ms-footer-bottom">
          <span>© The Daily Star. All rights reserved.</span>
          <span>Editorial guidance is independent of sponsorship.</span>
        </div>
      </div>
    </footer>
  );
}

export function PageFrame({
  active,
  children,
}: {
  active?: string;
  children: ReactNode;
}) {
  return (
    <div className="ms-page">
      <SiteHeader active={active} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function SponsoredLabel() {
  return <span className="ms-sponsored">Sponsored</span>;
}

export function VerifiedStamp({ date = "24 Oct 2026" }: { date?: string }) {
  return (
    <span className="ms-verified">
      <ShieldCheck size={14} aria-hidden="true" />
      Verified {date}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  detail,
  href,
  linkLabel = "Explore all",
}: {
  eyebrow?: string;
  title: string;
  detail?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="ms-section-title">
      <div>
        {eyebrow && <span className="ms-overline">{eyebrow}</span>}
        <h2>{title}</h2>
        {detail && <p>{detail}</p>}
      </div>
      {href && (
        <a className="ms-text-link" href={href}>
          {linkLabel} <ArrowRight size={15} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export function SampleBankLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`ms-bank-mark${compact ? " is-compact" : ""}`}>
      <span className="ms-bank-mark-symbol" aria-hidden="true">
        <Check size={compact ? 13 : 16} strokeWidth={2.4} />
      </span>
      <span>
        <strong>Sample Bank</strong>
        {!compact && <small>Illustrative partner</small>}
      </span>
    </span>
  );
}

export function TrustNote({
  children = "Sponsored placements are labelled. Our editorial method stays independent.",
}: {
  children?: ReactNode;
}) {
  return (
    <div className="ms-trust-note">
      <CircleHelp size={17} aria-hidden="true" />
      <span>{children}</span>
      <ChevronDown size={15} aria-hidden="true" />
    </div>
  );
}

export { paths };
