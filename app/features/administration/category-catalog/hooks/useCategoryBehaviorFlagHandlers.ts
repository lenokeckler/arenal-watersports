"use client";

import type { Dispatch, SetStateAction } from "react";
import { CATEGORY_BEHAVIOR_FLAG_FIELD } from "../constants/CategoryBehaviorFlagField.constants";
import type { CategoryBehaviorFlagField } from "../models/CategoryBehaviorFlagField.type";
import type { CategoryBehaviorFlagHandlers } from "../models/CategoryBehaviorFlagHandlers.interface";
import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import type { CategoryFormFieldChangeEvent } from "../models/CategoryFormFieldChangeEvent.type";
import { readCategoryFormFieldChecked } from "../utils/readCategoryFormFieldChecked";

export const useCategoryBehaviorFlagHandlers = (
  setValues: Dispatch<
    SetStateAction<CategoryBehaviorFormValues>
  >
): CategoryBehaviorFlagHandlers => {
  const changeFlag =
    (field: CategoryBehaviorFlagField) =>
    (event: CategoryFormFieldChangeEvent): void => {
      const isChecked = readCategoryFormFieldChecked(event);
      setValues((currentValues) => ({
        ...currentValues,
        [field]: isChecked,
      }));
    };

  return {
    onCanBeDamagedChange: changeFlag(
      CATEGORY_BEHAVIOR_FLAG_FIELD.CAN_BE_DAMAGED
    ),
    onConsumesFuelChange: changeFlag(
      CATEGORY_BEHAVIOR_FLAG_FIELD.CONSUMES_FUEL
    ),
    onGuideOnlyChange: changeFlag(
      CATEGORY_BEHAVIOR_FLAG_FIELD.GUIDE_ONLY
    ),
    onUnitsAreInterchangeableChange: changeFlag(
      CATEGORY_BEHAVIOR_FLAG_FIELD.UNITS_ARE_INTERCHANGEABLE
    ),
  };
};
