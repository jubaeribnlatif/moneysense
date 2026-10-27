import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronRight,
  CircleHelp,
  Plus,
} from "lucide-react";
import {
  PageFrame,
  SampleBankLogo,
  SectionTitle,
  SponsoredLabel,
  TrustNote,
  VerifiedStamp,
} from "./_shared/SiteChrome";
import "./CardProfile.css";

const benefits = [
  "1 point for every Tk 100 spent on eligible purchases",
  "Two complimentary airport lounge visits each calendar year",
  "Contactless payments for everyday purchases",
];

const merchants = ["Illustrative Grocer", "City Books", "Everyday Pharmacy"];

export function CardProfile() {
  const [inCompare, setInCompare] = useState(false);
  const [visitNotice, setVisitNotice] = useState(false);

  return (
    <PageFrame active="cards">
      <div className="cp-page">
        <div className="ms-container">
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <a href="/__mockup/preview/money-sense/Home">Money Sense</a>
            <ChevronRight size={14} aria-hidden="true" />
            <a href="/__mockup/preview/money-sense/Home#cards">Cards</a>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Sample Bank Everyday</span>
          </nav>

          <div className="cp-demo-notice">
            <span className="cp-demo-mark" aria-hidden="true">i</span>
            <span>
              <strong>Illustrative profile.</strong> Sample Bank, product details,
              benefits and offer below are fictional demo content.
            </span>
          </div>

          <section className="cp-intro" aria-labelledby="cp-title">
            <div className="cp-intro-copy">
              <div className="cp-kicker-row">
                <span className="ms-overline">Card profile</span>
                <VerifiedStamp date="24 Oct 2026" />
              </div>
              <h1 id="cp-title">A card for the everyday, with room to travel.</h1>
              <div className="cp-bankline">
                <SampleBankLogo />
                <span className="cp-illustrative-pill">Illustrative product</span>
              </div>
              <p className="cp-dek">
                Sample Bank Everyday Credit Card
              </p>
              <p className="cp-summary">
                A general-purpose card with points on eligible spending and a
                small number of lounge visits. Consider the annual fee and
                repayment terms alongside the benefits.
              </p>
              <div className="cp-hero-actions" id="compare">
                <button
                  className={`cp-compare-button${inCompare ? " is-added" : ""}`}
                  type="button"
                  aria-pressed={inCompare}
                  onClick={() => setInCompare((value) => !value)}
                >
                  {inCompare ? <Check size={17} /> : <Plus size={17} />}
                  {inCompare ? "Added to compare" : "Add to compare"}
                </button>
                <button
                  className="cp-visit-button"
                  type="button"
                  onClick={() => setVisitNotice((value) => !value)}
                  aria-expanded={visitNotice}
                  aria-controls="cp-visit-note"
                >
                  Visit bank <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
              {inCompare && (
                <p className="cp-compare-feedback" role="status">
                  Sample Bank Everyday is in your comparison. Select the button
                  again to remove it.
                </p>
              )}
              {visitNotice && (
                <p className="cp-visit-feedback" id="cp-visit-note" role="status">
                  This is a fictional demo profile, so there is no live bank
                  destination. See the illustrative institution profile below.
                </p>
              )}
            </div>
            <figure className="cp-card-visual">
              <img
                src="/__mockup/images/sample-card.jpg"
                alt="Illustrative dark green credit card with a metallic chip"
              />
              <figcaption>
                <span>Sample Bank Everyday</span>
                <span>Illustrative card image</span>
              </figcaption>
            </figure>
          </section>

          <div className="cp-profile-grid">
            <div className="cp-main-column">
              <section className="cp-section cp-fit-section" aria-labelledby="cp-fit-title">
                <SectionTitle
                  eyebrow="Start with your needs"
                  title="Could this suit you?"
                  detail="Think about how you spend and what you can comfortably repay."
                />
                <div className="cp-fit-grid">
                  <article className="cp-fit-item">
                    <span className="cp-fit-index">01</span>
                    <h3>Useful for regular spending</h3>
                    <p>
                      You want a single card for eligible day-to-day purchases
                      and are comfortable tracking points.
                    </p>
                  </article>
                  <article className="cp-fit-item">
                    <span className="cp-fit-index">02</span>
                    <h3>You may use a lounge visit</h3>
                    <p>
                      A couple of visits a year could be useful, provided you
                      check access rules before travelling.
                    </p>
                  </article>
                  <article className="cp-fit-item">
                    <span className="cp-fit-index">03</span>
                    <h3>You can manage the full cost</h3>
                    <p>
                      The annual fee and any charges fit your budget, even in a
                      month when you earn fewer rewards.
                    </p>
                  </article>
                </div>
              </section>

              <section className="cp-section" aria-labelledby="cp-benefits-title">
                <SectionTitle
                  eyebrow="The details"
                  title="Benefits & costs"
                  detail="Illustrative terms only. Confirm the current schedule with the institution."
                />
                <div className="cp-benefit-list">
                  {benefits.map((benefit, index) => (
                    <div className="cp-benefit-row" key={benefit}>
                      <span className="cp-benefit-number">0{index + 1}</span>
                      <p>{benefit}</p>
                      <Check size={16} aria-hidden="true" />
                    </div>
                  ))}
                </div>
                <div className="cp-cost-grid">
                  <div className="cp-cost-item">
                    <span className="cp-detail-label">Annual fee</span>
                    <strong>Tk 2,500</strong>
                    <p>Illustrative amount, before applicable taxes.</p>
                  </div>
                  <div className="cp-cost-item">
                    <span className="cp-detail-label">Eligibility</span>
                    <strong>For eligible applicants</strong>
                    <p>
                      Age, income and documentation requirements are set by the
                      issuer and may change.
                    </p>
                  </div>
                </div>
              </section>

              <section className="cp-offer-section" aria-labelledby="cp-offer-title">
                <div className="cp-offer-head">
                  <div>
                    <span className="cp-offer-eyebrow">A current offer</span>
                    <h2 id="cp-offer-title">A little extra on your first shop.</h2>
                  </div>
                  <SponsoredLabel />
                </div>
                <div className="cp-offer-body">
                  <div className="cp-offer-gift" aria-hidden="true">
                    <ArrowDownRight size={27} strokeWidth={1.3} />
                  </div>
                  <div className="cp-offer-copy">
                    <p className="cp-offer-benefit">
                      Illustrative Tk 500 statement credit after eligible
                      purchases totalling Tk 10,000 within 30 days of approval.
                    </p>
                    <p className="cp-terms">
                      <strong>Terms & exclusions:</strong> Fictional offer for
                      demonstration only. One credit per approved cardholder;
                      excludes cash advances, fees, reversed transactions and
                      purchases returned within the offer period. The issuer
                      would confirm the qualifying dates and final terms.
                    </p>
                  </div>
                </div>
                <div className="cp-offer-foot">
                  <VerifiedStamp date="24 Oct 2026" />
                  <span>Offer and terms are illustrative.</span>
                </div>
              </section>

              <section className="cp-section cp-merchants" aria-labelledby="cp-merchants-title">
                <SectionTitle
                  eyebrow="Where it may be useful"
                  title="Popular merchants"
                  detail="Examples are fictional and do not imply a merchant partnership."
                />
                <div className="cp-merchant-list" id="cp-merchants-title">
                  {merchants.map((merchant, index) => (
                    <div className="cp-merchant" key={merchant}>
                      <span className="cp-merchant-no">0{index + 1}</span>
                      <span>{merchant}</span>
                      <span className="cp-merchant-tag">Illustrative</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="cp-good-to-know" aria-labelledby="cp-good-title">
                <div className="cp-good-heading">
                  <span className="cp-good-symbol" aria-hidden="true">
                    <CircleHelp size={19} />
                  </span>
                  <div>
                    <span className="cp-detail-label">Before you apply</span>
                    <h2 id="cp-good-title">Good to know</h2>
                  </div>
                </div>
                <ul>
                  <li>Paying only the minimum can increase the time and total cost of repayment.</li>
                  <li>Points may have expiry dates, redemption limits or excluded purchases.</li>
                  <li>Check the issuer&apos;s latest fees, eligibility rules and cardholder agreement.</li>
                </ul>
              </section>
            </div>

            <aside className="cp-aside">
              <div className="cp-aside-sticky">
                <div className="cp-aside-heading">
                  <span className="cp-aside-rule" aria-hidden="true" />
                  <span>At a glance</span>
                </div>
                <div className="cp-glance-row">
                  <span>Annual fee</span>
                  <strong>Tk 2,500</strong>
                </div>
                <div className="cp-glance-row">
                  <span>Rewards</span>
                  <strong>Points on eligible spend</strong>
                </div>
                <div className="cp-glance-row">
                  <span>Travel access</span>
                  <strong>2 lounge visits / year</strong>
                </div>
                <button
                  className={`cp-aside-compare${inCompare ? " is-added" : ""}`}
                  type="button"
                  aria-pressed={inCompare}
                  onClick={() => setInCompare((value) => !value)}
                >
                  {inCompare ? <Check size={16} /> : <Plus size={16} />}
                  {inCompare ? "Added to compare" : "Add to compare"}
                </button>
                <button
                  className="cp-aside-visit"
                  type="button"
                  onClick={() => setVisitNotice((value) => !value)}
                >
                  Visit bank <ArrowRight size={16} aria-hidden="true" />
                </button>
                <p className="cp-aside-caption">
                  No live application link is available for this illustrative
                  product.
                </p>
                <div className="cp-aside-verified">
                  <VerifiedStamp date="24 Oct 2026" />
                  <p>Profile and offer checked for this demo on this date.</p>
                </div>
              </div>
              <TrustNote>
                Sponsorship supports this page; it does not determine our
                editorial guidance.
              </TrustNote>
            </aside>
          </div>

          <section className="cp-method" aria-labelledby="cp-method-title">
            <div className="cp-method-number">01</div>
            <div>
              <span className="cp-detail-label">How we work</span>
              <h2 id="cp-method-title">A clear view, not a verdict.</h2>
              <p>
                Money Sense describes fees, benefits, eligibility and offer
                conditions side by side so readers can assess what fits their
                own needs. Sponsorship is labelled and does not buy an
                editorial recommendation. This sample profile is illustrative,
                not a product recommendation.
              </p>
              <a href="/__mockup/preview/money-sense/Home#methodology">
                Read our methodology <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </section>

          <section className="cp-bank-profile" id="bank-contact">
            <div className="cp-bank-profile-copy">
              <span className="cp-detail-label">Institution profile</span>
              <h2>Learn about Sample Bank</h2>
              <p>
                An illustrative bank profile with no real institution details
                or live application destination.
              </p>
            </div>
            <a href="/__mockup/preview/money-sense/BankProfile">
              Bank profile <ArrowRight size={16} aria-hidden="true" />
            </a>
          </section>

          <div className="cp-last-note">
            <span>Independent consumer-finance information from The Daily Star.</span>
            <span>Demo content is not a real offer or financial advice.</span>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

