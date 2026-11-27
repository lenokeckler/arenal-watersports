import type { CurrencyCode } from "@/app/constants";
import type { Database, NullableRef } from "@/app/types";

type GeneratedRecordRow =
  Database["public"]["Functions"]["record_reservation_extra_time"]["Returns"][number];

export type ReservationExtraTimeRecordRow = Omit<
  GeneratedRecordRow,
  | "charge_id"
  | "charged_amount"
  | "charged_currency"
  | "charged_payment_method"
> & {
  charge_id: NullableRef<string>;
  charged_amount: NullableRef<number>;
  charged_currency: NullableRef<CurrencyCode>;
  charged_payment_method: NullableRef<string>;
};
