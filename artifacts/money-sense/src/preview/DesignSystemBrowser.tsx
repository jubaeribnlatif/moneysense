import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Input } from '../components/ui/input';
import { logoUrl } from './brand';
import { ScrollArea } from '../components/ui/scroll-area';
import { ArrowUpRight, BookOpen, CreditCard, FileText, Layers3, LayoutGrid, Moon, Palette, ShieldCheck, Sun, Type } from 'lucide-react';
import {
  ALL_ENTRIES,
  DESIGN_SYSTEM,
  NAV_GROUPS,
  OVERVIEW_ENTRY,
  type NavGroup,
} from './registry';

function readHashId(): string {
  const id = new URLSearchParams(window.location.hash.slice(1)).get('page');
  if (!id) {
    return OVERVIEW_ENTRY.id;
  }
  return ALL_ENTRIES.some((entry) => entry.id === id)
    ? id
    : OVERVIEW_ENTRY.id;
}

function useSelectedId(): [string, (id: string) => void] {
  const [selected, setSelected] = useState(readHashId);

  useEffect(() => {
    const onHashChange = () => setSelected(readHashId());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const select = (id: string) => {
    setSelected(id);
    window.location.hash = new URLSearchParams({ page: id }).toString();
  };

  return [selected, select];
}

function NavigationItems({
  showOverview,
  groups,
  activeId,
  query,
  select,
}: {
  showOverview: boolean;
  groups: NavGroup[];
  activeId: string;
  query: string;
  select: (id: string) => void;
}) {
  const icons: Record<string, typeof BookOpen> = {
    Brand: BookOpen, Colors: Palette, Fonts: Type, Layout: LayoutGrid,
    Actions: Layers3, 'Forms & inputs': Layers3, Overlays: Layers3,
    'Menus & navigation': LayoutGrid, 'Data display': CreditCard,
    Feedback: ShieldCheck, Structure: LayoutGrid, Content: FileText,
  };
  return (
    <nav aria-label="Design system navigation" className="space-y-5 py-2">
      {showOverview ? (
        <button
          type="button"
          onClick={() => select(OVERVIEW_ENTRY.id)}
          aria-current={OVERVIEW_ENTRY.id === activeId}
          className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-white/75 transition-all hover:bg-white/10 hover:text-white aria-[current=true]:bg-accent aria-[current=true]:font-semibold aria-[current=true]:text-accent-foreground"
        >
          <LayoutGrid size={16} />
          {OVERVIEW_ENTRY.name}
        </button>
      ) : null}

      {groups.map((group) => (
        <div key={group.name}>
          <p className="flex items-center gap-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
            {(() => { const Icon = icons[group.name] ?? Layers3; return <Icon size={13} />; })()}
            {group.name}
          </p>
          <div className="mt-2 space-y-1">
            {group.entries.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => select(entry.id)}
                aria-current={entry.id === activeId}
                className="flex min-h-10 w-full items-center justify-between rounded-xl px-3 text-left text-sm text-white/75 transition-all hover:translate-x-0.5 hover:bg-white/10 hover:text-white aria-[current=true]:bg-accent aria-[current=true]:font-semibold aria-[current=true]:text-accent-foreground"
              >
                {entry.name}
                {entry.id === activeId && <ArrowUpRight size={14} />}
              </button>
            ))}
          </div>
        </div>
      ))}

      {!showOverview && groups.length === 0 ? (
        <p className="px-2 py-4 text-sm text-muted-foreground">
          No sections match “{query}”.
        </p>
      ) : null}
    </nav>
  );
}

