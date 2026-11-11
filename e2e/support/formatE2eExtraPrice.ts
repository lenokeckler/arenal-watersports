import type { CurrencyCode } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";

export const formatE2eExtraPrice = (
  currency: CurrencyCode,
  priceText: string
): string =>
  formatMoney({ amount: Number(priceText), currency });
