import { CURRENCY_CODE, STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryDeposit } from "../models/CategoryDeposit.interface";
import { joinSummaryParts } from "./joinSummaryParts";

const resolveAmountPart = (
  currencyCode: string,
  amount: NullableRef<number>,
  withoutLabel: string
): string =>
  amount === null
    ? withoutLabel
    : [currencyCode, amount].join(STRING.SPACE);

export const resolveDepositSummary = (
  deposit: CategoryDeposit
): string => {
  if (
    deposit.depositUsd === null &&
    deposit.depositCrc === null
  ) {
    return CATEGORY_CONFIGURE_COPY.DEPOSIT_NONE;
  }

  return joinSummaryParts([
    resolveAmountPart(
      CURRENCY_CODE.USD,
      deposit.depositUsd,
      CATEGORY_CONFIGURE_COPY.DEPOSIT_WITHOUT_USD
    ),
    resolveAmountPart(
      CURRENCY_CODE.CRC,
      deposit.depositCrc,
      CATEGORY_CONFIGURE_COPY.DEPOSIT_WITHOUT_CRC
    ),
  ]);
};
