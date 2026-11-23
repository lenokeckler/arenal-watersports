import type { Database } from "@/app/types";
import { RESERVATION_DETAIL_CHARGE_KIND } from "./ReservationDetail.constants";

export const RESERVATION_DETAIL_MOVEMENTS_COPY = {
  EXTRA_TIME_CONCEPT: "Tiempo adicional",
  TARIFF_CONCEPT: "Tarifa",
} as const;

export const RESERVATION_DETAIL_MOVEMENT_KIND_COPY: Record<
  Database["public"]["Enums"]["charge_kind"],
  string
> = {
  [RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME]:
    RESERVATION_DETAIL_MOVEMENTS_COPY.EXTRA_TIME_CONCEPT,
  [RESERVATION_DETAIL_CHARGE_KIND.TARIFF]:
    RESERVATION_DETAIL_MOVEMENTS_COPY.TARIFF_CONCEPT,
};
