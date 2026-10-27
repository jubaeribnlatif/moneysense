import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  CircleArrowRight,
  CreditCard,
  Home as HomeIcon,
  Plane,
  Search,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import {
  PageFrame,
  SampleBankLogo,
  SectionTitle,
  SponsoredLabel,
  TrustNote,
  VerifiedStamp,
} from "./_shared/SiteChrome";
import "./Home.css";

const needs = [
  { label: "Everyday spending", description: "Groceries, bills and the little things", icon: ShoppingBag, key: "everyday" },
  { label: "Travel abroad", description: "Understand travel benefits and fees", icon: Plane, key: "travel" },
  { label: "A first card", description: "Start with the basics, clearly explained", icon: CreditCard, key: "first" },
  { label: "Home & family", description: "Plan larger purchases with care", icon: HomeIcon, key: "home" },
];

const offers = [
  {
    place: "Illustrative dining offer",
    title: "Save on a meal out this week",
    detail: "Up to 15% off at selected restaurants when you pay with an eligible Sample Bank card.",
    terms: "Minimum spend Tk 2,000. Valid Friday–Saturday; exclusions apply.",
    date: "24 Oct 2026",
    kind: "dining",
  },
  {
    place: "Illustrative travel offer",
    title: "A little more room in your travel budget",
    detail: "Save Tk 1,200 on selected domestic flight bookings with an eligible Sample Bank card.",
    terms: "Minimum booking Tk 8,000. One use per cardholder; booking conditions apply.",
    date: "24 Oct 2026",
    kind: "travel",
  },
  {
    place: "Illustrative everyday offer",
    title: "A useful saving on your weekly shop",
    detail: "Get 8% off at participating neighbourhood supermarkets with an eligible card.",
    terms: "Maximum discount Tk 500. Minimum spend Tk 3,000; selected outlets only.",
    date: "24 Oct 2026",
    kind: "everyday",
  },
];

