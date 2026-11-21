import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, Check, ChevronLeft, ChevronRight, Clock3, Compass, Search, ShieldCheck, SlidersHorizontal, Sparkles } from "lucide-react";
import { Badge } from "@workspace/money-sense/components/ui/badge";
import { Button } from "@workspace/money-sense/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/money-sense/components/ui/card";
import { Checkbox } from "@workspace/money-sense/components/ui/checkbox";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@workspace/money-sense/components/ui/empty";
import { Input } from "@workspace/money-sense/components/ui/input";
import { Switch } from "@workspace/money-sense/components/ui/switch";
import { Toggle } from "@workspace/money-sense/components/ui/toggle";
import {
  bankHref,
  CARD_IMAGE,
  cardHref,
  demoCards,
  demoOffers,
  HERO_IMAGE,
  MoneySensePage,
  SponsoredLabel,
  VerifiedLabel,
} from "./_shared/money-sense-shared";
import type { DemoCard, DemoOffer } from "./_shared/money-sense-shared";

const categories = ["Dining", "Travel", "Shopping", "Everyday"];
const needs = [
  { title: "Make everyday spending count", detail: "Cashback and rewards on regular purchases.", query: "cashback", tone: "bg-muted" },
  { title: "Eat out for less", detail: "Dining benefits with terms you can see.", query: "dining", tone: "bg-secondary" },
  { title: "Travel with a little more ease", detail: "Explore lounge access and travel cover.", query: "travel", tone: "bg-muted" },
  { title: "Plan a larger purchase", detail: "Find instalment options and understand the fees.", query: "instalments", tone: "bg-secondary" },
];

const questions = [
  { key: "spend", title: "What do you spend most on?", options: ["Everyday", "Dining", "Travel", "Shopping"] },
  { key: "benefit", title: "Which benefit matters most?", options: ["Cashback", "Discounts", "Airport lounges", "Instalments"] },
  { key: "travel", title: "How often do you travel?", options: ["Often", "Sometimes", "Rarely"] },
  { key: "fee", title: "What matters most about the annual fee?", options: ["Keep it low", "A balance of fee and benefits", "Benefits matter more"] },
  { key: "network", title: "Do you have a card network preference?", options: ["Visa", "Mastercard", "No preference"] },
] as const;

type AnswerKey = (typeof questions)[number]["key"];
type Answers = Partial<Record<AnswerKey, string>>;
const COMPARE_STORAGE_KEY = "money-sense-compare-cards";

const compareRows: { label: string; value: (card: DemoCard) => string }[] = [
  { label: "Annual fee", value: (card) => card.fee },
  { label: "Eligibility", value: (card) => card.eligibility },
  { label: "Rewards", value: (card) => card.rewards },
  { label: "Travel", value: (card) => card.travel },
  { label: "Lifestyle", value: (card) => card.lifestyle },
];

function readCompareSelection() {
  const parseValue = (value: string | null): string[] => {
    if (!value) return [];
    try {
      const parsed: unknown = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (id): id is string => typeof id === "string" && demoCards.some((card) => card.id === id),
        );
      }
      if (typeof parsed === "string" && demoCards.some((card) => card.id === parsed)) return [parsed];
    } catch {
      if (demoCards.some((card) => card.id === value)) return [value];
    }
    return [];
  };

  try {
    const sessionSelection = parseValue(window.sessionStorage.getItem(COMPARE_STORAGE_KEY));
    if (sessionSelection.length) return [...new Set(sessionSelection)].slice(0, 3);
  } catch {
    // Storage can be unavailable in restricted browsing contexts.
  }
  try {
    return [...new Set(parseValue(window.localStorage.getItem(COMPARE_STORAGE_KEY)))].slice(0, 3);
  } catch {
    return [];
  }
}

