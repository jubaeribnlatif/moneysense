import type { ReactNode } from "react";
import { useState } from "react";
import { ArrowRight, Columns2, Compass, Search, Tag } from "lucide-react";
import { Badge } from "@workspace/money-sense/components/ui/badge";
import { Button } from "@workspace/money-sense/components/ui/button";
import { Toggle } from "@workspace/money-sense/components/ui/toggle";

export const LOGO_IMAGE = "/__mockup/images/money-sense-logo-reference.png";
export const HERO_IMAGE = "/__mockup/images/money-sense-hero.jpg";
export const CARD_IMAGE = "/__mockup/images/sample-card.jpg";

export type DemoCard = {
  id: string;
  name: string;
  bank: string;
  bankId: string;
  network: string;
  category: string;
  fee: string;
  feeAmount: number;
  eligibility: string;
  rewards: string;
  rewardRate: string;
  benefits: string[];
  bestFor: string[];
  travel: string;
  lifestyle: string;
  goodToKnow: string;
  matchTags: string[];
  color: "deep" | "lime" | "silver" | "green";
  image: string;
  verifiedOn: string;
};

export const demoCards: DemoCard[] = [
  {
    id: "voyager-plus",
    name: "Voyager Plus",
    bank: "Sample Bank",
    bankId: "sample-bank",
    network: "Visa Signature",
    category: "Travel",
    fee: "Tk 5,000",
    feeAmount: 5000,
    eligibility: "Age 21–60 · Monthly income from Tk 75,000",
    rewards: "1 air mile for every Tk 100 spent",
    rewardRate: "1 mile / Tk 100",
    benefits: [
      "6 complimentary lounge visits each year",
      "Travel insurance up to Tk 50 lakh",
      "Up to 50 days interest-free on purchases",
    ],
    bestFor: ["Travel", "Airport lounges", "International spend"],
    travel: "Six lounge visits yearly; travel insurance applies to eligible bookings.",
    lifestyle: "Dining and hotel privileges at selected partner locations.",
    goodToKnow: "Annual fee is charged after the first year. Check the bank’s latest terms before applying.",
    matchTags: ["travel", "lounge", "international", "rewards"],
    color: "deep",
    image: CARD_IMAGE,
    verifiedOn: "Nov 2026",
  },
  {
    id: "dine-shop",
    name: "Dine & Shop",
    bank: "Demo Bank",
    bankId: "demo-bank",
    network: "Mastercard Titanium",
    category: "Dining",
    fee: "Tk 2,500",
    feeAmount: 2500,
    eligibility: "Age 21–60 · Monthly income from Tk 40,000",
    rewards: "Up to 20% off at partner restaurants",
    rewardRate: "Up to 20% off",
    benefits: [
      "Dining discounts at 80+ partner venues",
      "Monthly shopping offers with visible caps",
      "Instalment plans on selected purchases",
    ],
    bestFor: ["Dining", "Shopping", "Local offers"],
    travel: "No complimentary lounge visits included.",
    lifestyle: "Up to 20% off at partner restaurants, capped at Tk 1,500 per bill.",
    goodToKnow: "Discounts vary by venue and day. The Tk 1,500 cap applies to each eligible bill.",
    matchTags: ["dining", "shopping", "discounts", "local"],
    color: "green",
    image: CARD_IMAGE,
    verifiedOn: "Nov 2026",
  },
  {
    id: "everyday-cashback",
    name: "Everyday Cashback",
    bank: "Example Bank",
    bankId: "example-bank",
    network: "Visa Platinum",
    category: "Everyday",
    fee: "Tk 3,000 · first year waived",
    feeAmount: 3000,
    eligibility: "Age 21–60 · Monthly income from Tk 50,000",
    rewards: "1.5% cashback on groceries, fuel and utility bills",
    rewardRate: "1.5% cashback",
    benefits: [
      "Cashback on three everyday categories",
      "Up to 50 days interest-free on purchases",
      "Annual fee waived after Tk 3 lakh annual spend",
    ],
    bestFor: ["Everyday spending", "Cashback", "Bills"],
    travel: "Foreign-currency spend fee is 3%.",
    lifestyle: "Cashback applies to groceries, fuel and utility bills, up to Tk 1,000 monthly.",
    goodToKnow: "Cashback is capped at Tk 1,000 per month. Utility payments through third parties may not qualify.",
    matchTags: ["everyday", "cashback", "groceries", "fuel", "bills"],
    color: "silver",
    image: CARD_IMAGE,
    verifiedOn: "Nov 2026",
  },
  {
    id: "city-flex",
    name: "City Flex",
    bank: "Northline Bank",
    bankId: "northline-bank",
    network: "Visa Classic",
    category: "Everyday",
    fee: "Tk 1,500",
    feeAmount: 1500,
    eligibility: "Age 21–60 · Monthly income from Tk 35,000",
    rewards: "Up to 6 months instalment plans at selected merchants",
    rewardRate: "Flexible instalments",
    benefits: [
      "Instalments at 100+ participating merchants",
      "Online purchase protection",
      "No foreign-currency rewards or lounge access",
    ],
    bestFor: ["Shopping", "Instalments", "Lower annual fee"],
    travel: "No travel privileges included.",
    lifestyle: "Instalment plans and occasional local retail offers.",
    goodToKnow: "Instalment plans may include a processing fee. Confirm the total cost before choosing a plan.",
    matchTags: ["shopping", "instalments", "lower-fee", "local"],
    color: "lime",
    image: CARD_IMAGE,
    verifiedOn: "Nov 2026",
  },
];

