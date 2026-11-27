import type { ComboAudience } from "../models/ComboAudience.type";
import { COMBO_AUDIENCE } from "./ComboAudience.constants";

export const COMBO_PRICE_LABEL: Record<
  ComboAudience,
  string
> = {
  [COMBO_AUDIENCE.FOREIGN]: "Precio en dólares (USD)",
  [COMBO_AUDIENCE.NATIONAL]: "Precio en colones (CRC)",
};

export const COMBO_PRICE_PLACEHOLDER: Record<
  ComboAudience,
  string
> = {
  [COMBO_AUDIENCE.FOREIGN]: "Precio del paquete en dólares",
  [COMBO_AUDIENCE.NATIONAL]:
    "Precio del paquete en colones",
};
