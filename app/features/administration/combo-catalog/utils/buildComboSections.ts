import {
  COMBO_AUDIENCE_EMPTY,
  COMBO_AUDIENCE_PRICE_NOTE,
  COMBO_AUDIENCE_TITLE,
} from "../constants/ComboAudienceCopy.constants";
import { COMBO_AUDIENCE_ORDER } from "../constants/ComboAudienceOrder.constants";
import type { Combo } from "../models/Combo.interface";
import type { ComboAudienceSectionProps } from "../models/ComboAudienceSectionProps.interface";
import type { ComboCardActions } from "../models/ComboCardActions.interface";
import { buildComboCardViewModel } from "./buildComboCardViewModel";

export const buildComboSections = (
  combos: Combo[],
  actions: ComboCardActions
): ComboAudienceSectionProps[] =>
  COMBO_AUDIENCE_ORDER.map((audience) => ({
    cards: combos
      .filter((combo) => combo.audience === audience)
      .map((combo) =>
        buildComboCardViewModel(combo, actions)
      ),
    emptyMessage: COMBO_AUDIENCE_EMPTY[audience],
    priceNote: COMBO_AUDIENCE_PRICE_NOTE[audience],
    title: COMBO_AUDIENCE_TITLE[audience],
  }));
