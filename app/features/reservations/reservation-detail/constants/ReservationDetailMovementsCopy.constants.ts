import type { Database } from "@/app/types";
import { RESERVATION_DETAIL_CHARGES_COPY } from "./ReservationDetailChargesCopy.constants";
import { RESERVATION_DETAIL_CHARGE_KIND } from "./ReservationDetail.constants";

export const RESERVATION_DETAIL_MOVEMENT_KIND_COPY: Record<
  Database["public"]["Enums"]["charge_kind"],
  string
> = {
  [RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME]:
    RESERVATION_DETAIL_CHARGES_COPY.EXTRA_TIME_CHARGES,
  [RESERVATION_DETAIL_CHARGE_KIND.TARIFF]:
    RESERVATION_DETAIL_CHARGES_COPY.AMOUNT_TARGET,
};