export type DemoOffer = {
  id: string;
  bank: string;
  bankId: string;
  cardId: string;
  merchant: string;
  title: string;
  value: string;
  category: string;
  location: string;
  condition: string;
  validUntil: string;
  daysLeft: number;
  sponsored: boolean;
};

export const demoOffers: DemoOffer[] = [
  {
    id: "demo-dining",
    bank: "Demo Bank",
    bankId: "demo-bank",
    cardId: "dine-shop",
    merchant: "Dinner out, with a limit you can see",
    title: "Up to 20% off",
    value: "20%",
    category: "Dining",
    location: "Dhaka",
    condition: "Up to Tk 1,500 off per bill with Dine & Shop.",
    validUntil: "30 Nov 2026",
    daysLeft: 9,
    sponsored: true,
  },
  {
    id: "sample-lounge",
    bank: "Sample Bank",
    bankId: "sample-bank",
    cardId: "voyager-plus",
    merchant: "Make a quieter start to your trip",
    title: "Complimentary lounge access",
    value: "6 visits",
    category: "Travel",
    location: "Selected airports",
    condition: "Six visits each year with Voyager Plus.",
    validUntil: "31 Dec 2026",
    daysLeft: 40,
    sponsored: false,
  },
  {
    id: "example-grocery",
    bank: "Example Bank",
    bankId: "example-bank",
    cardId: "everyday-cashback",
    merchant: "A little back on the weekly shop",
    title: "1.5% cashback",
    value: "1.5%",
    category: "Everyday",
    location: "Participating grocery stores",
    condition: "Monthly cashback cap of Tk 1,000.",
    validUntil: "31 Dec 2026",
    daysLeft: 40,
    sponsored: false,
  },
  {
    id: "northline-installments",
    bank: "Northline Bank",
    bankId: "northline-bank",
    cardId: "city-flex",
    merchant: "Plan a larger purchase, clearly",
    title: "Up to 6 months",
    value: "0%*",
    category: "Shopping",
    location: "Selected retailers",
    condition: "*Processing fees may apply; confirm the total with the bank.",
    validUntil: "15 Dec 2026",
    daysLeft: 24,
    sponsored: false,
  },
];

export const cardHref = (id: string) =>
  `#/MoneySenseCardProfile?card=${encodeURIComponent(id)}`;

export const bankHref = (id: string) =>
  `#/MoneySenseBankProfile?bank=${encodeURIComponent(id)}`;

export function getCardFromHash(): DemoCard {
  const params = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const id = params.get("card");
  return demoCards.find((card) => card.id === id) ?? demoCards[0];
}

export function getBankFromHash() {
  const params = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const id = params.get("bank") ?? "demo-bank";
  const bank = demoCards.find((card) => card.bankId === id) ?? demoCards[0];
  return {
    id: bank.bankId,
    name: bank.bank,
    initial: bank.bank
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2),
    cards: demoCards.filter((card) => card.bankId === id),
    offers: demoOffers.filter((offer) => offer.bankId === id),
  };
}

