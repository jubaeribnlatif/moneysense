import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";
import {
  PageFrame,
  SampleBankLogo,
  SponsoredLabel,
  TrustNote,
  VerifiedStamp,
} from "./_shared/SiteChrome";
import "./BankProfile.css";

type OfferCategory = "All offers" | "Dining" | "Shopping" | "Travel";

const offers = [
  {
    merchant: "Kora House",
    category: "Dining",
    location: "Gulshan · Dhanmondi",
    benefit: "15% off the food bill",
    conditions: "Valid Sunday–Thursday; maximum discount Tk 600 per visit. Dine-in only.",
    verified: "24 Oct 2026",
  },
  {
    merchant: "Northline Books",
    category: "Shopping",
    location: "Online and selected shops",
    benefit: "10% off eligible books",
    conditions: "Minimum spend Tk 1,500. Excludes stationery and gift cards.",
    verified: "24 Oct 2026",
  },
  {
    merchant: "Bay Window Hotel",
    category: "Travel",
    location: "Cox’s Bazar",
    benefit: "15% off room-only stays",
    conditions: "Advance booking required. Blackout dates and availability apply.",
    verified: "24 Oct 2026",
  },
  {
    merchant: "Mrittika Table",
    category: "Dining",
    location: "Banani",
    benefit: "Complimentary dessert with two mains",
    conditions: "One dessert per table; dine-in only. Not valid with set menus.",
    verified: "24 Oct 2026",
  },
] as const;

const categories: OfferCategory[] = ["All offers", "Dining", "Shopping", "Travel"];

const cards = [
  {
    name: "Sample Bank Everyday Card",
    type: "Credit card",
    description:
      "A general-purpose credit card in this illustrative range. Product terms and eligibility are set by the institution.",
    verified: "24 Oct 2026",
  },
  {
    name: "Sample Bank Debit Card",
    type: "Debit card",
    description:
      "A debit option linked to a deposit account. Account details and fees are not represented here.",
    verified: "24 Oct 2026",
  },
  {
    name: "Sample Bank Travel Card",
    type: "Prepaid · Travel",
    description:
      "A prepaid product concept for travel spending. Availability and terms should be confirmed with the issuer.",
    verified: "24 Oct 2026",
  },
];

