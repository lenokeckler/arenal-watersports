"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { STATUS, STORE_SLICES } from "@/app/constants";
import {
  categoryConfigureActions,
  type AppDispatch,
  type RootState,
} from "@/app/store";
import { CATEGORY_CONFIGURE_SAVE_STATUS } from "../constants/CategoryConfigureSaveStatus.constants";
import type { CategoryConfigurationErrors } from "../models/CategoryConfigurationErrors.interface";
import type { CategoryConfigureSaveViewModel } from "../models/CategoryConfigureSaveViewModel.interface";
import type { UseCategoryConfigureSaveOptions } from "../models/UseCategoryConfigureSaveOptions.interface";
import { applySavedCategorySteps } from "../utils/applySavedCategorySteps";
import { countConfigurationErrors } from "../utils/countConfigurationErrors";
import { resolveCategoryConfigureSaveStatus } from "../utils/resolveCategoryConfigureSaveStatus";
import { resolveInvalidSectionIds } from "../utils/resolveInvalidSectionIds";
import { saveCategoryConfiguration } from "../utils/saveCategoryConfiguration";
import { validateCategoryConfiguration } from "../utils/validateCategoryConfiguration";

export const useCategoryConfigureSave = ({
  categoryId,
  draft,
  fields,
}: UseCategoryConfigureSaveOptions): CategoryConfigureSaveViewModel => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const saveStatus = useSelector(
    (state: RootState) =>
      state[STORE_SLICES.CATEGORY_CONFIGURE].saveStatus
  );
  const invalidFieldCount = countConfigurationErrors({
    behavior: fields.behavior.errors,
    deposit: fields.deposit.errors,
    alerts: fields.alerts.errors,
  });

  const showErrors = (
    errors: CategoryConfigurationErrors
  ): void => {
    fields.behavior.showValidationErrors(errors.behavior);
    fields.deposit.showValidationErrors(errors.deposit);
    fields.alerts.showValidationErrors(errors.alerts);
    dispatch(
      categoryConfigureActions.openSections(
        resolveInvalidSectionIds(errors)
      )
    );
  };

  const isSavingRef = useRef(false);

  const onSave = async (): Promise<boolean> => {
    if (isSavingRef.current) {
      return false;
    }
    const { baseline, current } = draft;
    const validation = validateCategoryConfiguration(
      current.values
    );
    if (!validation.isValid) {
      showErrors(validation.errors);
      dispatch(
        categoryConfigureActions.setSaveStatus(
          CATEGORY_CONFIGURE_SAVE_STATUS.IDLE
        )
      );
      return false;
    }

    isSavingRef.current = true;
    dispatch(
      categoryConfigureActions.setSaveStatus(
        CATEGORY_CONFIGURE_SAVE_STATUS.SAVING
      )
    );
    try {
      const { steps } = await saveCategoryConfiguration({
        categoryId,
        baseline,
        current,
      });
      draft.onBaselineChange(
        applySavedCategorySteps({
          baseline,
          current,
          steps,
        })
      );
      const status =
        resolveCategoryConfigureSaveStatus(steps);
      dispatch(
        categoryConfigureActions.setSaveStatus(status)
      );
      if (
        Object.values(steps).some(
          (feedback) => feedback?.status === STATUS.SUCCESS
        )
      ) {
        router.refresh();
      }

      return (
        status === CATEGORY_CONFIGURE_SAVE_STATUS.SAVED
      );
    } finally {
      isSavingRef.current = false;
    }
  };

  return { saveStatus, invalidFieldCount, onSave };
};
