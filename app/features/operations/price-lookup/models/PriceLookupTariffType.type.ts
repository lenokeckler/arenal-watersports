import type { RESERVATION_TYPE } from "@/app/constants";
import type { ReservationType } from "@/app/types";

export type PriceLookupTariffType = Exclude<
  ReservationType,
  typeof RESERVATION_TYPE.COMBO
>;