export function BankProfile() {
  const [activeCategory, setActiveCategory] = useState<OfferCategory>("All offers");
  const filteredOffers = useMemo(
    () =>
      activeCategory === "All offers"
        ? offers
        : offers.filter((offer) => offer.category === activeCategory),
    [activeCategory],
  );

  return (
    <PageFrame active="cards">
      <div className="ms-bank-profile">
        <div className="ms-container">
          <nav className="bp-breadcrumb" aria-label="Breadcrumb">
            <a href="/__mockup/preview/money-sense/Home">Money Sense</a>
            <span aria-hidden="true">/</span>
            <a href="/__mockup/preview/money-sense/CardProfile">Cards</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Bank profile</span>
          </nav>

          <section className="bp-intro" aria-labelledby="bp-title">
            <div className="bp-intro-copy">
              <span className="bp-kicker">Institution profile · Illustrative demo</span>
              <div className="bp-brand-line">
                <SampleBankLogo />
                <span className="bp-demo-tag">Fictional institution</span>
              </div>
              <h1 id="bp-title">A clear view of Sample Bank cards and offers.</h1>
              <p className="bp-deck">
                A reader-first overview of the card range and currently listed
                merchant benefits. All institution, product and offer details
                on this demonstration page are illustrative.
              </p>
              <div className="bp-intro-meta">
                <VerifiedStamp date="24 Oct 2026" />
                <span>Reviewed by Money Sense editors</span>
              </div>
            </div>
            <div className="bp-intro-aside">
              <div className="bp-aside-number">01</div>
              <p>
                We list what is available, not what you should choose. Always
                check the issuer’s current terms before applying or paying.
              </p>
              <a className="bp-inline-link" href="#editorial-note">
                How this profile works <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </section>

          <section className="bp-overview" aria-labelledby="bp-overview-title">
            <div className="bp-overview-image">
              <img
                src="/__mockup/images/money-sense-hero.jpg"
                alt="A reader considers a payment card over coffee at a Dhaka cafe"
              />
              <span className="bp-image-caption">A practical guide to the products listed here</span>
            </div>
            <div className="bp-overview-copy">
              <span className="bp-kicker">Institution overview</span>
              <h2 id="bp-overview-title">What readers should know</h2>
              <p>
                Sample Bank is a fictional institution used to demonstrate how
                Money Sense presents financial products. This profile does not
                state or imply real-world rates, performance, history or
                eligibility.
              </p>
              <dl className="bp-facts">
                <div>
                  <dt>Profile includes</dt>
                  <dd>3 illustrative card products</dd>
                </div>
                <div>
                  <dt>Listed benefits</dt>
                  <dd>4 sample merchant offers</dd>
                </div>
                <div>
                  <dt>Information checked</dt>
                  <dd>24 Oct 2026</dd>
                </div>
              </dl>
              <p className="bp-editorial-caveat">
                No product ranking or recommendation is made on this page.
              </p>
            </div>
          </section>

          <section className="bp-card-section" id="cards" aria-labelledby="bp-cards-title">
            <div className="bp-section-heading">
              <div>
                <span className="bp-kicker">The card range</span>
                <h2 id="bp-cards-title">Products listed by Sample Bank</h2>
                <p>Compare each product’s own terms before deciding what suits you.</p>
              </div>
              <span className="bp-count"><CreditCard size={16} /> 3 products</span>
            </div>
            <div className="bp-card-list">
              {cards.map((card, index) => (
                <article className="bp-product-row" key={card.name}>
                  <div className="bp-product-image">
                    <img
                      src="/__mockup/images/sample-card.jpg"
                      alt="Illustrative dark green payment card"
                    />
                    <span className="bp-image-index">0{index + 1}</span>
                  </div>
                  <div className="bp-product-info">
                    <span className="bp-product-type">{card.type}</span>
                    <h3>{card.name}</h3>
                    <p>{card.description}</p>
                    <VerifiedStamp date={card.verified} />
                  </div>
                  <div className="bp-product-action">
                    <a
                      className="bp-card-link"
                      href="/__mockup/preview/money-sense/CardProfile"
                      aria-label={`View ${card.name} card profile`}
                    >
                      View card profile <ArrowRight size={16} aria-hidden="true" />
                    </a>
                    <span>Product details</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="bp-offers-section" id="offers" aria-labelledby="bp-offers-title">
            <div className="bp-section-heading bp-offers-heading">
              <div>
                <span className="bp-kicker">Current benefits</span>
                <h2 id="bp-offers-title">Offers attached to this profile</h2>
                <p>Each benefit is shown beside its conditions. Check details at the merchant.</p>
              </div>
              <span className="bp-offer-updated"><BadgeCheck size={16} /> Checked 24 Oct 2026</span>
            </div>

            <div className="bp-filter-bar">
              <div className="bp-filter-label">
                <SlidersHorizontal size={16} aria-hidden="true" />
                <span>Filter offers</span>
              </div>
              <div className="bp-filter-options" role="group" aria-label="Filter offers by category">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    className={activeCategory === category ? "is-active" : ""}
                    aria-pressed={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <span className="bp-results-count" aria-live="polite">
                {filteredOffers.length} {filteredOffers.length === 1 ? "offer" : "offers"}
              </span>
            </div>

            <div className="bp-offers-list" aria-live="polite">
              {filteredOffers.map((offer) => (
                <article className="bp-offer-row" key={offer.merchant}>
                  <div className="bp-offer-merchant">
                    <span className="bp-offer-category">{offer.category}</span>
                    <h3>{offer.merchant}</h3>
                    <span className="bp-location"><MapPin size={13} /> {offer.location}</span>
                  </div>
                  <div className="bp-offer-benefit">
                    <span className="bp-benefit-label">Benefit</span>
                    <strong>{offer.benefit}</strong>
                  </div>
                  <div className="bp-offer-conditions">
                    <span className="bp-benefit-label">Conditions</span>
                    <p>{offer.conditions}</p>
                  </div>
                  <div className="bp-offer-verified">
                    <VerifiedStamp date={offer.verified} />
                  </div>
                </article>
              ))}
              {filteredOffers.length === 0 && (
                <div className="bp-empty-state">
                  <span>No offers in this category</span>
                  <button type="button" onClick={() => setActiveCategory("All offers")}>
                    Show all offers
                  </button>
                </div>
              )}
            </div>
            <p className="bp-offer-footnote">
              Illustrative offer data only. Benefits, dates and conditions are fictional and are not verified claims about a real issuer or merchant.
            </p>
          </section>

          <aside className="bp-partner-slot" aria-label="Sponsored category partner placement">
            <div className="bp-partner-copy">
              <SponsoredLabel />
              <span className="bp-kicker">Category-partner placement</span>
              <h2>A space for a clearly labelled partner message.</h2>
              <p>
                A sponsored placement may appear here, but it cannot change
                product listings, offer conditions or Money Sense editorial guidance.
              </p>
            </div>
            <div className="bp-partner-boundary">
              <span className="bp-boundary-mark" aria-hidden="true">—</span>
              <strong>Editorial guidance stays independent.</strong>
              <span>Partner content is labelled and kept separate.</span>
            </div>
          </aside>

          <section className="bp-editorial-note" id="editorial-note">
            <div className="bp-note-number">A note on this page</div>
            <div>
              <h2>Useful information, without a sales pitch.</h2>
              <p>
                Money Sense profiles are designed to make issuer information
                easier to scan. Illustrative demo data is used here throughout;
                real product facts would be checked against source materials,
                dated, and presented with relevant conditions.
              </p>
              <TrustNote>
                Sponsorship is always labelled. It does not influence editorial
                guidance, product order or how we explain benefits.
              </TrustNote>
            </div>
          </section>

          <div className="bp-bottom-cta">
            <div>
              <span className="bp-kicker">Take your time</span>
              <h2>Read the details before you choose.</h2>
            </div>
            <a className="bp-card-link" href="/__mockup/preview/money-sense/CardProfile">
              Explore a card profile <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
