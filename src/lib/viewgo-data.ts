export type Place = {
  id: string;
  title: string;
  theme: string;
  description: string;
  city: string;
  distanceKm: number;
  route: string;
  image: string;
  author: string;
  authorAvatar: string;
  views: number;
  orbs: number;
};

export const PLACES: Place[] = [
  {
    id: "1",
    title: "Lac de Vouglans au lever du soleil",
    theme: "Lac",
    description:
      "Une eau turquoise incroyable, arrive vers 6h30 pour la brume sur l'eau. Prends un thermos, ça vaut le détour.",
    city: "Jura",
    distanceKm: 12,
    route: "Parking du Belvédère → sentier balisé bleu, 15 min de marche",
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=900&q=70",
    author: "lena.explore",
    authorAvatar: "https://i.pravatar.cc/120?img=47",
    views: 1284,
    orbs: 3,
  },
  {
    id: "2",
    title: "Fête foraine des Quais",
    theme: "Fête foraine",
    description:
      "Grande roue avec vue sur toute la ville la nuit. Le stand de churros au fond est le meilleur.",
    city: "Lyon",
    distanceKm: 4,
    route: "Métro D → Bellecour, puis 8 min à pied le long du quai",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=70",
    author: "marco",
    authorAvatar: "https://i.pravatar.cc/120?img=12",
    views: 842,
    orbs: 2,
  },
  {
    id: "3",
    title: "Crête du Grand Colon",
    theme: "Montagne",
    description:
      "3h de montée, mais la vue à 360° sur les Alpes est irréelle. Idéal en fin de journée.",
    city: "Belledonne",
    distanceKm: 38,
    route: "Départ Freydières → sentier des lacs → crête",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=70",
    author: "sarah.k",
    authorAvatar: "https://i.pravatar.cc/120?img=32",
    views: 2310,
    orbs: 5,
  },
  {
    id: "4",
    title: "Librairie-café caché rue Saint-Jean",
    theme: "Magasin",
    description:
      "Un vieil escalier, 3 étages de livres et un chocolat chaud maison. Parfait un jour de pluie.",
    city: "Vieux Lyon",
    distanceKm: 2,
    route: "Sortie métro Vieux Lyon, 3ème ruelle à droite",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=70",
    author: "tom.v",
    authorAvatar: "https://i.pravatar.cc/120?img=68",
    views: 517,
    orbs: 1,
  },
  {
    id: "5",
    title: "Plage secrète des Calanques",
    theme: "Mer",
    description:
      "Petite crique accessible seulement à pied. Emporte de l'eau, il n'y a rien sur place.",
    city: "Marseille",
    distanceKm: 120,
    route: "Parking Luminy → sentier GR98 → descente à gauche",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=70",
    author: "nour",
    authorAvatar: "https://i.pravatar.cc/120?img=5",
    views: 4021,
    orbs: 8,
  },
];

export type MapSpot = {
  id: string;
  name: string;
  theme: string;
  views: number;
  x: number;
  y: number;
};

export const MAP_SPOTS: MapSpot[] = [
  { id: "m1", name: "Calanques", theme: "Mer", views: 4021, x: 62, y: 78 },
  { id: "m2", name: "Grand Colon", theme: "Montagne", views: 2310, x: 70, y: 52 },
  { id: "m3", name: "Vouglans", theme: "Lac", views: 1284, x: 63, y: 38 },
  { id: "m4", name: "Quais de Lyon", theme: "Fête", views: 842, x: 55, y: 47 },
  { id: "m5", name: "Vieux Lyon", theme: "Magasin", views: 517, x: 48, y: 44 },
  { id: "m6", name: "Forêt de Brocéliande", theme: "Forêt", views: 968, x: 22, y: 33 },
];

export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  last: string;
  time: string;
  unread: number;
};

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    name: "Cercle Montagne",
    avatar: "https://i.pravatar.cc/120?img=15",
    last: "On part samedi 6h, qui vient ?",
    time: "12:04",
    unread: 3,
  },
  {
    id: "c2",
    name: "lena.explore",
    avatar: "https://i.pravatar.cc/120?img=47",
    last: "Merci pour le spot du lac 🌅",
    time: "hier",
    unread: 0,
  },
  {
    id: "c3",
    name: "Viewers de Lyon",
    avatar: "https://i.pravatar.cc/120?img=12",
    last: "Nouveau rooftop repéré ce soir",
    time: "hier",
    unread: 1,
  },
];

export const THEMES = [
  "Lac",
  "Montagne",
  "Mer",
  "Forêt",
  "Magasin",
  "Fête foraine",
  "Musée",
  "Restaurant",
  "Rooftop",
  "Parc",
  "Ville",
  "Insolite",
];
