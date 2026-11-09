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

export const RESERVATION_GUIDE_SELECTION_TEST = {
  FIRST_ID: RESERVATION_GUIDE_SELECTION_IDS[0],
  SECOND_ID: RESERVATION_GUIDE_SELECTION_IDS[1],
} as const;
