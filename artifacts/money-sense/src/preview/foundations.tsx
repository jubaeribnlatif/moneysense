import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Guidelines } from './parts';

const CORE_SWATCHES = [
  { name: 'Primary', className: 'bg-primary' },
  { name: 'Secondary', className: 'bg-secondary' },
  { name: 'Accent', className: 'bg-accent' },
] as const;

const SUPPORTING_SWATCHES = [
  { name: 'Background', className: 'border bg-background' },
  { name: 'Foreground', className: 'bg-foreground' },
  { name: 'Muted', className: 'bg-muted' },
  { name: 'Destructive', className: 'bg-destructive' },
  { name: 'Border', className: 'bg-border' },
] as const;

const TYPE_SCALE = [
  { label: 'Display', className: 'font-serif text-5xl' },
  { label: 'Heading', className: 'font-serif text-3xl' },
  { label: 'Body', className: 'text-base' },
  { label: 'Label', className: 'text-sm font-medium' },
  { label: 'Caption', className: 'text-sm text-muted-foreground' },
] as const;

const SPACING_SCALE = [
  { label: '4', className: 'w-4' },
  { label: '8', className: 'w-8' },
  { label: '12', className: 'w-12' },
  { label: '16', className: 'w-16' },
  { label: '24', className: 'w-24' },
] as const;

