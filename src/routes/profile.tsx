import { createFileRoute } from "@tanstack/react-router";
import { Camera } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { OrbIcon } from "@/components/icons";
import { useViewGo } from "@/lib/viewgo-store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Mon profil viewer — ViewGo" },
      {
        name: "description",
        content: "Tes World Orbs, tes vues et tes statistiques de réussite sur ViewGo.",
      },
      { property: "og:title", content: "Mon profil viewer — ViewGo" },
      { property: "og:description", content: "Suis tes stats de viewer et tes World Orbs." },
    ],
  }),
  component: ProfilePage,
});

const CHART = [
  { m: "Avr", views: 120 },
  { m: "Mai", views: 260 },
  { m: "Juin", views: 190 },
  { m: "Juil", views: 430 },
  { m: "Août", views: 610 },
  { m: "Sept", views: 780 },
];

function ProfilePage() {
  const { profile, setAvatar, places, signOut } = useViewGo();
  const mine = places.filter((p) => p.author === profile?.handle);

  return (
    <AppShell title="Profil">
      <div className="space-y-5 py-3">
        <div className="flex items-center gap-4">
          <label className="relative size-20 cursor-pointer overflow-hidden rounded-full bg-spiral p-[3px] shadow-glow">
            <span className="flex size-full items-center justify-center overflow-hidden rounded-full bg-surface text-2xl font-bold">
              {profile?.avatar ? (
                <img src={profile.avatar} alt="" className="size-full object-cover" />
              ) : (
                (profile?.name?.[0]?.toUpperCase() ?? "V")
              )}
            </span>
            <span className="absolute bottom-0 right-0 rounded-full bg-background p-1.5">
              <Camera className="size-3.5" />
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => setAvatar(String(reader.result));
                reader.readAsDataURL(file);
              }}
            />
          </label>
          <div>
            <h2 className="text-xl font-semibold">{profile?.name}</h2>
            <p className="text-sm text-muted-foreground">@{profile?.handle}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-surface p-3 text-center">
            <OrbIcon className="mx-auto size-6 text-primary" />
            <p className="mt-1 text-lg font-bold">{profile?.orbs ?? 0}</p>
            <p className="text-[10px] text-muted-foreground">World Orbs</p>
          </div>
          <div className="rounded-2xl bg-surface p-3 text-center">
            <p className="text-lg font-bold">
              {CHART.reduce((a, b) => a + b.views, 0).toLocaleString("fr-FR")}
            </p>
            <p className="text-[10px] text-muted-foreground">Views totales</p>
          </div>
          <div className="rounded-2xl bg-surface p-3 text-center">
            <p className="text-lg font-bold">{mine.length}</p>
            <p className="text-[10px] text-muted-foreground">Lieux postés</p>
          </div>
        </div>

        <div className="rounded-3xl bg-surface-gradient p-4 shadow-card">
          <h3 className="text-sm font-semibold">Réussite de tes expériences</h3>
          <p className="text-xs text-muted-foreground">
            Nombre de personnes ayant testé tes expériences
          </p>
          <div className="mt-3 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis
                  dataKey="m"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--popover-foreground)",
                  }}
                />
                <Bar dataKey="views" radius={[8, 8, 0, 0]} fill="var(--primary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <button
          onClick={signOut}
          className="w-full rounded-2xl border border-border py-3 text-sm text-muted-foreground"
        >
          Se déconnecter
        </button>
      </div>
    </AppShell>
  );
}
