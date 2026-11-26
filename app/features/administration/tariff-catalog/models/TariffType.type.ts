import { TARIFF_TYPE } from "../constants/TariffType.constants";

export type TariffType =
  (typeof TARIFF_TYPE)[keyof typeof TARIFF_TYPE];
