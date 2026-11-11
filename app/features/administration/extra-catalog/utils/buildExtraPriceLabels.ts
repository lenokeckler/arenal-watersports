import { CURRENCY_CODE } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import type { Extra } from "../models/Extra.interface";

export const buildExtraPriceLabels = ({
  priceUsd,
  priceCrc,
}: Extra): string[] => {
  const labels: string[] = [];
  if (priceUsd !== null) {
    labels.push(
      formatMoney({
        amount: priceUsd,
        currency: CURRENCY_CODE.USD,
      })
    );
  }
  if (priceCrc !== null) {
    labels.push(
      formatMoney({
        amount: priceCrc,
        currency: CURRENCY_CODE.CRC,
      })
    );
  }
  return labels;
};
