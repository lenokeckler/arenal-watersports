import type { CurrencyCode } from "@/app/constants";
import { INCOME_ID } from "../constants/Income.constants";

export const buildIncomeTitleId = (
  currency: CurrencyCode
): string =>
  `${INCOME_ID.PREFIX}${currency.toLowerCase()}${INCOME_ID.TITLE_SUFFIX}`;