function Swatch({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  return (
    <div className="space-y-2">
      <div className={`h-16 rounded-lg ${className}`} />
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
}

export function OverviewPage() {
  return (
    <div className="space-y-4">
      <section className="relative isolate overflow-hidden rounded-2xl p-6 text-white shadow-xl sm:p-10" style={{ background: 'radial-gradient(ellipse at 84% 20%, rgba(25,144,109,.78), transparent 36%), linear-gradient(118deg, #101713 0%, #102c23 55%, #164b39 100%)' }}>
        <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-20 hidden h-80 w-80 rounded-full border border-white/15 sm:right-3 sm:top-4 sm:block">
          <div className="absolute inset-8 rounded-full border border-white/15" />
          <div className="absolute inset-16 rounded-full border border-white/15" />
          <div className="absolute bottom-9 left-4 right-4 h-24 -rotate-12 rounded-xl border border-white/25 bg-white/5 backdrop-blur-sm" />
          <div className="absolute bottom-16 left-10 right-10 h-1/2 rounded-xl border border-white/30 bg-gradient-to-br from-white/15 to-transparent" />
          <span className="absolute right-20 top-20 h-3 w-3 rounded-full bg-accent shadow-[0_0_32px_rgba(141,214,181,.9)]" />
        </div>
        <div className="relative max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65"><span>The Daily Star</span><span className="h-1 w-1 rounded-full bg-accent"/><span>Money Sense</span><span className="rounded-full border border-white/20 px-2 py-1 tracking-[0.12em]">Design system / 01</span></div>
          <h2 className="mt-8 max-w-xl font-serif text-5xl leading-[.94] sm:text-7xl">Make your money<br/><span className="text-[#94d4b2]">make sense.</span></h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">Editorial credibility meets useful technology. A calmer way to discover financial products and everyday benefits.</p>
          <div className="mt-7 flex flex-wrap gap-2"><Badge className="border border-white/15 bg-white/10 text-white hover:bg-white/10">Open to everyone</Badge><Badge className="border border-white/15 bg-white/10 text-white hover:bg-white/10">Mobile first</Badge><Badge className="border border-white/15 bg-white/10 text-white hover:bg-white/10">Audience before advertising</Badge></div>
        </div>
      </section>
      <Guidelines items={[{kind:'do',text:'Balance tech and mass-market design: professional, accessible and useful without being boring. — User brief'},{kind:'dont',text:'Give every homepage feature equal prominence or make the experience feel like an advertising page. — User brief'}]}/>
      <section className="rounded-xl border bg-card p-5 text-card-foreground">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Core palette
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {CORE_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border bg-card p-5 text-card-foreground">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Typography
          </h2>
          <div className="mt-4 space-y-3">
            {TYPE_SCALE.map((entry) => (
              <p key={entry.label} className={entry.className}>
                {entry.label}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-xl border bg-card p-5 text-card-foreground">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            In use
          </h2>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Find an everyday benefit</CardTitle>
              <CardDescription>
                A form specimen using fictional information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="overview-name">What are you looking for?</Label>
                <Input id="overview-name" placeholder="Dining, travel, a new card…" />
              </div>
              <div className="flex items-center gap-2">
                <Switch defaultChecked id="overview-notify" />
                <Label htmlFor="overview-notify">Show benefits without an annual fee</Label>
                <Badge className="ml-auto">Demo</Badge>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button asChild><a href="#page=brand-patterns">Explore patterns</a></Button>
              <Button asChild variant="outline"><a href="#page=brand-trust">Our approach</a></Button>
            </CardFooter>
          </Card>
        </section>
      </div>

      <section className="space-y-4 rounded-xl border bg-card p-5 text-card-foreground">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Components
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>
    </div>
  );
}

export function ColorsPage() {
  return (
    <div className="space-y-8 rounded-xl border bg-card p-6 text-card-foreground">
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold">Brand colors</h2>
          <p className="text-sm text-muted-foreground">
            The core roles used for emphasis, supporting actions, and accents.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {CORE_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <section className="space-y-4 border-t pt-6">
        <div>
          <h2 className="font-semibold">One signature green. Multiple useful tones.</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            The logo green anchors the identity. Use a tonal family for hover, selected, and quiet surface states—not several unrelated brand accents.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { name: 'Identity · logo sampled', hex: '#19906D', fg: '#0B3024' },
            { name: 'Interaction · deeper', hex: '#117255', fg: '#FFFFFF' },
            { name: 'Tint · soft surface', hex: '#E8F1EC', fg: '#151916' },
            { name: 'Canvas · barely tinted', hex: '#F5FBF8', fg: '#151916' },
          ].map((tone) => (
            <div key={tone.name} className="overflow-hidden rounded-xl border">
              <div className="flex h-24 items-end p-3 font-mono text-xs" style={{ backgroundColor: tone.hex, color: tone.fg }}>{tone.hex}</div>
              <p className="p-3 text-xs font-medium">{tone.name}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-5 text-white" style={{ background: 'linear-gradient(110deg,#101713 0%,#164b39 68%,#19906d 100%)' }}>
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/65">Ambient gradient / editorial moment only</p>
          <p className="mt-3 font-serif text-3xl">Adds depth without competing with the brand mark.</p>
          <p className="mt-2 text-sm text-white/75">Keep decision details, prices, eligibility and paid labels on solid, high-contrast surfaces.</p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-semibold">Semantic and surface colors</h2>
          <p className="text-sm text-muted-foreground">
            Roles for text, backgrounds, borders, muted content, and danger.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {SUPPORTING_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function FontsPage() {
  return (
    <div className="space-y-8 rounded-xl border bg-card p-6 text-card-foreground">
      <section>
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Font family
        </h2>
        <p className="mt-4 text-4xl font-bold">The quick brown fox</p>
        <p className="mt-2 text-sm text-muted-foreground">
          DM Sans — UI and body. Instrument Serif — temporary editorial display substitute for Denton Condensed. Geist Mono — compact financial data.
        </p>
        <p className="mt-3 rounded-lg bg-secondary p-4 text-sm">The supplied Denton Test OTFs are not included as production fonts. The intended brand heading remains licensed Denton Condensed; this preview uses an explicitly documented open-source substitute pending suitable font files.</p>
        <p className="mt-5 font-serif text-4xl">Make your money make sense.</p>
        <p className="mt-4 font-mono text-lg">৳ 12,500.00 · 14.50% · 2026</p>
      </section>

      <section className="space-y-4 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Type scale
        </h2>
        {TYPE_SCALE.map((entry) => (
          <div key={entry.label} className="grid gap-2 sm:grid-cols-[88px_1fr]">
            <span className="pt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {entry.label}
            </span>
            <p className={entry.className}>Build products people understand.</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export function LayoutPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-xl border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Spacing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The spacing scale, derived from the base spacing token.
        </p>
        <div className="mt-6 space-y-4">
          {SPACING_SCALE.map((space) => (
            <div key={space.label} className="flex items-center gap-4">
              <span className="w-8 text-xs text-muted-foreground">
                {space.label}
              </span>
              <div className={`h-3 rounded-full bg-primary ${space.className}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Radius</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Corner treatments derive from the base radius token.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[
            { label: 'Small', className: 'rounded-sm' },
            { label: 'Medium', className: 'rounded-md' },
            { label: 'Large', className: 'rounded-lg' },
            { label: 'Extra large', className: 'rounded-xl' },
          ].map((radius) => (
            <div
              key={radius.label}
              className={`flex h-24 items-end border bg-muted p-3 ${radius.className}`}
            >
              <span className="text-xs font-medium">{radius.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
