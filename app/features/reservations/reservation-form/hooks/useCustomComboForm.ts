import { useCallback, useMemo, useState } from "react";
import { INDEX } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import type { CustomComboPricingInput } from "../models/CustomComboPricingInput.interface";
import type { CustomComboReservationDraft } from "../models/CustomComboReservationDraft.interface";
import type { CustomComboFormViewModel } from "../models/CustomComboFormViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { hasValidCustomComboEquipmentSelections } from "../utils/hasValidCustomComboEquipmentSelections";
import { resolveCustomComboAgreedAmount } from "../utils/resolveCustomComboAgreedAmount";
import { useCustomComboPricing } from "./useCustomComboPricing";

const EMPTY_DRAFT: CustomComboReservationDraft = {
  agreedAmountCrc: null,
  agreedAmountUsd: null,
  items: [],
};

export const useCustomComboForm = (
  categories: ReservationCategoryOption[],
  durationHours: number,
  onGuideIdsChange: (guideIds: string[]) => void,
  clearFieldError: (field: ReservationFormField) => void
): CustomComboFormViewModel => {
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const pricingInput = useMemo<CustomComboPricingInput>(
    () => ({ durationHours, items: draft.items }),
    [draft.items, durationHours]
  );
  const pricing = useCustomComboPricing(pricingInput);
  const guideOnlyCategoryIds = useMemo(
    () =>
      new Set(
        categories
          .filter(({ isGuideOnly }) => isGuideOnly)
          .map(({ id }) => id)
      ),
    [categories]
  );
  const hasGuideOnlyItem = draft.items.some(
    ({ categoryId }) => guideOnlyCategoryIds.has(categoryId)
  );

  const handleItemChange = useCallback(
    (selection: CustomComboEquipmentSelection): void => {
      if (
        !hasValidCustomComboEquipmentSelections([selection])
      ) {
        return;
      }
      clearFieldError(RESERVATION_FORM_FIELD.ITEMS);
      setDraft((currentDraft) => {
        const nextItems = currentDraft.items.some(
          ({ categoryId }) =>
            categoryId === selection.categoryId
        )
          ? currentDraft.items.map((item) =>
              item.categoryId === selection.categoryId
                ? selection
                : item
            )
          : [...currentDraft.items, selection];
        if (
          !hasValidCustomComboEquipmentSelections(nextItems)
        ) {
          return currentDraft;
        }
        return { ...currentDraft, items: nextItems };
      });
    },
    [clearFieldError]
  );
  const handleItemRemoval = useCallback(
    (categoryId: string): void => {
      const items = draft.items.filter(
        (item) => item.categoryId !== categoryId
      );
      const hadGuideOnlyItem = draft.items.some(
        ({ categoryId: id }) => guideOnlyCategoryIds.has(id)
      );
      const stillHasGuideOnlyItem = items.some(
        ({ categoryId: id }) => guideOnlyCategoryIds.has(id)
      );
      if (
        hadGuideOnlyItem &&
        guideOnlyCategoryIds.has(categoryId) &&
        !stillHasGuideOnlyItem
      ) {
        onGuideIdsChange([]);
      }
      clearFieldError(RESERVATION_FORM_FIELD.ITEMS);
      setDraft({ ...draft, items });
    },
    [
      clearFieldError,
      draft,
      guideOnlyCategoryIds,
      onGuideIdsChange,
    ]
  );
  const handleAgreedAmountCrcChange = useCallback(
    (value: NullableRef<number>): void => {
      setDraft((currentDraft) => ({
        ...currentDraft,
        agreedAmountCrc:
          resolveCustomComboAgreedAmount(value),
      }));
    },
    []
  );
  const handleItemQuantityChange = useCallback(
    (categoryId: string, quantity: number): void => {
      if (quantity <= INDEX.ZERO) {
        handleItemRemoval(categoryId);
        return;
      }
      handleItemChange({ categoryId, quantity });
    },
    [handleItemChange, handleItemRemoval]
  );
  const handleAgreedAmountUsdChange = useCallback(
    (value: NullableRef<number>): void => {
      setDraft((currentDraft) => ({
        ...currentDraft,
        agreedAmountUsd:
          resolveCustomComboAgreedAmount(value),
      }));
    },
    []
  );

  return {
    draft,
    hasGuideOnlyItem,
    pricing: pricing.state,
    handleAgreedAmountCrcChange,
    handleAgreedAmountUsdChange,
    handleItemChange,
    handleItemQuantityChange,
    handleItemRemoval,
    handlePricingRetry: pricing.retry,
  };
};
