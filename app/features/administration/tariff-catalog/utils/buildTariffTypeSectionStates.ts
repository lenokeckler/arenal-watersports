import { TARIFF_TYPE } from "../constants/TariffType.constants";
import { TARIFF_TYPE_SECTION_STATE } from "../constants/TariffTypeSectionState.constants";
import type { TariffForEdit } from "../models/TariffForEdit.type";
import type { TariffType } from "../models/TariffType.type";
import type { TariffTypeSectionState } from "../models/TariffTypeSectionState.type";
import { hasTariffAmounts } from "./hasTariffAmounts";

const resolveState = (
  hasTariff: boolean
): TariffTypeSectionState =>
  hasTariff
    ? TARIFF_TYPE_SECTION_STATE.SAVED
    : TARIFF_TYPE_SECTION_STATE.EMPTY;

export const buildTariffTypeSectionStates = (
  tariff: TariffForEdit
): Record<TariffType, TariffTypeSectionState> => ({
  [TARIFF_TYPE.RENTAL]: resolveState(
    hasTariffAmounts(tariff.rental)
  ),
  [TARIFF_TYPE.TOUR]: resolveState(
    hasTariffAmounts(tariff.tour)
  ),
});
