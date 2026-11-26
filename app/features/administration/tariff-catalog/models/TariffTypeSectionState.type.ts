import type { TARIFF_TYPE_SECTION_STATE } from "../constants/TariffTypeSectionState.constants";

export type TariffTypeSectionState =
  (typeof TARIFF_TYPE_SECTION_STATE)[keyof typeof TARIFF_TYPE_SECTION_STATE];
