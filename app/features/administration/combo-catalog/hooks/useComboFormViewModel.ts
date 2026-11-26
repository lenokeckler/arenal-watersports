"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants";
import {
  EMPTY_COMBO_FORM_ITEM,
  INITIAL_COMBO_FORM_VALUES,
} from "../constants/ComboFormDefaults.constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import type { ComboFormItemValues } from "../models/ComboFormItemValues.interface";
import type { ComboFormValues } from "../models/ComboFormValues.interface";
import type { ComboFormViewModel } from "../models/ComboFormViewModel.interface";
import type { ComboFormViewProps } from "../models/ComboFormViewProps.interface";
import { mapComboToFormValues } from "../utils/mapComboToFormValues";
import { resolveComboPriceField } from "../utils/resolveComboPriceField";
import { stepComboItemQuantity } from "../utils/stepComboItemQuantity";
import { useComboFormSubmit } from "./useComboFormSubmit";

export const useComboFormViewModel = ({
  categoryOptions,
  combo,
}: ComboFormViewProps): ComboFormViewModel => {
  const router = useRouter();
  const [values, setValues] = useState<ComboFormValues>(
    combo
      ? mapComboToFormValues(combo)
      : INITIAL_COMBO_FORM_VALUES
  );
  const submit = useComboFormSubmit({
    comboId: combo?.id,
    values,
  });

  const updateValues = (
    changes: Partial<ComboFormValues>
  ): void =>
    setValues((current) => ({ ...current, ...changes }));

  const updateItem = (
    index: number,
    changes: Partial<ComboFormItemValues>
  ): void =>
    setValues((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...changes } : item
      ),
    }));

  const onItemQuantityStep =
    (index: number, step: number) => (): void =>
      setValues((current) => ({
        ...current,
        items: current.items.map((item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                quantityText: stepComboItemQuantity(
                  item.quantityText,
                  step
                ),
              }
            : item
        ),
      }));

  const onAddItem = (): void =>
    setValues((current) => ({
      ...current,
      items: [...current.items, EMPTY_COMBO_FORM_ITEM],
    }));

  const onRemoveItem = (index: number) => (): void =>
    setValues((current) => ({
      ...current,
      items: current.items.filter(
        (_item, itemIndex) => itemIndex !== index
      ),
    }));

  return {
    ...submit,
    categoryFieldOptions: categoryOptions.map(
      ({ id, name }) => ({
        key: id,
        label: name,
        value: id,
      })
    ),
    isAudienceLocked: Boolean(combo),
    onAddItem,
    onAudienceSelect: (audience) => () =>
      updateValues({ audience }),
    onBack: () => router.push(PATHS.ADMINISTRATION.COMBOS),
    onItemCategoryChange: (index) => (event) =>
      updateItem(index, { categoryId: event.target.value }),
    onItemQuantityChange: (index) => (event) =>
      updateItem(index, {
        quantityText: event.target.value,
      }),
    onItemQuantityStep,
    onNameChange: (event) =>
      updateValues({ name: event.target.value }),
    onPriceChange: (event) =>
      updateValues({ priceText: event.target.value }),
    onRemoveItem,
    priceField: resolveComboPriceField(values.audience),
    title: combo
      ? COMBO_FORM_COPY.TITLE_EDIT
      : COMBO_FORM_COPY.TITLE_CREATE,
    values,
  };
};
