import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { OrbIcon } from "@/components/icons";
import { THEMES } from "@/lib/viewgo-data";
import { useViewGo } from "@/lib/viewgo-store";

export const Route = createFileRoute("/post")({
  head: () => ({
    meta: [
      { title: "Poster un lieu — ViewGo" },
      {
        name: "description",
        content:
          "Partage un lieu avec photo, thème, description et trajet, et gagne des World Orbs sur ViewGo.",
      },
      { property: "og:title", content: "Poster un lieu — ViewGo" },
      {
        property: "og:description",
        content: "Ajoute ta découverte à ViewGo et fais-la vivre à d'autres viewers.",
      },
    ],
  }),
  component: PostPage,
});

function PostPage() {
  const { addPlace } = useViewGo();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState(THEMES[0]);
  const [description, setDescription] = useState("");
  const [routeText, setRouteText] = useState("");
  const [city, setCity] = useState("");

  const field =
    "w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary";

  return (
    <AppShell title="Poster un lieu">
      <form
        className="space-y-3 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          addPlace({
            title,
            theme,
            description,
            city: city || "Autour de toi",
            distanceKm: Math.round(Math.random() * 30) + 1,
            route: routeText,
            image: image || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
          });
          toast.success("Lieu publié ! +1 World Orb 🪐");
          navigate({ to: "/" });
        }}
      >
        <label className="flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-dashed border-border bg-surface">
          {image ? (
            <img src={image} alt="" className="size-full object-cover" />
          ) : (
            <span className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
              <ImagePlus className="size-7" />
              Ajouter une photo du lieu
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setImage(String(reader.result));
              reader.readAsDataURL(file);
            }}
          />
        </label>

        <input
          className={field}
          placeholder="Titre du lieu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="flex flex-wrap gap-2">
          {THEMES.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTheme(t)}
              className={`rounded-full px-3 py-1.5 text-xs ${
                theme === t ? "bg-spiral text-primary-foreground" : "bg-surface text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <input
          className={field}
          placeholder="Ville / zone"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <textarea
          className={`${field} min-h-24`}
          placeholder="Décris ton expérience…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <textarea
          className={`${field} min-h-20`}
          placeholder="Le trajet pour y aller"
          value={routeText}
          onChange={(e) => setRouteText(e.target.value)}
          required
        />

        <p className="flex items-center gap-2 rounded-2xl bg-surface p-3 text-xs text-muted-foreground">
          <OrbIcon className="size-5 shrink-0 text-primary" />
          Chaque lieu posté avec ta propre photo te rapporte des World Orbs échangeables contre des
          cadeaux et des accès exclusifs.
        </p>

        <button
          type="submit"
          className="w-full rounded-2xl bg-spiral py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Publier l'expérience
        </button>
      </form>
    </AppShell>
  );
}
