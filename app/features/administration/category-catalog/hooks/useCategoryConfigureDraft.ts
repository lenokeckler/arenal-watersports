"use client";

import { useState } from "react";
import type { CategoryConfigureDraft } from "../models/CategoryConfigureDraft.interface";
import type { CategoryConfigureDraftViewModel } from "../models/CategoryConfigureDraftViewModel.interface";
import type { UseCategoryConfigureDraftOptions } from "../models/UseCategoryConfigureDraftOptions.interface";
import { countChangedFields } from "../utils/countChangedFields";

export const useCategoryConfigureDraft = ({
  isInitiallyActive,
  values,
  pickedFile,
}: UseCategoryConfigureDraftOptions): CategoryConfigureDraftViewModel => {
  const [baseline, setBaseline] =
    useState<CategoryConfigureDraft>(() => ({
      values,
      pickedFile: null,
      isActive: isInitiallyActive,
    }));
  const [isActive, setIsActive] = useState(
    isInitiallyActive
  );
  const current: CategoryConfigureDraft = {
    values,
    pickedFile,
    isActive,
  };

  return {
    baseline,
    current,
    changedCount: countChangedFields({ baseline, current }),
    onToggleActive: () =>
      setIsActive((wasActive) => !wasActive),
    onBaselineChange: setBaseline,
  };
};
