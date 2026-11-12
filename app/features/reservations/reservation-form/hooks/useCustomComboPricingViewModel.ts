import { useMemo } from "react";
import type { CustomComboReservationDraft } from "../models/CustomComboReservationDraft.interface";
import type { ReservationType } from "../models/ReservationType.type";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import type { CustomComboPricingInput } from "../models/CustomComboPricingInput.interface";
import { useCustomComboPricing } from "./useCustomComboPricing";

const NO_CUSTOM_COMBO_ITEMS: CustomComboEquipmentSelection[] =
  [];

export const useCustomComboPricingViewModel = (
  draft: CustomComboReservationDraft,
  durationHours: number,
  reservationType: ReservationType
) => {
  const input = useMemo<CustomComboPricingInput>(
    () => ({
      durationHours,
      items:
        reservationType === RESERVATION_TYPE.COMBO
          ? draft.items
          : NO_CUSTOM_COMBO_ITEMS,
    }),
    [draft.items, durationHours, reservationType]
  );
  return useCustomComboPricing(
    input,
    reservationType === RESERVATION_TYPE.COMBO
  );
};