export function SponsoredLabel({ children = "Sponsored" }: { children?: ReactNode }) {
  return (
    <Badge variant="outline" className="inline-flex items-center gap-1.5">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-foreground" />
      {children}
    </Badge>
  );
}

export function VerifiedLabel({ children = "Verified · Nov 2026" }: { children?: ReactNode }) {
  return (
    <Badge variant="secondary" className="inline-flex items-center gap-1.5">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </Badge>
  );
}

function scrollToSection(id: string) {
  if (window.location.hash.startsWith("#/MoneySenseHome")) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  window.location.hash = "/MoneySenseHome";
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 140);
}

export function MoneySenseHeader({
  active,
}: {
  active?: "Discover" | "Offers" | "Compare" | "Money Guides";
}) {
  const linkClass = (label: string) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-muted ${
      active === label ? "bg-muted text-accent" : "text-muted-foreground hover:text-foreground"
    }`;
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-6 px-5 md:px-8">
        <a href="#/MoneySenseHome" aria-label="Money Sense home" className="shrink-0">
          <img src={LOGO_IMAGE} alt="The Daily Star Money Sense" className="h-10 w-auto object-contain" />
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          <a href="#/MoneySenseHome" className={linkClass("Discover")}>Discover</a>
          <button type="button" onClick={() => scrollToSection("offers")} className={linkClass("Offers")}>Offers</button>
          <button type="button" onClick={() => scrollToSection("compare")} className={linkClass("Compare")}>Compare</button>
          <button type="button" onClick={() => scrollToSection("guides")} className={linkClass("Money Guides")}>Money Guides</button>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" size="icon" className="min-h-11 min-w-11" aria-label="Search Money Sense" onClick={() => scrollToSection("discover")}>
            <Search className="h-4 w-4" />
          </Button>
          <Button onClick={() => scrollToSection("finder")} className="hidden min-h-11 rounded-full px-5 sm:inline-flex">
            Find my card <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function MobileNavigation({
  active,
}: {
  active: "Discover" | "Offers" | "Compare" | "Money Guides";
}) {
  const [selectedItem, setSelectedItem] = useState<string>(active);
  const items = [
    { label: "Discover" as const, icon: Compass, target: "top" },
    { label: "Offers" as const, icon: Tag, target: "offers" },
    { label: "Compare" as const, icon: Columns2, target: "compare" },
    { label: "Find a card" as const, icon: Search, target: "finder" },
  ];

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-sm backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center justify-between gap-1">
        {items.map(({ label, icon: Icon, target }) => {
          const selected = selectedItem === label;
          const onSelect = () => {
            setSelectedItem(label);
            if (target === "top") {
              if (!window.location.hash.startsWith("#/MoneySenseHome")) window.location.hash = "/MoneySenseHome";
              else window.scrollTo({ top: 0, behavior: "smooth" });
              return;
            }
            scrollToSection(target);
          };
          return (
            <Toggle
              key={label}
              pressed={selected}
              onPressedChange={onSelect}
              aria-label={label}
              className="min-h-12 flex-1 flex-col gap-1 rounded-lg px-1 py-1 text-[11px]"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{label}</span>
            </Toggle>
          );
        })}
      </div>
    </nav>
  );
}

export function MoneySenseFooter() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-10 md:grid-cols-[1fr_auto] md:items-end md:px-8">
        <div className="max-w-xl">
          <img src={LOGO_IMAGE} alt="The Daily Star Money Sense" className="mb-4 h-9 w-auto object-contain" />
          <p className="text-sm leading-6 text-muted-foreground">
            Product information is illustrative in this prototype. Check current fees, eligibility and terms directly with each bank.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#/MoneySenseHome" className="hover:text-foreground">How we work</a>
          <a href="#/MoneySenseBankProfile?bank=demo-bank" className="hover:text-foreground">Participating banks</a>
          <span>© The Daily Star Money Sense · Prototype</span>
        </div>
      </div>
    </footer>
  );
}

export function MoneySensePage({
  children,
  active = "Discover",
}: {
  children: ReactNode;
  active?: "Discover" | "Offers" | "Compare" | "Money Guides";
}) {
  return (
    <div className="min-h-screen bg-background pb-20 text-foreground md:pb-0">
      <MoneySenseHeader active={active} />
      {children}
      <MobileNavigation active={active} />
      <MoneySenseFooter />
    </div>
  );
}
