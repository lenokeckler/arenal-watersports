import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { Extra } from "../models/Extra.interface";
import type { ExtraFormValues } from "../models/ExtraFormValues.interface";

export const mapExtraToFormValues = ({
  name,
  priceUsd,
  priceCrc,
}: Extra): ExtraFormValues => ({
  name,
  priceUsd: safeString(priceUsd?.toString()),
  priceCrc: safeString(priceCrc?.toString()),
});