const guides = [
  {
    number: "01",
    category: "CARD BASICS",
    title: "Credit card fees in Bangladesh, explained without the jargon",
    read: "6 min read",
  },
  {
    number: "02",
    category: "HOW TO",
    title: "What to check before you apply for your first card",
    read: "4 min read",
  },
  {
    number: "03",
    category: "SMART SPENDING",
    title: "Paying in another currency: the costs worth knowing",
    read: "5 min read",
  },
];

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [activeNeed, setActiveNeed] = useState("all");
  const [showAllOffers, setShowAllOffers] = useState(false);

  const visibleOffers = useMemo(() => {
    const relevant = activeNeed === "all" || activeNeed === "everyday"
      ? offers
      : activeNeed === "travel"
        ? offers.filter((offer) => offer.kind === "travel")
        : offers.filter((offer) => offer.kind === "everyday");
    return showAllOffers ? relevant : relevant.slice(0, 2);
  }, [activeNeed, showAllOffers]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleaned = searchTerm.trim();
    setSearchMessage(
      cleaned
        ? `We'll help you compare cards for “${cleaned}”. Choose what matters most below.`
        : "Tell us what you need, or choose a starting point below.",
    );
    document.getElementById("finder")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <PageFrame active="home">
      <div className="ms-home">
        <section className="ms-home-hero ms-container" aria-labelledby="home-title">
          <div className="ms-home-hero-copy">
            <span className="ms-overline">Money, made clearer</span>
            <h1 id="home-title">Make your next money move <em>with confidence.</em></h1>
            <p className="ms-home-intro">
              Independent guides and clear comparisons to help you find a card, make sense of an offer and spend with care.
            </p>
            <form className="ms-home-search" onSubmit={submitSearch} role="search">
              <label className="ms-sr-only" htmlFor="money-search">Search cards, banks or offers</label>
              <Search size={19} aria-hidden="true" />
              <input
                id="money-search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search cards, banks or offers"
              />
              <button type="submit" aria-label="Search Money Sense">
                <span>Search</span><ArrowRight size={17} aria-hidden="true" />
              </button>
            </form>
            <div className="ms-home-hero-meta">
              <span><ShieldCheck size={15} aria-hidden="true" /> Clear, independently edited</span>
              <span>Made for everyday decisions in Bangladesh</span>
            </div>
          </div>
          <figure className="ms-home-hero-image">
            <img src="/__mockup/images/money-sense-hero.jpg" alt="A reader checks a payment card and phone over coffee" />
            <figcaption><span>Money choices, in real life.</span><span>Photo: Illustrative</span></figcaption>
          </figure>
        </section>

        {searchMessage && (
          <div className="ms-container ms-search-feedback" role="status">
            <span>{searchMessage}</span>
            <a href="#finder">Go to Card Finder <ArrowRight size={14} aria-hidden="true" /></a>
          </div>
        )}

        <section className="ms-home-sponsored-band" aria-label="Sponsored placement">
          <div className="ms-container">
            <article className="ms-home-sponsored">
              <div className="ms-home-sponsored-mark"><SampleBankLogo compact /></div>
              <div className="ms-home-sponsored-copy">
                <div className="ms-home-sponsored-label"><SponsoredLabel /><span>Illustrative partner placement</span></div>
                <h2>Explore the Sample Bank Everyday card</h2>
                <p>Illustrative annual fee Tk 2,500; includes two lounge visits each year. Access rules and other charges apply.</p>
                <VerifiedStamp />
              </div>
              <a className="ms-home-sponsored-link" href="/__mockup/preview/money-sense/CardProfile">
                See card details <ArrowRight size={16} aria-hidden="true" />
              </a>
            </article>
          </div>
        </section>

        <section className="ms-home-needs ms-container" id="finder">
          <div className="ms-home-needs-heading">
            <div>
              <span className="ms-overline">Start with what matters</span>
              <h2>What are you looking for?</h2>
              <p>One useful next step is a good place to begin.</p>
            </div>
            <a className="ms-home-finder-callout" href="#finder">
              <span className="ms-home-finder-icon"><CircleArrowRight size={24} aria-hidden="true" /></span>
              <span><strong>Card Finder</strong><small>Compare options around your needs</small></span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="ms-home-need-grid">
            {needs.map(({ label, description, icon: Icon, key }) => (
              <button
                className={`ms-home-need${activeNeed === key ? " is-selected" : ""}`}
                key={key}
                type="button"
                onClick={() => {
                  setActiveNeed(key);
                  document.getElementById("offers")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span className="ms-home-need-icon"><Icon size={19} aria-hidden="true" /></span>
                <span className="ms-home-need-text"><strong>{label}</strong><small>{description}</small></span>
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
          <a className="ms-home-reset" href="#offers" onClick={() => setActiveNeed("all")}>Browse all topics <ArrowRight size={14} aria-hidden="true" /></a>
        </section>

        <section className="ms-home-offers" id="offers">
          <div className="ms-container">
            <SectionTitle
              eyebrow="Useful right now"
              title="Offers worth understanding"
              detail="A clear look at the benefit and the conditions, together."
              href="/__mockup/preview/money-sense/Home#offers"
              linkLabel="All offers"
            />
            <div className="ms-home-filter-row" role="group" aria-label="Filter offers">
              <span>Show me</span>
              {[
                { id: "all", label: "All offers" },
                { id: "everyday", label: "Everyday" },
                { id: "travel", label: "Travel" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={activeNeed === filter.id ? "is-active" : ""}
                  aria-pressed={activeNeed === filter.id}
                  onClick={() => setActiveNeed(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="ms-home-offer-list">
              {visibleOffers.length ? visibleOffers.map((offer, index) => (
                <article className="ms-home-offer" key={offer.title}>
                  <div className="ms-home-offer-index">0{index + 1}</div>
                  <div className="ms-home-offer-main">
                    <span className="ms-home-offer-category">{offer.place}</span>
                    <h3>{offer.title}</h3>
                    <p>{offer.detail}</p>
                    <p className="ms-home-offer-terms"><strong>Conditions:</strong> {offer.terms}</p>
                  </div>
                  <div className="ms-home-offer-side">
                    <SampleBankLogo compact />
                    <VerifiedStamp date={offer.date} />
                    <a href="/__mockup/preview/money-sense/BankProfile">Offer details <ArrowRight size={14} aria-hidden="true" /></a>
                  </div>
                </article>
              )) : (
                <div className="ms-home-empty">No matching offers just now. Try another topic or browse all offers.</div>
              )}
            </div>
            <button className="ms-home-more" type="button" onClick={() => setShowAllOffers((value) => !value)}>
              {showAllOffers ? "Show fewer offers" : "See more offers"} <ArrowRight size={15} aria-hidden="true" />
            </button>
            <p className="ms-home-demo-note">All bank, product and offer information shown here is illustrative demo content.</p>
          </div>
        </section>

        <section className="ms-home-guides ms-container" id="guides">
          <div className="ms-home-guides-head">
            <div>
              <span className="ms-overline">The money desk</span>
              <h2>Good questions.<br />Straight answers.</h2>
            </div>
            <p>Plain-English explainers to help you feel more prepared before you apply, pay or compare.</p>
          </div>
          <div className="ms-home-guide-list">
            {guides.map((guide) => (
              <a className="ms-home-guide" href="/__mockup/preview/money-sense/Home#guides" key={guide.number}>
                <span className="ms-home-guide-number">{guide.number}</span>
                <span className="ms-home-guide-content">
                  <span>{guide.category}</span>
                  <strong>{guide.title}</strong>
                  <small><BookOpen size={14} aria-hidden="true" /> {guide.read}</small>
                </span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
          <a className="ms-home-guides-link" href="/__mockup/preview/money-sense/Home#guides">Visit the guides desk <ArrowRight size={15} aria-hidden="true" /></a>
        </section>

        <section className="ms-home-partner" id="partners">
          <div className="ms-container ms-home-partner-inner">
            <div className="ms-home-partner-copy">
              <span className="ms-overline">Featured partner</span>
              <h2>A clearer view of one institution.</h2>
              <p>Explore an illustrative profile with the details readers need: card options, fees, eligibility and current offers.</p>
              <VerifiedStamp />
              <a className="ms-button ms-home-partner-button" href="/__mockup/preview/money-sense/BankProfile">
                View Sample Bank profile <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="ms-home-partner-card">
              <span className="ms-home-partner-card-top">INSTITUTION PROFILE · DEMO</span>
              <SampleBankLogo />
              <img src="/__mockup/images/sample-card.jpg" alt="Illustrative dark green payment card on a pale background" />
              <p>Sample Bank is an invented institution for this demonstration. Product information is illustrative only.</p>
            </div>
          </div>
        </section>

        <section className="ms-home-method ms-container" id="methodology">
          <div className="ms-home-method-mark"><ShieldCheck size={23} aria-hidden="true" /></div>
          <div className="ms-home-method-copy">
            <span className="ms-overline">Our promise to readers</span>
            <h2>Useful information. Independent judgement.</h2>
            <p>We explain how products work and what to look out for. Partners may sponsor clearly labelled placements, but sponsorship never decides our editorial guidance.</p>
            <TrustNote>Every profile and offer carries a visible verification date. We review details and update them when information changes.</TrustNote>
          </div>
          <a className="ms-home-method-link" href="/__mockup/preview/money-sense/Home#methodology">
            How our method works <ArrowRight size={15} aria-hidden="true" />
          </a>
        </section>
      </div>
    </PageFrame>
  );
}
