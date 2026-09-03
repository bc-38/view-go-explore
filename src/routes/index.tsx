import { createFileRoute } from "@tanstack/react-router";
import { Eye, MapPin, Route as RouteIcon } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { OrbIcon } from "@/components/icons";
import { useViewGo } from "@/lib/viewgo-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ViewGo — Découvre les expériences autour de toi" },
      {
        name: "description",
        content:
          "ViewGo réunit les lieux et expériences partagés par les viewers près de chez toi. Poste tes découvertes et gagne des World Orbs.",
      },
      { property: "og:title", content: "ViewGo — Découvre les expériences autour de toi" },
      {
        property: "og:description",
        content: "Des lieux réels, partagés par de vrais viewers. Explore, poste, gagne des orbes.",
      },
    ],
  }),
  component: Feed,
});

function Feed() {
  const { places } = useViewGo();

  return (
    <AppShell title="Autour de toi">
      <div className="space-y-4 py-3">
        {places.map((p) => (
          <article
            key={p.id}
            className="overflow-hidden rounded-3xl bg-surface-gradient shadow-card"
          >
            <div className="relative">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-52 w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur">
                {p.theme}
              </span>
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/70 px-3 py-1 text-xs font-semibold backdrop-blur">
                <OrbIcon className="size-4 text-primary" />
                {p.orbs}
              </span>
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-center gap-2">
                <img
                  src={p.authorAvatar || "https://i.pravatar.cc/120?img=60"}
                  alt=""
                  loading="lazy"
                  className="size-7 rounded-full object-cover"
                />
                <span className="text-xs text-muted-foreground">@{p.author}</span>
              </div>
              <h2 className="text-lg font-semibold leading-tight">{p.title}</h2>
              <p className="text-sm text-muted-foreground">{p.description}</p>
              <p className="flex items-start gap-2 rounded-2xl bg-background/40 p-3 text-xs text-muted-foreground">
                <RouteIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                {p.route}
              </p>
              <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="size-4" /> {p.city} · {p.distanceKm} km
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="size-4" /> {p.views.toLocaleString("fr-FR")} views
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
