import { PREDEFINED_COMBO_AUDIENCE } from "../constants/PredefinedCombo.constants";
import { PREDEFINED_COMBO_FORM_COPY } from "../constants/PredefinedComboFormCopy.constants";
import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";

export const getPredefinedComboAudienceLabel = (
  combo: ReservationPredefinedCombo
): string =>
  combo.audience === PREDEFINED_COMBO_AUDIENCE.NATIONAL
    ? PREDEFINED_COMBO_FORM_COPY.AUDIENCE_NATIONAL
    : PREDEFINED_COMBO_FORM_COPY.AUDIENCE_FOREIGN;

export const getPredefinedComboOptionLabel = (
  combo: ReservationPredefinedCombo
): string =>
  `${combo.name} · ${getPredefinedComboAudienceLabel(combo)}`;
