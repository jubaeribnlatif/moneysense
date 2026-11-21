import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  CreditCard,
  Info,
  MapPin,
  Plane,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import { Badge } from "@workspace/money-sense/components/ui/badge";
import { Button } from "@workspace/money-sense/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/money-sense/components/ui/card";
import { Separator } from "@workspace/money-sense/components/ui/separator";
import {
  bankHref,
  cardHref,
  demoCards,
  demoOffers,
  getCardFromHash,
  MoneySensePage,
  SponsoredLabel,
  type DemoCard,
  type DemoOffer,
} from "./_shared/money-sense-shared";

const COMPARE_STORAGE_KEY = "money-sense-compare-cards";
const MAX_COMPARE_CARDS = 3;

function readComparedCards(): string[] {
  try {
    const stored = window.localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (id): id is string =>
        typeof id === "string" && demoCards.some((card) => card.id === id),
    );
  } catch {
    return [];
  }
}

function formatOfferDate(value: string) {
  return value;
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[minmax(9rem,0.7fr)_1.3fr] sm:gap-6">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm leading-6 text-foreground">{value}</dd>
    </div>
  );
}

function OfferCard({ offer }: { offer: DemoOffer }) {
  return (
    <Card className="h-full shadow-none">
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{offer.category}</Badge>
          {offer.sponsored && <SponsoredLabel />}
        </div>
        <div>
          <CardDescription>{offer.merchant}</CardDescription>
          <CardTitle className="mt-2 text-xl">{offer.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-muted-foreground">{offer.condition}</p>
        <Separator />
        <dl className="grid gap-3 text-sm">
          <div className="flex items-start justify-between gap-4">
            <dt className="text-muted-foreground">Where</dt>
            <dd className="text-right">{offer.location}</dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="text-muted-foreground">Listed validity</dt>
            <dd className="text-right">{formatOfferDate(offer.validUntil)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

function getCostNotes(card: DemoCard) {
  const notes = [
    { label: "Annual fee", value: card.fee },
    {
      label: "Interest rate and repayment charges",
      value: "Not supplied in this illustrative profile.",
    },
    {
      label: "Late-payment and other service fees",
      value: "Not supplied in this illustrative profile.",
    },
    {
      label: "Foreign-currency charge",
      value:
        card.id === "everyday-cashback"
          ? card.travel
          : "Not supplied in this illustrative profile.",
    },
  ];
  return notes;
}

export function MoneySenseCardProfile() {
  const [card, setCard] = useState<DemoCard>(() => getCardFromHash());
  const offers = useMemo(
    () => demoOffers.filter((offer) => offer.cardId === card.id),
    [card.id],
  );
  const [comparedCards, setComparedCards] = useState<string[]>(readComparedCards);
  const [compareMessage, setCompareMessage] = useState("");
  const isCompared = comparedCards.includes(card.id);
  const costNotes = getCostNotes(card);

  useEffect(() => {
    const syncCardFromHash = () => setCard(getCardFromHash());
    window.addEventListener("hashchange", syncCardFromHash);
    return () => window.removeEventListener("hashchange", syncCardFromHash);
  }, []);

  function goToComparison() {
    let nextCards = readComparedCards();
    if (!nextCards.includes(card.id)) {
      if (nextCards.length >= MAX_COMPARE_CARDS) {
        setComparedCards(nextCards);
        setCompareMessage(
          "Your comparison already has three cards. Remove one on the comparison page before adding this card.",
        );
        window.location.hash = `/MoneySenseHome?compare=${encodeURIComponent(card.id)}&section=compare`;
        return;
      }
      nextCards = [...nextCards, card.id];
      try {
        window.localStorage.setItem(
          COMPARE_STORAGE_KEY,
          JSON.stringify(nextCards),
        );
      } catch {
        // The card ID also travels in the route for environments without storage.
      }
      setComparedCards(nextCards);
    }
    setCompareMessage(`${card.name} is selected for comparison.`);
    window.location.hash = `/MoneySenseHome?compare=${encodeURIComponent(card.id)}&section=compare`;
  }

  return (
    <MoneySensePage active="Discover">
      <main>
        <section className="border-b border-border bg-muted/50">
          <div className="mx-auto max-w-6xl px-5 pb-10 pt-6 md:px-8 md:pb-14">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <a
                href="#/MoneySenseHome"
                className="inline-flex min-h-11 items-center gap-2 hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Money Sense home
              </a>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-foreground">
                {card.name}
              </span>
            </nav>

            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
              <div className="space-y-5">
                <p className="inline-flex items-center gap-2 text-sm font-medium text-accent-foreground">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
                  Card profile
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{card.category} card</Badge>
                  <Badge variant="secondary">
                    Illustrative information · Last reviewed {card.verifiedOn}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.bank} · {card.network}
                  </p>
                  <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                    {card.name}
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                    A clear look at the costs, eligibility and benefits to weigh
                    up before deciding whether this fictional card fits your
                    needs.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    type="button"
                    size="lg"
                    onClick={goToComparison}
                    aria-pressed={isCompared}
                    className="min-h-11"
                  >
                    {isCompared ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <CreditCard className="h-4 w-4" aria-hidden="true" />
                    )}
                    {isCompared ? "Selected · view comparison" : "Add to compare"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <a
                    href={bankHref(card.bankId)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    About {card.bank}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
                {compareMessage && (
                  <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
                    {compareMessage}
                  </p>
                )}
                <p className="text-sm leading-6 text-muted-foreground">
                  No application link is shown: this is a fictional product
                </p>
              </div>

              <figure className="mx-auto w-full max-w-lg">
                <div className="rounded-2xl bg-gradient-to-br from-accent/20 via-chart-1/30 to-background p-1.5">
                  <div className="overflow-hidden rounded-xl border border-border bg-background p-3 shadow-sm">
                    <img
                      src={card.image}
                      alt={`Illustrative fictional ${card.name} card artwork`}
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                  </div>
                </div>
                <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                  <span>{card.bank} {card.name}</span>
                  <span>Illustrative card artwork</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <div className="min-w-0 space-y-10">
            <section aria-labelledby="profile-at-a-glance" className="space-y-5">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">The essentials</p>
                <h2 id="profile-at-a-glance" className="font-serif text-3xl tracking-tight">
                  Start with the details
                </h2>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                  Product terms below are fictional examples from the Money
                  Sense prototype, not current bank terms.
                </p>
              </div>
              <dl className="divide-y divide-border rounded-xl border border-border bg-card px-5 sm:px-6">
                <DetailRow label="Bank" value={card.bank} />
                <DetailRow label="Card network and tier" value={card.network} />
                <DetailRow label="Annual fee" value={card.fee} />
                <DetailRow label="Eligibility" value={card.eligibility} />
                <DetailRow label="Rewards" value={card.rewards} />
                <DetailRow label="Potential fit" value={card.bestFor.join(", ")} />
              </dl>
            </section>

            <section aria-labelledby="benefits-heading" className="space-y-5">
              <div className="space-y-2">
                <p className="text-sm font-medium text-accent-foreground">Benefits</p>
                <h2 id="benefits-heading" className="font-serif text-3xl tracking-tight">
                  What the card describes
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {card.benefits.map((benefit, index) => {
                  const benefitIcons = [Utensils, ShoppingBag, CreditCard];
                  const BenefitIcon = benefitIcons[index % benefitIcons.length];
                  return (
                    <Card key={benefit} className="h-full shadow-none">
                      <CardHeader className="gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-1/30 text-foreground">
                          <BenefitIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <CardTitle className="text-base leading-6">{benefit}</CardTitle>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                Rewards and benefits may have exclusions, limits or other
                conditions. Review the bank’s current terms before relying on
                them.
              </p>
            </section>

            <section aria-labelledby="lifestyle-heading" className="space-y-5">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Everyday use</p>
                <h2 id="lifestyle-heading" className="font-serif text-3xl tracking-tight">
                  Travel and lifestyle
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="shadow-none">
                  <CardHeader className="gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                      <Plane className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-base">Travel and international use</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">{card.travel}</p>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardHeader className="gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-base">Dining and shopping</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">{card.lifestyle}</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section aria-labelledby="costs-heading" className="space-y-5">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Before you decide</p>
                <h2 id="costs-heading" className="font-serif text-3xl tracking-tight">
                  Costs and charges
                </h2>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                  The annual fee is the only cost supplied in this sample.
                  Missing figures are called out rather than estimated.
                </p>
              </div>
              <dl className="divide-y divide-border rounded-xl border border-border bg-card px-5 sm:px-6">
                {costNotes.map((note) => (
                  <DetailRow key={note.label} label={note.label} value={note.value} />
                ))}
              </dl>
            </section>

            <section aria-labelledby="caveats-heading" className="space-y-5">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Read the conditions</p>
                <h2 id="caveats-heading" className="font-serif text-3xl tracking-tight">
                  Good to know
                </h2>
              </div>
              <Card className="border-border bg-muted/50 shadow-none">
                <CardContent className="flex gap-3 p-5 sm:p-6">
                  <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Discounts and rewards come with conditions</h3>
                    <p className="text-sm leading-6 text-muted-foreground">{card.goodToKnow}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-base">What is not confirmed in this profile?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                    <p>
                      This page uses fictional sample data. No issuer has
                      verified these terms, fee amounts, eligibility criteria
                      or offer details.
                    </p>
                    <p>
                      Interest, repayment, exclusions and other charges may
                      materially affect the overall cost. Confirm the latest
                      official schedule and full conditions with the bank
                      before making a decision.
                    </p>
                </CardContent>
              </Card>
            </section>

            <section aria-labelledby="offers-heading" className="space-y-5">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Offers</p>
                <h2 id="offers-heading" className="font-serif text-3xl tracking-tight">
                  Offers listed for this card
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  Illustrative examples only — availability and validity have
                  not been confirmed with the bank or merchant.
                </p>
              </div>
              {offers.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {offers.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} />
                  ))}
                </div>
              ) : (
                <Card className="border-dashed bg-muted/50 shadow-none">
                  <CardContent className="flex items-start gap-3 p-5 sm:p-6">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold">No sample offer is listed</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        This does not confirm that the bank has no offers.
                        Check directly with the bank for current information.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {offers.some((offer) => offer.sponsored) && (
                <p className="text-sm leading-6 text-muted-foreground">
                  Sponsored status affects visibility only; it does not change
                  how Money Sense describes fit or suitability.
                </p>
              )}
            </section>

            <section aria-labelledby="related-heading" className="space-y-5">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Explore further</p>
                <h2 id="related-heading" className="font-serif text-3xl tracking-tight">
                  Compare with another card
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {demoCards
                  .filter((otherCard) => otherCard.id !== card.id)
                  .slice(0, 2)
                  .map((otherCard) => (
                    <Card key={otherCard.id} className="shadow-none">
                      <CardContent className="flex items-center justify-between gap-4 p-5">
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground">{otherCard.bank}</p>
                          <h3 className="mt-1 font-semibold">{otherCard.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Annual fee: {otherCard.fee}
                          </p>
                        </div>
                        <a
                          href={cardHref(otherCard.id)}
                          className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          View
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="shadow-none">
              <CardHeader>
                <CardDescription>At a glance</CardDescription>
                <CardTitle className="text-2xl">{card.fee}</CardTitle>
                <CardDescription>Annual fee · illustrative sample</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Eligibility</p>
                  <p className="text-sm leading-6 text-muted-foreground">{card.eligibility}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Rewards</p>
                  <p className="text-sm leading-6 text-muted-foreground">{card.rewards}</p>
                </div>
                <Button type="button" className="min-h-11 w-full" onClick={goToComparison}>
                  {isCompared ? "View comparison" : "Add to compare"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <p className="text-xs leading-5 text-muted-foreground">
                  Compare the same details across cards. No product is ranked
                  or endorsed here.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 shadow-none">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Info className="h-4 w-4" aria-hidden="true" />
                  About this information
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  Fictional sample profile. Last reviewed {card.verifiedOn};
                  not verified by {card.bank}.
                </p>
                <a
                  href={bankHref(card.bankId)}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  View {card.bank} profile
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </MoneySensePage>
  );
}
