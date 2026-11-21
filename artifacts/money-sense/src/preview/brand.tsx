import { useState } from 'react';
import { ArrowUpRight, Check, Search, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Guidelines } from './parts';

export const logoUrl = `${import.meta.env.BASE_URL}money-sense-logo.png`;

export function BrandPage() {
  return <div className="space-y-8">
    <div className="rounded-xl border bg-white p-8"><img src={logoUrl} alt="The Daily Star Money Sense" className="max-h-48 max-w-full object-contain" /></div>
    <h2 className="font-serif text-4xl">Recognisably The Daily Star. Built for everyday decisions.</h2>
    <p className="max-w-2xl text-muted-foreground">The supplied logo is preserved, not redrawn. Its original raster canvas is retained. On dark surfaces, place it on a white plate rather than recolouring the wordmark.</p>
    <Guidelines items={[{kind:'do',text:'Keep black and white dominant; use green and supporting colours as accents. — Project brief'},{kind:'dont',text:'Invent a new identity or replace the supplied logo. — Master design prompt'}]} />
  </div>;
}

export function ResearchPage() {
  const sources = [
    ['The Daily Star','Editorial serif contrast, clear rules, recognisable institutional identity.','Keep the publisher relationship; avoid a dense news-portal grid.','https://www.thedailystar.net/'],
    ['CRED','Confident monochrome, strong scale, product-focused visual storytelling.','Borrow compositional confidence, not exclusivity, elaborate loading, or gated discovery.','https://cred.club/'],
    ['NerdWallet','Task-led categories, immediate discovery, practical decision support.','Make the next action obvious; do not reproduce its green-heavy identity.','https://www.nerdwallet.com/'],
    ['Credit Karma','Everyday use cases, approachable language, contextual financial benefits.','Explain why something fits; do not imply approval odds without verified evidence.','https://www.creditkarma.com/'],
  ];
  return <div className="space-y-6"><p className="max-w-2xl text-lg">A new system, not a redesign of a competitor. Research informed these decisions; the product brief defines the boundaries.</p>
    <div className="grid gap-4 lg:grid-cols-2">{sources.map(([name,observed,decision,url])=><a key={name} href={url} target="_blank" rel="noreferrer" className="rounded-xl border bg-card p-6 hover:bg-secondary"><div className="flex justify-between"><h2 className="text-xl font-semibold">{name}</h2><ArrowUpRight size={20}/></div><p className="mt-4 text-sm text-muted-foreground">{observed}</p><p className="mt-3 text-sm">{decision}</p></a>)}</div>
    <div className="rounded-xl bg-accent p-6 text-accent-foreground"><h2 className="font-serif text-3xl">Premium clarity, without social barriers.</h2><p className="mt-3">For educated, concerned readers and first-time explorers alike. Familiar controls, visible costs, plain explanations, and no financial jargon required to begin.</p></div>
  </div>;
}

export function TrustPage() {
  return <div className="space-y-6">
    <h2 className="font-serif text-4xl">Commercial visibility is not financial suitability.</h2>
    <Guidelines items={[
      {kind:'do',text:'Label sponsored placements visibly and separate them from independent comparison and editorial guidance. — Product trust boundary'},
      {kind:'dont',text:'Let paid status change matching, scores, comparison results, or independent guidance. — Product trust boundary'},
      {kind:'do',text:'Use fictional information while evaluating the experience; replace it with structured bank-supplied, verified information before launch. — User brief'},
      {kind:'dont',text:'Present an ad, a partner, or a demonstration as an independently verified recommendation. — Product trust boundary'},
    ]}/>
    <div className="rounded-xl border p-6"><Badge variant="outline">Sponsored placement</Badge><h3 className="mt-4 text-xl font-semibold">A partner message belongs in its own space.</h3><p className="mt-2 text-muted-foreground">Paid visibility. Not a recommendation or a suitability ranking.</p></div>
    <div className="flex items-start gap-3 rounded-xl bg-secondary p-6"><ShieldCheck className="shrink-0"/><p>“Verified” must describe a specific fact and review date, not imply that a bank product is safe for every reader.</p></div>
  </div>;
}

export function DecisionPatternsPage() {
  const [filter,setFilter]=useState('All');
  const [query,setQuery]=useState('');
  const [selected,setSelected]=useState<string[]>([]);
  const items=[{name:'Everyday Card',type:'Everyday',fee:'৳1,500'},{name:'Journey Card',type:'Travel',fee:'৳3,000'},{name:'Market Card',type:'Everyday',fee:'৳2,000'}];
  const shown=items.filter(i=>(filter==='All'||i.type===filter)&&i.name.toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-6">
    <p className="text-sm text-muted-foreground">Interactive pattern specimen · Fictional products · Not a website screen or financial recommendation</p>
    <div className="rounded-xl bg-accent p-6 text-accent-foreground"><p className="text-xs uppercase tracking-widest">Start with what matters to you</p><h2 className="mt-3 font-serif text-4xl">More value in your everyday.</h2><p className="mt-3">Familiar tasks first. Clear details before a commitment.</p></div>
    <div className="flex items-center gap-3"><Search size={20}/><Input aria-label="Find fictional cards" placeholder="Search fictional cards" value={query} onChange={e=>setQuery(e.target.value)}/></div>
    <div className="flex flex-wrap items-center gap-2"><SlidersHorizontal size={18}/>{['All','Everyday','Travel'].map(f=><Button key={f} variant={filter===f?'default':'outline'} onClick={()=>setFilter(f)} aria-pressed={filter===f}>{f}</Button>)}</div>
    <div className="grid gap-4 lg:grid-cols-3">{shown.map(i=><div className="rounded-xl border bg-card p-5" key={i.name}><div className="mb-5 flex aspect-[1.586] flex-col justify-between rounded-lg bg-primary p-4 text-primary-foreground"><span className="text-xs">FICTIONAL BANK</span><span className="font-serif text-2xl">{i.name}</span></div><Badge variant="secondary">{i.type}</Badge><h3 className="mt-3 font-semibold">{i.name}</h3><p className="my-4 text-sm text-muted-foreground">Annual fee <strong className="text-foreground">{i.fee}</strong></p><Button className="w-full" variant={selected.includes(i.name)?'secondary':'outline'} onClick={()=>setSelected(v=>v.includes(i.name)?v.filter(n=>n!==i.name):[...v,i.name])}>{selected.includes(i.name)?<><Check/>Selected</>:'Add to comparison'}</Button></div>)}</div>
    {!shown.length&&<p role="status" className="rounded-xl border p-8">No cards match. Try another search or category.</p>}
    <p role="status" className="rounded-xl bg-secondary p-4 text-sm">{selected.length} selected{selected.length?`: ${selected.join(', ')}`:'. Select a card to preview the comparison state.'}</p>
  </div>;
}
