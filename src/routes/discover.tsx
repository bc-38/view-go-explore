import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { SpiralIcon } from "@/components/icons";
import { THEMES } from "@/lib/viewgo-data";
import { suggestExperience } from "@/lib/discover.functions";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Ton expérience personnalisée — ViewGo" },
      {
        name: "description",
        content:
          "Réponds à quelques questions et l'IA ViewGo te propose une expérience unique selon ton humeur, tes envies et ta distance max.",
      },
      { property: "og:title", content: "Ton expérience personnalisée — ViewGo" },
      {
        property: "og:description",
        content: "Une expérience sur mesure générée rien que pour toi.",
      },
    ],
  }),
  component: DiscoverPage,
});

const MOODS = ["Calme", "Aventurier", "Romantique", "Curieux", "Festif", "Nostalgique"];
const COMPANY = ["Seul", "En couple", "Entre amis", "En famille", "Avec des inconnus"];
const BUDGETS = ["Gratuit", "Petit budget", "Peu importe"];

export function DiscoverPage() {
  const [mood, setMood] = useState(MOODS[0]!);
  const [themes, setThemes] = useState<string[]>([]);
  const [company, setCompany] = useState(COMPANY[0]!);
  const [budget, setBudget] = useState(BUDGETS[0]!);
  const [maxDistance, setMaxDistance] = useState(30);

  const fn = useServerFn(suggestExperience);
  const mutation = useMutation({
    mutationFn: () => fn({ data: { mood, themes, company, budget, maxDistance } }),
  });

  const chip = (on: boolean) =>
    `rounded-full px-3 py-1.5 text-xs ${on ? "bg-spiral text-primary-foreground" : "bg-surface text-muted-foreground"}`;

  return (
    <AppShell title="Pour toi">
      <div className="space-y-5 py-3">
        <div className="flex items-center gap-3 rounded-3xl bg-surface-gradient p-4 shadow-card">
          <SpiralIcon className="size-8 text-primary" />
          <p className="text-sm text-muted-foreground">
            Dis-nous ton humeur du moment, l'IA ViewGo compose une expérience rien que pour toi.
          </p>
        </div>

        <section>
          <h2 className="mb-2 text-sm font-semibold">Ton humeur</h2>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button key={m} className={chip(mood === m)} onClick={() => setMood(m)}>
                {m}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold">Types de lieux</h2>
          <div className="flex flex-wrap gap-2">
            {THEMES.map((t) => (
              <button
                key={t}
                className={chip(themes.includes(t))}
                onClick={() =>
                  setThemes((prev) =>
                    prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
                  )
                }
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold">Avec qui ?</h2>
          <div className="flex flex-wrap gap-2">
            {COMPANY.map((c) => (
              <button key={c} className={chip(company === c)} onClick={() => setCompany(c)}>
                {c}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold">
            Distance max : <span className="text-primary">{maxDistance} km</span>
          </h2>
          <input
            type="range"
            min={1}
            max={300}
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-full accent-[var(--primary)]"
          />
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold">Budget</h2>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map((b) => (
              <button key={b} className={chip(budget === b)} onClick={() => setBudget(b)}>
                {b}
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-spiral py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
        >
          <Sparkles className="size-4" />
          {mutation.isPending ? "Création en cours…" : "Génère mon expérience"}
        </button>

        {mutation.isError && (
          <p className="rounded-2xl bg-destructive/15 p-3 text-sm text-destructive">
            {(mutation.error as Error).message}
          </p>
        )}

        {mutation.data && (
          <article className="whitespace-pre-line rounded-3xl bg-surface-gradient p-4 text-sm leading-relaxed shadow-card">
            {mutation.data.text}
          </article>
        )}
      </div>
    </AppShell>
  );
}