function SectionHeading({ eyebrow, title, detail, id }: { eyebrow?: string; title: string; detail?: string; id?: string }) {
  return (
    <div id={id} className="mb-5 scroll-mt-24">
      {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>}
      <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">{title}</h2>
      {detail && <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">{detail}</p>}
    </div>
  );
}

function ProductCard({
  card,
  selected,
  selectedCardsAtLimit,
  onToggle,
}: {
  card: DemoCard;
  selected: boolean;
  selectedCardsAtLimit: boolean;
  onToggle: (id: string, checked: boolean) => void;
}) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-border shadow-none transition-transform motion-reduce:transition-none hover:-translate-y-1">
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-muted p-4">
        <CardArtwork card={card} />
        <Badge variant="secondary" className="absolute left-4 top-4">{card.category}</Badge>
      </div>
      <CardHeader className="gap-1 p-5 pb-3">
        <a href={bankHref(card.bankId)} className="text-sm text-muted-foreground underline-offset-4 hover:underline">{card.bank}</a>
        <CardTitle className="text-xl">{card.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{card.network}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-5 pt-0">
        <p className="mb-3 text-sm leading-6"><span className="font-medium">Annual fee:</span> {card.fee}</p>
        <p className="mb-4 text-sm leading-6 text-muted-foreground">{card.bestFor.join(" · ")}</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {card.benefits.slice(0, 2).map((benefit) => <Badge key={benefit} variant="outline" className="whitespace-normal">{benefit}</Badge>)}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <a href={cardHref(card.id)} className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-foreground underline-offset-4 hover:underline">
            View card <ArrowRight className="h-4 w-4" />
          </a>
          <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
            <Checkbox checked={selected} disabled={!selected && selectedCardsAtLimit} onCheckedChange={(checked) => onToggle(card.id, checked === true)} aria-label={`Select ${card.name} to compare`} />
            Compare
          </label>
        </div>
        <div className="mt-2"><VerifiedLabel>{`Verified · ${card.verifiedOn}`}</VerifiedLabel></div>
      </CardContent>
    </Card>
  );
}

