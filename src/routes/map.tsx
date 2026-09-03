import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { MAP_SPOTS } from "@/lib/viewgo-data";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Carte des lieux les plus vus — ViewGo" },
      {
        name: "description",
        content: "Explore la carte ViewGo et repère les lieux et expériences les plus populaires.",
      },
      { property: "og:title", content: "Carte des lieux les plus vus — ViewGo" },
      {
        property: "og:description",
        content: "Les spots les plus visités par les viewers, sur une carte interactive.",
      },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const [active, setActive] = useState(MAP_SPOTS[0]);

  return (
    <AppShell title="Carte">
      <div className="py-3">
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border bg-surface-gradient">
          <div className="absolute inset-0 bg-glow opacity-60" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full opacity-20">
            {Array.from({ length: 11 }).map((_, i) => (
              <g key={i} stroke="currentColor" strokeWidth="0.2" className="text-accent">
                <line x1={i * 10} y1="0" x2={i * 10} y2="100" />
                <line x1="0" y1={i * 10} x2="100" y2={i * 10} />
              </g>
            ))}
          </svg>
          {MAP_SPOTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s)}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              aria-label={s.name}
            >
              <span
                className={`block rounded-full bg-spiral ${
                  active.id === s.id ? "size-6 shadow-glow" : "size-3.5 opacity-80"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-3xl bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Spot sélectionné</p>
          <h2 className="mt-1 text-lg font-semibold">{active.name}</h2>
          <p className="text-sm text-muted-foreground">
            {active.theme} · {active.views.toLocaleString("fr-FR")} views
          </p>
        </div>

        <h3 className="mt-6 text-sm font-semibold text-muted-foreground">Top emplacements</h3>
        <div className="mt-2 space-y-2">
          {[...MAP_SPOTS]
            .sort((a, b) => b.views - a.views)
            .map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(s)}
                className="flex w-full items-center gap-3 rounded-2xl bg-surface px-4 py-3 text-left"
              >
                <span className="text-sm font-bold text-primary">#{i + 1}</span>
                <span className="flex-1 text-sm">{s.name}</span>
                <span className="text-xs text-muted-foreground">
                  {s.views.toLocaleString("fr-FR")}
                </span>
              </button>
            ))}
        </div>
      </div>
    </AppShell>
  );
}
