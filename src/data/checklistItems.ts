import type { ChecklistItemDefinition } from "../types/checklist";

export const CHECKLIST_ITEMS: ChecklistItemDefinition[] = [
  {
    id: "daylight",
    emoji: "☀️",
    title: "Daylight",
    description:
      "Get outside and get some natural daylight, preferably during the first half of the day.",
  },
  {
    id: "fresh-air",
    emoji: "🌬️",
    title: "Fresh Air",
    description: "Spend at least 20–30 minutes outside.",
  },
  {
    id: "water",
    emoji: "🌊",
    title: "Water",
    description: "Swimming, pool, sauna + pool, or another water-based activity.",
  },
  {
    id: "warmth",
    emoji: "🔥",
    title: "Warmth",
    description: "Create a warm relaxing moment: warm café, sauna, warm shower, etc.",
  },
  {
    id: "movement",
    emoji: "🚶",
    title: "Movement",
    description:
      "Walk, gym, swimming, stretching, sports, or another form of physical activity.",
  },
  {
    id: "people",
    emoji: "👥",
    title: "People",
    description:
      "Have some social contact: friends, coworking, sports, events, family, etc.",
  },
];

export const ACTIVITIES_PER_DAY = CHECKLIST_ITEMS.length;
