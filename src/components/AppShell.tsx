import { Link, useNavigate } from "@tanstack/react-router";
import { Home, Globe2, Plus, Search, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useViewGo } from "@/lib/viewgo-store";
import { OrbIcon, SpiralIcon, StarBubbleIcon } from "./icons";
import { Onboarding } from "./Onboarding";

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const { places } = useViewGo();
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const results = term
    ? places.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.theme.toLowerCase().includes(term) ||
          p.city.toLowerCase().includes(term) ||
          p.author.toLowerCase().includes(term),
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl p-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-surface px-4 py-3 border border-border">
          <Search className="size-4 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un lieu ou un viewer…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button onClick={onClose} aria-label="Fermer" className="p-2 text-muted-foreground">
          <X className="size-5" />
        </button>
      </div>
      <div className="mt-4 space-y-2 overflow-y-auto max-h-[75vh]">
        {results.map((p) => (
          <div key={p.id} className="flex gap-3 rounded-2xl bg-surface p-3">
            <img src={p.image} alt="" loading="lazy" className="size-14 rounded-xl object-cover" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{p.title}</p>
              <p className="text-xs text-muted-foreground">
                @{p.author} · {p.city} · {p.theme}
              </p>
            </div>
          </div>
        ))}
        {term && results.length === 0 && (
          <p className="pt-8 text-center text-sm text-muted-foreground">Aucun résultat</p>
        )}
      </div>
    </div>
  );
}

const NAV = [
  { to: "/", label: "Accueil", icon: (c: string) => <Home className={c} /> },
  { to: "/map", label: "Carte", icon: (c: string) => <Globe2 className={c} /> },
  { to: "/post", label: "Poster", icon: (c: string) => <Plus className={c} strokeWidth={3.2} /> },
  { to: "/messages", label: "Échanges", icon: (c: string) => <StarBubbleIcon className={c} /> },
  { to: "/discover", label: "Pour toi", icon: (c: string) => <SpiralIcon className={c} /> },
] as const;

export function AppShell({ title, children }: { title?: string; children: ReactNode }) {
  const { profile, ready } = useViewGo();
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-glow" />

      <header className="sticky top-0 z-30 flex items-center gap-3 bg-background/80 px-4 py-3 backdrop-blur-md">
        <button
          onClick={() => navigate({ to: "/profile" })}
          aria-label="Mon profil"
          className="size-10 shrink-0 overflow-hidden rounded-full bg-spiral p-[2px] shadow-glow"
        >
          <span className="flex size-full items-center justify-center overflow-hidden rounded-full bg-surface text-sm font-bold">
            {profile?.avatar ? (
              <img src={profile.avatar} alt="" className="size-full object-cover" />
            ) : (
              (profile?.name?.[0]?.toUpperCase() ?? "V")
            )}
          </span>
        </button>
        <button
          onClick={() => setSearch(true)}
          aria-label="Rechercher"
          className="rounded-full bg-surface p-2.5 text-muted-foreground"
        >
          <Search className="size-4" />
        </button>
        <h1 className="flex-1 truncate text-center text-base font-semibold tracking-tight">
          {title ?? "ViewGo"}
        </h1>
        <div className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold">
          <OrbIcon className="size-5 text-primary" />
          {profile?.orbs ?? 0}
        </div>
      </header>

      <main className="relative px-4">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto grid max-w-lg grid-cols-5">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-label={item.label}
              className="flex flex-col items-center gap-1 py-3 text-muted-foreground data-[status=active]:text-primary"
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.icon("size-6")}
              <span className="text-[10px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {search && <SearchOverlay onClose={() => setSearch(false)} />}
      {ready && !profile && <Onboarding />}
    </div>
  );
}
