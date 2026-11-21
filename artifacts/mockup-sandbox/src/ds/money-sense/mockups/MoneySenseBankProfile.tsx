import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Clock3, ExternalLink, Info, RotateCcw } from "lucide-react";
import { Badge } from "@workspace/money-sense/components/ui/badge";
import { Button } from "@workspace/money-sense/components/ui/button";
import { Card, CardContent } from "@workspace/money-sense/components/ui/card";
import {
  cardHref,
  getBankFromHash,
  MoneySensePage,
  type DemoCard,
  type DemoOffer,
} from "./_shared/money-sense-shared";

const bankCategories = ["All products", "Dining", "Everyday", "Travel", "Shopping"];
const offerCategories = ["All offers", "Dining", "Shopping", "Travel", "Everyday"];

function CategoryFilters({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (option: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {options.map((option) => (
        <Button
          key={option}
          type="button"
          size="sm"
          variant={value === option ? "default" : "outline"}
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}

function ProductCard({ card }: { card: DemoCard }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-border shadow-none">
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <img
          src={card.image}
          alt={`Illustrative card artwork for ${card.name}`}
          className="h-full w-full object-cover"
        />
        <Badge variant="outline" className="absolute left-3 top-3 bg-background">
          Illustrative artwork
        </Badge>
      </div>
      <CardContent className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{card.network} · {card.category}</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">{card.name}</h3>
          </div>
          <Badge variant="secondary">Product facts</Badge>
        </div>

        <dl className="grid gap-3 border-y border-border py-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Annual fee</dt>
            <dd className="mt-1 text-sm font-semibold">{card.fee}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Eligibility</dt>
            <dd className="mt-1 text-sm leading-5">{card.eligibility}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Rewards</dt>
            <dd className="mt-1 text-sm">{card.rewards}</dd>
          </div>
        </dl>

        <div>
          <h4 className="text-sm font-semibold">Benefits listed</h4>
          <ul className="mt-3 space-y-2">
            {card.benefits.map((benefit) => (
              <li key={benefit} className="flex gap-2 text-sm leading-5 text-muted-foreground">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-md bg-muted p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Costs and terms</p>
          <p className="mt-1 text-sm leading-5">{card.goodToKnow}</p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Confirm the current fee schedule and other charges with the bank before applying.
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
          <span className="text-xs text-muted-foreground">Illustrative information · not live-verified</span>
          <Button asChild variant="secondary">
            <a href={cardHref(card.id)}>
              View card profile <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function OfferCard({ offer }: { offer: DemoOffer }) {
  const eligibleCard = getBankFromHash().cards.find((card) => card.id === offer.cardId);
  return (
    <Card className="h-full border-border shadow-none">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline">{offer.category}</Badge>
          {offer.sponsored ? <Badge variant="secondary">Sponsored offer</Badge> : null}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{offer.merchant}</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight">{offer.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{offer.location}</p>
        </div>
        <div className="rounded-md bg-muted p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Conditions</p>
          <p className="mt-1 text-sm leading-5">{offer.condition}</p>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <Clock3 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <span>Illustrative expiry: {offer.validUntil}</span>
        </div>
        <div className="mt-auto border-t border-border pt-4">
          {eligibleCard ? (
            <Button asChild variant="link" className="h-auto min-h-11 px-0">
              <a href={cardHref(eligibleCard.id)}>
                See eligible card: {eligibleCard.name} <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">Eligible card details are not available in this example.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function MoneySenseBankProfile() {
  const bank = getBankFromHash();
  const [productCategory, setProductCategory] = useState("All products");
  const [offerCategory, setOfferCategory] = useState("All offers");
  const [endingSoonOnly, setEndingSoonOnly] = useState(false);

  const products = useMemo(
    () =>
      bank.cards.filter((card) => productCategory === "All products" || card.category === productCategory),
    [bank.cards, productCategory],
  );
  const offers = useMemo(
    () =>
      bank.offers.filter((offer) => {
        const matchesCategory = offerCategory === "All offers" || offer.category === offerCategory;
        const stillActive = offer.daysLeft >= 0;
        const endingSoon = !endingSoonOnly || offer.daysLeft <= 14;
        return matchesCategory && stillActive && endingSoon;
      }),
    [bank.offers, endingSoonOnly, offerCategory],
  );

  return (
    <MoneySensePage>
      <main>
        <section className="border-b border-border bg-muted/50">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <Button asChild variant="ghost" className="-ml-3 mb-6">
              <a href="#/MoneySenseHome">← Back to Money Sense</a>
            </Button>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">Participating bank</Badge>
                  <Badge variant="secondary">Illustrative profile</Badge>
                </div>
                <div className="mt-5 flex items-start gap-4">
                  <div
                    aria-hidden="true"
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-lg font-semibold"
                  >
                    {bank.initial}
                  </div>
                  <div>
                    <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">{bank.name}</h1>
                    <div aria-hidden="true" className="mt-3 h-1 w-12 rounded-full bg-accent" />
                    <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                      Explore this participating bank’s cards and listed benefits in a consistent, practical format.
                      Product terms and example offers below are fictional for this prototype.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[...new Set(bank.cards.map((card) => card.category))].map((category) => (
                    <Badge key={category} variant="outline">{category}</Badge>
                  ))}
                  {!bank.cards.length ? <Badge variant="outline">No products listed</Badge> : null}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild variant="secondary">
                    <a
                      href="https://example.com/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open illustrative official information link for ${bank.name}`}
                    >
                      Official information <ExternalLink aria-hidden="true" />
                    </a>
                  </Button>
                  <span className="self-center text-sm text-muted-foreground">Illustrative link · example.com</span>
                </div>

                {bank.cards[0] ? (
                  <Card className="mt-6 max-w-2xl border-accent/30 bg-chart-1/40 shadow-none">
                    <CardContent className="flex gap-3 p-4 sm:p-5">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent/10">
                        <Check aria-hidden="true" className="h-5 w-5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold">A listed benefit</p>
                          <Badge variant="outline" className="border-accent/30 bg-background">
                            Illustrative product fact
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm leading-5">{bank.cards[0].benefits[0]}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {bank.cards[0].name} · Product information, not a recommendation.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : null}
              </div>

              <Card className="border-border shadow-none">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2">
                    <Info aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
                    <h2 className="text-sm font-semibold">Information status</h2>
                  </div>
                  <p className="mt-3 text-sm font-medium">Illustrative only · not verified live</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    No product information on this page is confirmed as current. Check official bank materials before
                    making a decision.
                  </p>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Partner status</p>
                    <p className="mt-1 text-sm font-semibold">{bank.id === "demo-bank" ? "Paid partner" : "Participating bank"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {bank.id === "demo-bank" ? (
          <section aria-label="Paid partner disclosure" className="border-b border-border bg-background">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-start sm:px-6 lg:px-8">
              <Badge variant="outline" className="w-fit shrink-0">Paid partner</Badge>
              <p className="max-w-4xl text-sm leading-6 text-muted-foreground">
                Demo Bank pays for visibility in this clearly labelled partner space and any offer explicitly marked
                sponsored. Paid visibility does not change, rank, or influence the same structured product facts shown
                below. Every product uses the same fields and presentation.
              </p>
            </div>
          </section>
        ) : null}

        <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <section id="products" aria-labelledby="products-heading" className="scroll-mt-24">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Structured product information</p>
                <h2 id="products-heading" className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
                  Products from {bank.name}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Benefits, eligibility and costs are presented using the same structure for every participating bank.
                  These examples are not an endorsement or a live-verified offer.
                </p>
              </div>
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {products.length} {products.length === 1 ? "product" : "products"} shown
              </p>
            </div>

            <div className="mt-6">
              <CategoryFilters
                label="Filter products by category"
                options={bankCategories}
                value={productCategory}
                onChange={setProductCategory}
              />
            </div>

            {products.length ? (
              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {products.map((card) => <ProductCard key={card.id} card={card} />)}
              </div>
            ) : (
              <Card className="mt-6 border-dashed shadow-none">
                <CardContent className="flex flex-col items-start gap-3 p-6 sm:p-8">
                  <Badge variant="outline">No matching products</Badge>
                  <h3 className="text-lg font-semibold">There are no {productCategory.toLowerCase()} products listed.</h3>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                    Try another category or reset the product filter. We do not fill gaps with assumed product details.
                  </p>
                  <Button type="button" variant="secondary" onClick={() => setProductCategory("All products")}>
                    <RotateCcw aria-hidden="true" /> Reset product filter
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>

          <section id="offers" aria-labelledby="offers-heading" className="scroll-mt-24 border-t border-border pt-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Listed benefits and terms</p>
                <h2 id="offers-heading" className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
                  Active offers
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Offer conditions and illustrative expiry dates are included so you can check the details at a glance.
                  Confirm availability with the bank or merchant.
                </p>
              </div>
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {offers.length} {offers.length === 1 ? "offer" : "offers"} shown
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <CategoryFilters
                label="Filter offers by category"
                options={offerCategories}
                value={offerCategory}
                onChange={setOfferCategory}
              />
              <Button
                type="button"
                variant={endingSoonOnly ? "default" : "outline"}
                size="sm"
                aria-pressed={endingSoonOnly}
                onClick={() => setEndingSoonOnly((current) => !current)}
                className="w-fit"
              >
                <Clock3 aria-hidden="true" />
                {endingSoonOnly ? "Ending soon · on" : "Ending soon"}
              </Button>
            </div>

            {offers.length ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
              </div>
            ) : (
              <Card className="mt-6 border-dashed shadow-none">
                <CardContent className="flex flex-col items-start gap-3 p-6 sm:p-8">
                  <Badge variant="outline">No matching active offers</Badge>
                  <h3 className="text-lg font-semibold">Nothing matches these filters right now.</h3>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                    This illustrative profile has no active offer in the selected category or time window.
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setOfferCategory("All offers");
                      setEndingSoonOnly(false);
                    }}
                  >
                    <RotateCcw aria-hidden="true" /> Reset offer filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>

          <section aria-labelledby="about-heading" className="border-t border-border pt-8">
            <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Info aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h2 id="about-heading" className="text-lg font-semibold">A note on this profile</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  All bank, product, benefit, fee and offer information shown here is fictional and illustrative.
                  Nothing is verified live, and paid visibility is disclosed separately from the structured product
                  facts. Please review current terms directly with the institution.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </MoneySensePage>
  );
}
