import { createFileRoute } from "@tanstack/react-router";

import { useState } from "react";
import { Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { CONVERSATIONS } from "@/lib/viewgo-data";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Échanges entre viewers — ViewGo" },
      {
        name: "description",
        content: "Discute avec les autres viewers, organise tes sorties et partage tes bons plans.",
      },
      { property: "og:title", content: "Échanges entre viewers — ViewGo" },
      {
        property: "og:description",
        content: "Le lieu d'échange de la communauté ViewGo.",
      },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const convo = CONVERSATIONS.find((c) => c.id === open);

  if (convo) {
    return (
      <AppShell title={convo.name}>
        <div className="flex min-h-[70vh] flex-col py-3">
          <button
            onClick={() => setOpen(null)}
            className="self-start text-xs text-muted-foreground underline"
          >
            ← Retour
          </button>
          <div className="mt-4 flex-1 space-y-2">
            <p className="max-w-[80%] rounded-3xl bg-surface px-4 py-2 text-sm">{convo.last}</p>
            {sent.map((m, i) => (
              <p
                key={i}
                className="ml-auto max-w-[80%] rounded-3xl bg-spiral px-4 py-2 text-sm text-primary-foreground"
              >
                {m}
              </p>
            ))}
          </div>
          <form
            className="sticky bottom-24 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              setSent((s) => [...s, draft.trim()]);
              setDraft("");
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Écrire un message…"
              className="flex-1 rounded-full border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <button className="rounded-full bg-spiral p-3 text-primary-foreground shadow-glow">
              <Send className="size-4" />
            </button>
          </form>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Échanges">
      <div className="space-y-2 py-3">
        {CONVERSATIONS.map((c) => (
          <button
            key={c.id}
            onClick={() => setOpen(c.id)}
            className="flex w-full items-center gap-3 rounded-3xl bg-surface p-3 text-left"
          >
            <img src={c.avatar} alt="" loading="lazy" className="size-12 rounded-full object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{c.name}</span>
              <span className="block truncate text-xs text-muted-foreground">{c.last}</span>
            </span>
            <span className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-muted-foreground">{c.time}</span>
              {c.unread > 0 && (
                <span className="rounded-full bg-spiral px-2 text-[10px] font-bold text-primary-foreground">
                  {c.unread}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    </AppShell>
  );
}
