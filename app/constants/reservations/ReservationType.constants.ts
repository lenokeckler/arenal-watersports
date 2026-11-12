import type { ReservationType } from "@/app/types";

export const RESERVATION_TYPE = {
  COMBO: "combo",
  RENTAL: "rental",
  TOUR: "tour",
} as const satisfies Record<string, ReservationType>;
