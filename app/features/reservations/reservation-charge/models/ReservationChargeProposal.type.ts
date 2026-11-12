import type { CurrencyCode } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export type ReservationChargeProposal = Record<
  CurrencyCode,
  NullableRef<number>
>;
