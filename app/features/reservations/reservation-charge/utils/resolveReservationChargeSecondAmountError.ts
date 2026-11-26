import type { NullableUndefined } from "@/app/types";
import type { ReservationChargeValues } from "../models/ReservationChargeValues.interface";
import { resolveReservationChargeAmountError } from "./resolveReservationChargeAmountError";
import { resolveReservationChargeSecondCurrency } from "./resolveReservationChargeSecondCurrency";

export const resolveReservationChargeSecondAmountError = (
  values: ReservationChargeValues
): NullableUndefined<string> =>
  values.secondAmountText === null
    ? undefined
    : resolveReservationChargeAmountError(
        values.secondAmountText,
        resolveReservationChargeSecondCurrency(
          values.currency
        )
      );