function CardArtwork({ card }: { card: DemoCard }) {
  if (card.id === "voyager-plus") {
    return <img src={card.image || CARD_IMAGE} alt={`${card.name} illustrative card artwork`} className="h-full w-full rounded-md object-cover" />;
  }

  const artworkTone = {
    "dine-shop": "bg-primary",
    "everyday-cashback": "bg-chart-1",
    "city-flex": "bg-secondary",
  }[card.id] ?? "bg-muted";
  const isDark = card.id === "dine-shop";

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-lg border border-border ${artworkTone}`}>
      <span aria-hidden="true" className="absolute -right-4 -top-6 h-28 w-28 rounded-full border border-accent/30 bg-accent/15" />
      <span aria-hidden="true" className="absolute -bottom-7 -left-4 h-20 w-20 rounded-full border border-chart-1/60 bg-chart-1/40" />
      <div className="relative flex h-full flex-col justify-between p-4">
        <div className={`flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-widest ${isDark ? "text-primary-foreground" : "text-foreground"}`}>
          <span>{card.bank}</span>
          <span aria-hidden="true" className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="h-2 w-2 rounded-full bg-chart-1" />
          </span>
        </div>
        <div className="max-w-fit rounded-md border border-border bg-background/80 px-3 py-2 text-foreground">
          <p className="font-serif text-lg leading-tight">{card.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">{card.network}</p>
        </div>
      </div>
    </div>
  );
}

function OfferCard({ offer }: { offer: DemoOffer }) {
  return (
    <Card className="h-full border-border shadow-none">
      <CardContent className="flex h-full flex-col p-5">
        <div className="mb-4 flex min-h-7 flex-wrap items-center justify-between gap-2">
          <Badge variant="outline">{offer.category}</Badge>
          {offer.sponsored && <SponsoredLabel />}
        </div>
        <p className="text-sm text-muted-foreground">{offer.bank} · {offer.location}</p>
        <h3 className="mt-2 font-serif text-2xl">{offer.title}</h3>
        <p className="mt-1 text-sm font-semibold">{offer.merchant}</p>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{offer.condition}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4 text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Clock3 className="h-4 w-4" /> Valid until {offer.validUntil}</span>
          <a href={cardHref(offer.cardId)} className="font-semibold underline-offset-4 hover:underline">Details</a>
        </div>
      </CardContent>
    </Card>
  );
}

function scoreCard(card: DemoCard, answers: Answers) {
  let score = 0;
  const reasons: string[] = [];
  const facts = `${card.category} ${card.bestFor.join(" ")} ${card.benefits.join(" ")} ${card.matchTags.join(" ")} ${card.travel} ${card.network}`.toLowerCase();
  const addIfMatches = (answer: string | undefined, terms: string[], reason: string) => {
    if (answer && terms.some((term) => facts.includes(term))) {
      score += 1;
      reasons.push(reason);
    }
  };
  addIfMatches(answers.spend, [answers.spend?.toLowerCase() ?? ""], `Fits your ${answers.spend?.toLowerCase()} spending interest`);
  const benefitTerms: Record<string, string[]> = {
    Cashback: ["cashback"],
    Discounts: ["discount", "off"],
    "Airport lounges": ["lounge"],
    Instalments: ["instalment"],
  };
  if (answers.benefit && benefitTerms[answers.benefit]?.some((term) => facts.includes(term))) {
    score += 1;
    reasons.push(`Includes ${answers.benefit.toLowerCase()}`);
  }
  if (answers.travel === "Often" && /lounge|travel insurance|travel benefits/.test(facts)) {
    score += 1;
    reasons.push("Travel benefits match your frequent travel");
  } else if (answers.travel === "Sometimes" && /travel|foreign-currency/.test(facts)) {
    score += 1;
    reasons.push("Has stated travel information");
  } else if (answers.travel === "Rarely" && /no travel|no complimentary lounge/.test(facts)) {
    score += 1;
    reasons.push("Card facts list limited or no travel privileges");
  }
  if (answers.fee === "Keep it low" && card.feeAmount <= 2500) {
    score += 1;
    reasons.push("Lower annual fee among these examples");
  } else if (answers.fee === "A balance of fee and benefits" && card.feeAmount <= 3000) {
    score += 1;
    reasons.push("Fee and stated benefits fit a balanced preference");
  } else if (answers.fee === "Benefits matter more" && card.benefits.length >= 3) {
    score += 1;
    reasons.push("Several stated benefits");
  }
  if (answers.network && answers.network !== "No preference" && card.network.toLowerCase().includes(answers.network.toLowerCase())) {
    score += 1;
    reasons.push(`Uses ${answers.network}`);
  }
  return { score, reasons };
}

function scrollToId(id: string) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

export function MoneySenseHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const [offerCategory, setOfferCategory] = useState("All");
  const [endingSoon, setEndingSoon] = useState(false);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const [finderStep, setFinderStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [finderComplete, setFinderComplete] = useState(false);
  const [heroInterest, setHeroInterest] = useState("");

  useEffect(() => {
    const routeParams = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
    const requestedCardId = routeParams.get("compare");
    const storedSelection = readCompareSelection();
    const requestedCardIsValid = requestedCardId && demoCards.some((card) => card.id === requestedCardId);
    const restoredSelection = requestedCardIsValid && !storedSelection.includes(requestedCardId) && storedSelection.length < 3
      ? [...storedSelection, requestedCardId]
      : storedSelection;

    setSelectedCards(restoredSelection);
    if (requestedCardId || routeParams.get("section") === "compare") {
      window.requestAnimationFrame(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById("compare")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      });
    }
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchingCards = useMemo(() => demoCards.filter((card) => {
    if (!normalizedSearch) return true;
    return `${card.name} ${card.bank} ${card.category} ${card.network} ${card.eligibility} ${card.rewards} ${card.benefits.join(" ")} ${card.bestFor.join(" ")} ${card.matchTags.join(" ")}`.toLowerCase().includes(normalizedSearch);
  }), [normalizedSearch]);

  const visibleOffers = useMemo(() => demoOffers.filter((offer) => {
    const categoryMatch = offerCategory === "All" || offer.category === offerCategory;
    const timeMatch = !endingSoon || offer.daysLeft <= 14;
    const searchMatch = !normalizedSearch || `${offer.bank} ${offer.merchant} ${offer.title} ${offer.category} ${offer.location} ${offer.condition}`.toLowerCase().includes(normalizedSearch);
    return categoryMatch && timeMatch && searchMatch;
  }), [endingSoon, normalizedSearch, offerCategory]);

  const searchResultsCount = normalizedSearch ? matchingCards.length + visibleOffers.length : 0;
  const comparedCards = demoCards.filter((card) => selectedCards.includes(card.id));
  const rankedResults = useMemo(() => demoCards.map((card) => ({ card, ...scoreCard(card, answers) }))
    .sort((a, b) => b.score - a.score || a.card.name.localeCompare(b.card.name)), [answers]);

  function toggleCompare(id: string, checked: boolean) {
    setSelectedCards((current) => {
      if (checked) return current.length >= 3 ? current : [...current, id];
      return current.filter((cardId) => cardId !== id);
    });
  }

  function setInterest(term: string) {
    setSearchTerm(term);
    scrollToId("discover");
  }

  function chooseFinderAnswer(value: string) {
    const key = questions[finderStep].key as AnswerKey;
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function nextFinderStep() {
    if (finderStep < questions.length - 1) setFinderStep((step) => step + 1);
    else setFinderComplete(true);
  }

  function resetFinder() {
    setFinderStep(0);
    setAnswers({});
    setFinderComplete(false);
  }

  return (
    <MoneySensePage active="Discover">
      <main className="overflow-hidden">
        <section className="mx-auto grid max-w-6xl items-center gap-6 px-5 pb-8 pt-6 md:grid-cols-2 md:gap-10 md:px-8 md:pb-10 md:pt-8">
          <div className="order-1 md:order-1">
            <Badge variant="secondary" className="mb-4">A financial platform by The Daily Star</Badge>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Make your money make sense</p>
            <h1 className="max-w-xl font-serif text-5xl leading-tight tracking-tight sm:text-6xl md:text-7xl">Make Your Money Make Sense.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">Discover cards, find offers and compare financial benefits that fit the way you live.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button className="min-h-11" onClick={() => scrollToId("finder")}>Find my card <ArrowRight /></Button>
              <Button variant="outline" className="min-h-11" onClick={() => scrollToId("offers")}>Explore offers</Button>
            </div>
            <Button variant="link" className="mt-4 hidden min-h-11 px-0 sm:inline-flex" onClick={() => scrollToId("compare")}>
              Compare cards <ArrowDownRight className="h-4 w-4" />
            </Button>
            <div className="mt-6 rounded-xl border-l-4 border-l-accent border-y border-r border-border bg-card p-4 sm:p-5">
              <p className="mb-3 text-sm font-semibold">What matters most to you?</p>
              <div className="flex flex-wrap gap-2">
                {["Everyday", "Dining", "Travel", "Cashback"].map((interest) => (
                  <Toggle key={interest} variant="outline" pressed={heroInterest === interest} className="min-h-11 px-2" aria-pressed={heroInterest === interest} onPressedChange={(pressed) => { setHeroInterest(pressed ? interest : ""); setSearchTerm(pressed ? interest.split(" ")[0] : ""); if (pressed) scrollToId("discover"); }}>
                    {interest}
                  </Toggle>
                ))}
              </div>
            </div>
          </div>
          <div className="order-2 relative md:order-2">
            <div className="rounded-xl bg-gradient-to-br from-chart-1 via-chart-1 to-accent p-1.5">
              <div className="overflow-hidden rounded-lg bg-muted">
                <img src={HERO_IMAGE} alt="A person reviewing a payment card and phone over coffee" className="h-40 w-full object-cover sm:aspect-video sm:h-auto" />
              </div>
            </div>
            <Card className="absolute bottom-4 left-4 right-4 border-border bg-card shadow-none md:-bottom-5 md:-left-10 md:right-auto md:w-64">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary"><Compass className="h-5 w-5" /></div>
                <div><p className="text-sm font-semibold">Start with what fits</p><p className="text-xs leading-5 text-muted-foreground">Clear facts, useful choices.</p></div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="discover" className="scroll-mt-24 border-y border-border bg-muted/50">
          <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
            <SectionHeading eyebrow="Explore" title="What are you looking for?" detail="Search banks, cards, merchants, offer categories or benefits." />
            <div className="relative max-w-3xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input className="min-h-12 pl-12 pr-4" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Try “cashback”, “Demo Bank” or “dining”" aria-label="Search banks, cards, merchants and benefits" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Dining", "Travel", "Shopping", "Cashback", "Instalments"].map((term) => (
                <Toggle key={term} variant="outline" pressed={searchTerm.toLowerCase() === term.toLowerCase()} className="min-h-11 px-3" aria-pressed={searchTerm.toLowerCase() === term.toLowerCase()} onPressedChange={(pressed) => { if (pressed) setInterest(term); else setSearchTerm(""); }}>{term}</Toggle>
              ))}
              {searchTerm && <Button variant="ghost" className="min-h-11" onClick={() => setSearchTerm("")}>Clear search</Button>}
            </div>
            {normalizedSearch && (
              <div className="mt-7" aria-live="polite">
                <p className="mb-4 text-sm text-muted-foreground">{searchResultsCount} matching {searchResultsCount === 1 ? "result" : "results"} across cards and offers</p>
                {searchResultsCount === 0 ? (
                  <Empty className="rounded-xl border border-dashed border-border bg-card">
                    <EmptyHeader>
                      <EmptyMedia variant="icon"><Search /></EmptyMedia>
                      <EmptyTitle>No matches yet</EmptyTitle>
                      <EmptyDescription>Try a bank, card name, merchant or benefit such as travel, cashback or instalments.</EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent><Button variant="outline" className="min-h-11" onClick={() => setSearchTerm("")}>Show all discovery</Button></EmptyContent>
                  </Empty>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {matchingCards.slice(0, 3).map((card) => (
                      <Card key={card.id} className="border-border shadow-none">
                        <CardContent className="flex items-center justify-between gap-3 p-4">
                          <div className="min-w-0"><p className="truncate font-semibold">{card.name}</p><p className="text-sm text-muted-foreground">{card.bank} · {card.category}</p></div>
                          <a href={cardHref(card.id)} className="shrink-0 text-sm font-semibold underline-offset-4 hover:underline">View card</a>
                        </CardContent>
                      </Card>
                    ))}
                    {visibleOffers.slice(0, 3).map((offer) => (
                      <Card key={offer.id} className="border-border shadow-none">
                        <CardContent className="flex items-center justify-between gap-3 p-4">
                          <div className="min-w-0"><p className="truncate font-semibold">{offer.title}</p><p className="text-sm text-muted-foreground">{offer.bank} · {offer.category}</p></div>
                          <a href={cardHref(offer.cardId)} className="shrink-0 text-sm font-semibold underline-offset-4 hover:underline">Offer details</a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="sponsored-heading" className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
          <Card className="overflow-hidden border-border bg-secondary/60 shadow-none">
            <div className="grid md:grid-cols-2">
              <div className="p-6 sm:p-8 md:p-10">
                <SponsoredLabel>Illustrative sponsored placement</SponsoredLabel>
                <h2 id="sponsored-heading" className="mt-5 max-w-xl font-serif text-3xl leading-tight md:text-4xl">A little more ease, wherever the day takes you.</h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Explore dining privileges in this sample partner feature. Eligibility and terms vary; check with the bank.</p>
                <Button asChild className="mt-6 min-h-11"><a href={cardHref("dine-shop")}>Explore the sample card <ArrowRight /></a></Button>
                <p className="mt-4 text-xs text-muted-foreground">Illustrative information only. Paid placement does not affect comparisons or Card Finder results.</p>
              </div>
              <div className="flex min-h-52 items-center justify-center bg-muted p-8">
                <div className="w-full max-w-xs rotate-1 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                  <img src={CARD_IMAGE} alt="Illustrative sample payment card" className="aspect-video w-full object-cover" />
                  <div className="p-4"><p className="text-xs uppercase tracking-widest text-muted-foreground">Sample benefit</p><p className="mt-1 font-serif text-2xl">Dining, made simpler</p></div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section id="offers" className="scroll-mt-24 bg-muted/50">
          <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeading eyebrow="Sample offers" title="Worth a Look Today" detail="Illustrative examples only—not live or verified offers." />
              <a href="#offer-results" className="mb-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline">Explore all offers <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2" aria-label="Filter offers by category">
                <SlidersHorizontal className="mr-1 h-4 w-4 text-muted-foreground" />
                {["All", ...categories].map((category) => (
                  <Toggle key={category} variant="outline" pressed={offerCategory === category} className="min-h-11 px-3" aria-pressed={offerCategory === category} onPressedChange={(pressed) => setOfferCategory(pressed ? category : "All")}>{category}</Toggle>
                ))}
              </div>
              <Button variant={endingSoon ? "secondary" : "outline"} className="min-h-11 w-fit" aria-pressed={endingSoon} onClick={() => setEndingSoon((value) => !value)}>
                <Clock3 className="h-4 w-4" /> {endingSoon ? "Ending within 14 days" : "Show ending within 14 days"}
              </Button>
            </div>
            {visibleOffers.length > 0 ? (
              <div id="offer-results" className="grid scroll-mt-24 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {visibleOffers.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
              </div>
            ) : (
              <Empty id="offer-results" className="scroll-mt-24 rounded-xl border border-dashed border-border bg-background">
                <EmptyHeader><EmptyMedia variant="icon"><Clock3 /></EmptyMedia><EmptyTitle>No sample offers in this view</EmptyTitle><EmptyDescription>Change the category or time filter to explore the other illustrative examples.</EmptyDescription></EmptyHeader>
                <EmptyContent><Button variant="outline" className="min-h-11" onClick={() => { setOfferCategory("All"); setEndingSoon(false); setSearchTerm(""); }}>Reset offer filters</Button></EmptyContent>
              </Empty>
            )}
          </div>
        </section>

        <section id="finder" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
          <SectionHeading eyebrow="Card Finder" title="Find a card that fits your life" detail="Your spending habits matter more than a long list of benefits. Five quick answers give you a fact-based starting point." />
          <Card className="overflow-hidden border-border shadow-none">
            <div className="grid lg:grid-cols-2">
              <div className="bg-muted p-6 sm:p-8">
                <div className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4" /> A simple way to start</div>
                <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">We compare your answers with listed card facts only. Sponsorship has no role in matching or result order.</p>
                <div className="mt-8 flex items-center justify-between text-sm"><span>{finderComplete ? "Your sample matches" : `Question ${finderStep + 1} of ${questions.length}`}</span><span>{finderComplete ? "Complete" : `${Math.round(((finderStep + 1) / questions.length) * 100)}%`}</span></div>
                <div
                  role="progressbar"
                  aria-label="Card Finder progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={finderComplete ? 100 : Math.round(((finderStep + 1) / questions.length) * 100)}
                  className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary"
                >
                  <div
                    className="h-full w-full origin-left rounded-full bg-accent transition-transform motion-reduce:transition-none"
                    style={{ transform: `scaleX(${finderComplete ? 1 : (finderStep + 1) / questions.length})` }}
                  />
                </div>
                <p className="mt-6 text-xs leading-5 text-muted-foreground">No information is saved. Results are illustrative and are not approval advice.</p>
              </div>
              <div className="p-6 sm:p-8">
                {!finderComplete ? (
                  <>
                    <h3 className="font-serif text-2xl sm:text-3xl">{questions[finderStep].title}</h3>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {questions[finderStep].options.map((option) => {
                        const key = questions[finderStep].key as AnswerKey;
                        const chosen = answers[key] === option;
                        return (
                          <Toggle key={option} variant="outline" pressed={chosen} className="min-h-12 w-full justify-start whitespace-normal px-4 text-left" aria-pressed={chosen} onPressedChange={(pressed) => { if (pressed) chooseFinderAnswer(option); }}>
                            {chosen && <Check className="h-4 w-4" />} {option}
                          </Toggle>
                        );
                      })}
                    </div>
                    <div className="mt-7 flex flex-wrap justify-between gap-3">
                      <Button variant="ghost" className="min-h-11" disabled={finderStep === 0} onClick={() => setFinderStep((step) => Math.max(0, step - 1))}><ChevronLeft /> Back</Button>
                      <Button className="min-h-11" disabled={!answers[questions[finderStep].key as AnswerKey]} onClick={nextFinderStep}>{finderStep === questions.length - 1 ? "See sample matches" : "Next"} <ChevronRight /></Button>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                      <div><h3 className="font-serif text-2xl sm:text-3xl">Cards that reflect your answers</h3><p className="mt-2 text-sm text-muted-foreground">Sorted by product-fact matches; ties are alphabetical.</p></div>
                      <Button variant="outline" className="min-h-11" onClick={resetFinder}>Start over</Button>
                    </div>
                    <div className="space-y-3">
                      {rankedResults.slice(0, 3).map(({ card, score, reasons }) => (
                        <Card key={card.id} className="border-border shadow-none">
                          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0"><p className="font-semibold">{card.name} <span className="font-normal text-muted-foreground">· {card.bank}</span></p><p className="mt-1 text-sm text-muted-foreground">{reasons.slice(0, 2).join(" · ") || "No exact preference match; review the card facts."}</p><p className="mt-1 text-xs text-muted-foreground">{score} fact-based matches · {card.fee}</p></div>
                            <a href={cardHref(card.id)} className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline">Review card <ArrowRight className="h-4 w-4" /></a>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </section>

        <section id="compare" className="scroll-mt-24 border-y border-border bg-muted/50">
          <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
            <SectionHeading eyebrow="Compare" title="Different cards. A clearer picture." detail="Select up to three cards. Fees, eligibility and benefits stay equally visible." />
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm"><span className="font-semibold">{selectedCards.length} of 3</span> cards selected</p>
              <div className="flex min-h-11 items-center gap-3">
                <Switch id="differences-only" checked={differencesOnly} onCheckedChange={setDifferencesOnly} />
                <label htmlFor="differences-only" className="cursor-pointer text-sm">Show differences only</label>
              </div>
            </div>
            {comparedCards.length > 0 && (
              <Card className="mb-8 border-border shadow-none">
                <CardHeader className="p-5 pb-3"><CardTitle className="text-xl">Your comparison</CardTitle></CardHeader>
                <CardContent className="p-5 pt-0">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {comparedCards.map((card) => (
                      <div key={card.id} className="min-w-0 rounded-lg border border-border p-4">
                        <p className="text-sm text-muted-foreground">{card.bank}</p><h3 className="mt-1 font-semibold">{card.name}</h3><p className="text-sm text-muted-foreground">{card.category} · {card.network}</p>
                        <div className="mt-4 space-y-3">
                          {compareRows.filter((row) => !differencesOnly || new Set(comparedCards.map((item) => row.value(item))).size > 1).map((row) => (
                            <div key={row.label} className="border-t border-border pt-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{row.label}</p>
                              <p className="mt-1 break-words text-sm leading-6">{row.value(card)}</p>
                            </div>
                          ))}
                        </div>
                        <a href={cardHref(card.id)} className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline">Card details <ArrowRight className="h-4 w-4" /></a>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-5 text-muted-foreground">Illustrative product details. Comparison order follows your selection; sponsored status is not used.</p>
                </CardContent>
              </Card>
            )}
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-serif text-2xl">Cards to explore</h3>
              <span className="text-sm text-muted-foreground">Illustrative product facts</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {demoCards.map((card) => <ProductCard key={card.id} card={card} selected={selectedCards.includes(card.id)} selectedCardsAtLimit={selectedCards.length >= 3} onToggle={toggleCompare} />)}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">Annual fees, eligibility and terms can change. Confirm details directly with each bank.</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
          <SectionHeading eyebrow="Explore by need" title="Start with what matters to you" detail="A helpful starting point, whether or not you already have a card in mind." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {needs.map((need, index) => (
              <Card key={need.title} className={`min-h-52 border-border shadow-none ${need.tone}`}>
                <CardContent className="flex h-full flex-col items-start p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold">0{index + 1}</span>
                  <h3 className="mt-6 font-serif text-2xl leading-tight">{need.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{need.detail}</p>
                  <Button variant="link" className="mt-auto min-h-11 px-0" onClick={() => setInterest(need.query)}>Explore <ArrowRight className="h-4 w-4" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="guides" className="scroll-mt-24 bg-muted/50">
          <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <SectionHeading eyebrow="Money Guides" title="Understand money better" detail="Plain-language guidance for decisions that deserve a closer look." />
                <Button asChild variant="outline" className="min-h-11"><a href="#guide-topics">Browse guide topics <ArrowRight /></a></Button>
              </div>
              <div id="guide-topics" className="grid scroll-mt-24 gap-4 sm:grid-cols-2">
                {[
                  ["Card basics", "What to check before choosing a credit card", "5 min read"],
                  ["Fees", "Annual fees and other charges, explained", "4 min read"],
                  ["Rewards", "Cashback or reward points: what is the difference?", "6 min read"],
                  ["Repayment", "Making sense of interest and instalments", "5 min read"],
                ].map(([topic, title, read]) => (
                  <Card key={title} className="border-border bg-background shadow-none">
                    <CardContent className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{topic}</p>
                      <h3 className="mt-3 font-serif text-2xl leading-tight">{title}</h3>
                      <p className="mt-4 text-sm text-muted-foreground">{read} <span aria-hidden="true">·</span> Illustrative guide topic</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4"><ShieldCheck className="mr-1 h-3.5 w-3.5" /> Our approach</Badge>
              <h2 className="font-serif text-3xl leading-tight md:text-4xl">Better information. More confident choices.</h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">We organise product facts consistently and label paid placements clearly. You decide what works for you.</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">All products and offers shown here are fictional illustrations. Check current fees, eligibility and terms directly with each bank.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Discover", "Find cards and sample offers in one place."],
                ["Compare", "Review costs and benefits using consistent facts."],
                ["Choose", "Explore the details and decide what fits."],
              ].map(([step, description], index) => (
                <Card key={step} className="border-border shadow-none">
                  <CardContent className="p-5">
                    <span className="text-sm font-semibold text-muted-foreground">0{index + 1}</span>
                    <h3 className="mt-4 font-serif text-2xl">{step}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
            <span>Product facts presented in a consistent format.</span>
            <span>Sponsored placements are labelled at the point of display.</span>
            <span>Matching reflects product facts and your answers only.</span>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-5 pb-12 md:px-8">
          <Card className="border-border bg-muted shadow-none">
            <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div><p className="text-sm font-semibold">A clear next step</p><h2 className="mt-1 font-serif text-2xl">Compare the details before you decide.</h2></div>
              <Button className="min-h-11" onClick={() => scrollToId("compare")}>Compare sample cards <ArrowRight /></Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </MoneySensePage>
  );
}
