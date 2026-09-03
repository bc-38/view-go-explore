import { useState } from "react";
import logo from "@/assets/viewgo-logo.png";
import { useViewGo } from "@/lib/viewgo-store";

export function Onboarding() {
  const { signUp } = useViewGo();
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-glow" />
      <img
        src={logo}
        alt="Logo ViewGo"
        width={816}
        height={816}
        className="size-24 rounded-3xl shadow-glow"
      />
      <h2 className="mt-6 text-3xl font-bold tracking-tight">
        Bienvenue sur <span className="text-gradient">ViewGo</span>
      </h2>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Crée ton compte pour découvrir les expériences autour de toi et gagner tes premiers World
        Orbs.
      </p>

      <form
        className="mt-8 w-full max-w-sm space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim() && handle.trim()) signUp(name.trim(), handle.trim());
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ton prénom"
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
        />
        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="@pseudo"
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="w-full rounded-2xl bg-spiral py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-50"
          disabled={!name.trim() || !handle.trim()}
        >
          S'inscrire et explorer
        </button>
      </form>
    </div>
  );
}
