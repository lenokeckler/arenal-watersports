import type { CurrencyCode } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { RESERVATION_CHARGE_UI_COPY } from "../constants/ReservationChargeUiCopy.constants";

export const formatReservationChargeProposal = (
  amount: NullableRef<number>,
  currency: CurrencyCode
): string =>
  amount === null
    ? RESERVATION_CHARGE_UI_COPY.NO_PROPOSAL_LINE[currency]
    : RESERVATION_CHARGE_UI_COPY.PROPOSAL_LINE(
        formatMoney({ amount, currency })
      );
