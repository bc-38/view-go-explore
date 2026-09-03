import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  mood: z.string(),
  themes: z.array(z.string()),
  company: z.string(),
  maxDistance: z.number(),
  budget: z.string(),
});

export const suggestExperience = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        messages: [
          {
            role: "system",
            content:
              "Tu es le guide de ViewGo. Propose UNE expérience à vivre, concrète et inspirante, en français. Réponds en 4 parties courtes: 'Titre:', 'Pourquoi toi:', 'Le plan:', 'Trajet:'. Maximum 130 mots.",
          },
          {
            role: "user",
            content: `Humeur: ${data.mood}. Types de lieux: ${data.themes.join(", ") || "peu importe"}. Accompagnement: ${data.company}. Distance max: ${data.maxDistance} km. Budget: ${data.budget}.`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(
        res.status === 429
          ? "Trop de demandes, réessaie dans un instant."
          : res.status === 402
            ? "Crédits IA épuisés — ajoute des crédits pour continuer."
            : `Erreur IA (${res.status}): ${message.slice(0, 200)}`,
      );
    }

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return { text: json.choices?.[0]?.message?.content ?? "Aucune suggestion." };
  });
