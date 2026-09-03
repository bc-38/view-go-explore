import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PLACES, type Place } from "./viewgo-data";

export type Profile = {
  name: string;
  handle: string;
  avatar: string;
  orbs: number;
  views: number;
};

type Store = {
  ready: boolean;
  profile: Profile | null;
  signUp: (name: string, handle: string) => void;
  signOut: () => void;
  setAvatar: (dataUrl: string) => void;
  places: Place[];
  addPlace: (place: Omit<Place, "id" | "views" | "orbs" | "author" | "authorAvatar">) => void;
  addOrbs: (n: number) => void;
};

const StoreContext = createContext<Store | null>(null);
const KEY = "viewgo.profile";

export function ViewGoProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [places, setPlaces] = useState<Place[]>(PLACES);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProfile(JSON.parse(raw) as Profile);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = (p: Profile | null) => {
    setProfile(p);
    if (p) localStorage.setItem(KEY, JSON.stringify(p));
    else localStorage.removeItem(KEY);
  };

  const value = useMemo<Store>(
    () => ({
      ready,
      profile,
      places,
      signUp: (name, handle) =>
        persist({
          name,
          handle: handle.replace(/^@/, ""),
          avatar: "",
          orbs: 3,
          views: 0,
        }),
      signOut: () => persist(null),
      setAvatar: (dataUrl) => profile && persist({ ...profile, avatar: dataUrl }),
      addOrbs: (n) => profile && persist({ ...profile, orbs: profile.orbs + n }),
      addPlace: (place) => {
        setPlaces((prev) => [
          {
            ...place,
            id: crypto.randomUUID(),
            views: 0,
            orbs: 1,
            author: profile?.handle ?? "moi",
            authorAvatar: profile?.avatar ?? "",
          },
          ...prev,
        ]);
        if (profile) persist({ ...profile, orbs: profile.orbs + 1 });
      },
    }),
    [ready, profile, places],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useViewGo() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useViewGo must be used inside ViewGoProvider");
  return ctx;
}
