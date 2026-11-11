import { STRING } from "@/app/constants";
import { isTextValue } from "./isTextValue";

export const isExtraPriceBlank = (
  priceText: unknown
): boolean =>
  priceText === undefined ||
  priceText === null ||
  (isTextValue(priceText) &&
    priceText.trim() === STRING.Empty);
