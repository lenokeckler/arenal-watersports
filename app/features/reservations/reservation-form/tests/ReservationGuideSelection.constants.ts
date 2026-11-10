import type { ReservationGuideOption } from "../models/ReservationGuideOption.interface";

export const RESERVATION_GUIDE_SELECTION_OPTIONS: ReservationGuideOption[] =
  [
    { id: "guide-a", name: "Guía A" },
    { id: "guide-b", name: "Guía B" },
    { id: "guide-c", name: "Guía C" },
  ];

export const RESERVATION_GUIDE_SELECTION_IDS = [
  "guide-a",
  "guide-b",
  "guide-c",
];

const [firstGuideId, secondGuideId] =
  RESERVATION_GUIDE_SELECTION_IDS;

export const RESERVATION_GUIDE_SELECTION_TEST = {
  FIRST_ID: firstGuideId,
  SECOND_ID: secondGuideId,
} as const;
