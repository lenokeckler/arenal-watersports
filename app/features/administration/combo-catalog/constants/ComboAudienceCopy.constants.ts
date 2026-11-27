import type { ComboAudience } from "../models/ComboAudience.type";
import { COMBO_AUDIENCE } from "./ComboAudience.constants";

export const COMBO_AUDIENCE_TITLE: Record<
  ComboAudience,
  string
> = {
  [COMBO_AUDIENCE.FOREIGN]: "Combos para extranjeros",
  [COMBO_AUDIENCE.NATIONAL]: "Combos para nacionales",
};

export const COMBO_AUDIENCE_EMPTY: Record<
  ComboAudience,
  string
> = {
  [COMBO_AUDIENCE.FOREIGN]:
    "Aún no hay combos para extranjeros.",
  [COMBO_AUDIENCE.NATIONAL]:
    "Aún no hay combos para nacionales.",
};

export const COMBO_AUDIENCE_PRICE_NOTE: Record<
  ComboAudience,
  string
> = {
  [COMBO_AUDIENCE.FOREIGN]: "Precio en USD",
  [COMBO_AUDIENCE.NATIONAL]: "Precio en CRC",
};
