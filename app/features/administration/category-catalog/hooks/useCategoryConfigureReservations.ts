"use client";

import { useState } from "react";
import type { CategoryBehaviorFormFieldsViewModel } from "../models/CategoryBehaviorFormFieldsViewModel.interface";
import type { CategoryConfigureReservationsProps } from "../models/CategoryConfigureReservationsProps.interface";
import { buildCategoryFormFieldChangeEvent } from "../utils/buildCategoryFormFieldChangeEvent";
import { resolveCategoryDurationChipSelection } from "../utils/resolveCategoryDurationChipSelection";

export const useCategoryConfigureReservations = (
  fields: CategoryBehaviorFormFieldsViewModel
): CategoryConfigureReservationsProps => {
  const { values, errors } = fields;
  const [isOtherChosen, setIsOtherChosen] = useState(false);

  const onToggleReservable = (): void =>
    fields.onIsReservableChange(
      buildCategoryFormFieldChangeEvent({
        checked: !values.isReservable,
      })
    );

  const onToggleGuideOnly = (): void =>
    fields.onGuideOnlyChange(
      buildCategoryFormFieldChangeEvent({
        checked: !values.guideOnly,
      })
    );

  const onSelectPreset = (minutes: number): void => {
    setIsOtherChosen(false);
    fields.onDefaultDurationMinutesChange(
      buildCategoryFormFieldChangeEvent({
        value: minutes.toString(),
      })
    );
  };

  return {
    isReservable: values.isReservable,
    isGuideOnly: values.guideOnly,
    durationText: values.defaultDurationMinutes,
    durationError: errors.defaultDurationMinutes,
    durationChips: {
      ...resolveCategoryDurationChipSelection(
        values.defaultDurationMinutes,
        isOtherChosen
      ),
      onSelectPreset,
      onSelectOther: () => setIsOtherChosen(true),
    },
    onToggleReservable,
    onToggleGuideOnly,
    onDurationChange: fields.onDefaultDurationMinutesChange,
  };
};