export function DesignSystemBrowser() {
  const [dark, setDark] = useState(() => new URLSearchParams(window.location.search).get('theme') === 'dark');
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  const [selectedId, select] = useSelectedId();
  const [query, setQuery] = useState('');
  const mobileNav = useRef<HTMLDetailsElement>(null);
  const mobileNavSummary = useRef<HTMLElement>(null);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredGroups = useMemo(
    () =>
      NAV_GROUPS.map((group) => ({
        ...group,
        entries: group.name.toLowerCase().includes(normalizedQuery)
          ? group.entries
          : group.entries.filter((entry) =>
              `${entry.name} ${entry.description}`
                .toLowerCase()
                .includes(normalizedQuery),
            ),
      })).filter((group) => group.entries.length > 0),
    [normalizedQuery],
  );

  const active =
    ALL_ENTRIES.find((entry) => entry.id === selectedId) ?? OVERVIEW_ENTRY;
  const activeGroup = NAV_GROUPS.find((group) =>
    group.entries.some((entry) => entry.id === active.id),
  );
  const ActivePage = active.Page;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [active.id]);

  const showOverview = `${OVERVIEW_ENTRY.name} ${OVERVIEW_ENTRY.description}`
    .toLowerCase()
    .includes(normalizedQuery);
  const selectPage = (id: string) => {
    select(id);
    if (mobileNav.current?.open) {
      mobileNav.current.removeAttribute('open');
      mobileNavSummary.current?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground md:grid md:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="border-b border-white/10 bg-[#0b3024] md:sticky md:top-0 md:flex md:h-screen md:flex-col md:border-b-0 md:border-r">
        <div className="border-b border-white/10 px-5 py-5">
          <div className="mb-3 rounded-md bg-white p-2"><img src={logoUrl} alt="The Daily Star Money Sense" className="h-16 w-full object-contain" /></div>
          <p className="text-sm font-semibold text-white">{DESIGN_SYSTEM.title}</p>
          <p className="mt-1 text-xs text-white/60">A field guide to better money choices</p>
        </div>
        <div className="p-4 pb-2 [&_input]:border-white/20 [&_input]:bg-white/10 [&_input]:text-white [&_input]:placeholder:text-white/45 [&_input]:focus-visible:ring-accent">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search design system"
            placeholder="Search design system…"
          />
        </div>
        <ScrollArea className="hidden min-h-0 flex-1 px-4 pb-4 md:block">
          <NavigationItems
            showOverview={showOverview}
            groups={filteredGroups}
            activeId={active.id}
            query={query}
            select={selectPage}
          />
        </ScrollArea>
        <details ref={mobileNav} className="border-t border-white/10 px-4 py-3 text-white md:hidden">
          <summary
            ref={mobileNavSummary}
            className="min-h-11 cursor-pointer py-3 text-sm font-medium"
          >
            Browse sections:{' '}
            <span className="text-muted-foreground">{active.name}</span>
          </summary>
          <ScrollArea className="mt-3 h-64 pb-2">
            <NavigationItems
              showOverview={showOverview}
              groups={filteredGroups}
              activeId={active.id}
              query={query}
              select={selectPage}
            />
          </ScrollArea>
        </details>
      </aside>

      <main className="min-w-0">
        <div className="sticky top-0 z-20 flex min-h-14 items-center justify-between border-b bg-background/90 px-6 backdrop-blur-xl sm:px-10 lg:px-14">
          <p className="text-xs font-medium text-muted-foreground"><span className="text-foreground">Money Sense</span><span className="px-2 text-border">/</span>{activeGroup?.name ?? 'Foundations'}<span className="px-2 text-border">/</span>{active.name}</p>
          <button type="button" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} aria-pressed={dark} onClick={() => setDark(value => !value)} className="inline-flex min-h-10 items-center gap-2 rounded-full border px-3 text-xs font-medium transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {dark ? <Sun size={15}/> : <Moon size={15}/>}<span>{dark ? 'Light' : 'Dark'} mode</span>
          </button>
        </div>
        <div className="min-w-0 px-6 py-8 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-5xl">
          <header className="border-b pb-8">
            {active.id === OVERVIEW_ENTRY.id ? (
              <>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {DESIGN_SYSTEM.title}
                </h1>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  {DESIGN_SYSTEM.description}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {activeGroup?.name}
                </p>
                <h1 className="mt-2 text-2xl font-semibold">{active.name}</h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  {active.description}
                </p>
              </>
            )}
          </header>

          <div className="pt-8">
            <Suspense
              fallback={
                <div
                  role="status"
                  className="rounded-xl border bg-card p-6 text-sm text-muted-foreground"
                >
                  Loading preview…
                </div>
              }
            >
              <ActivePage />
            </Suspense>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
