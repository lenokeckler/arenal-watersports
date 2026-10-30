import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";

export const RESERVATION_CATEGORY_OPTIONS: ReservationCategoryOption[] =
  [
    {
      id: "category-rental",
      isGuideOnly: false,
      isInterchangeable: true,
      name: "Jet Ski",
    },
    {
      id: "category-guide-only",
      isGuideOnly: true,
      isInterchangeable: false,
      name: "Lancha",
    },
  ];

export const RESERVATION_TYPES = [
  RESERVATION_TYPE.RENTAL,
  RESERVATION_TYPE.TOUR,
  RESERVATION_TYPE.COMBO,
] as const;

export const EXPECTED_RENTAL_CATEGORY_IDS = [
  "category-rental",
];

export const EXPECTED_TOUR_CATEGORY_IDS = [
  "category-rental",
  "category-guide-only",
];

export const TOUR_RESERVATION_TYPE = RESERVATION_TYPE.TOUR;
