import { TARIFF_CARD_TONE } from "../constants/TariffCardTone.constants";

export type TariffCardTone =
  (typeof TARIFF_CARD_TONE)[keyof typeof TARIFF_CARD_TONE];
