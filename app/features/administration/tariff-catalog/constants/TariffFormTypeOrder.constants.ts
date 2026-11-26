import type { TariffType } from "../models/TariffType.type";
import { TARIFF_TYPE } from "./TariffType.constants";

export const TARIFF_FORM_TYPE_ORDER: readonly TariffType[] =
  [TARIFF_TYPE.RENTAL, TARIFF_TYPE.TOUR];
