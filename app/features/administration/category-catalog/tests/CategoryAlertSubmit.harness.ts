import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useCategoryAlertFormSubmit } from "../hooks/useCategoryAlertFormSubmit";
import type { CategoryAlertFormErrors } from "../models/CategoryAlertFormErrors.interface";
import type { CategoryAlertFormValues } from "../models/CategoryAlertFormValues.interface";
import { buildCategoryFormSubmitEvent } from "./buildCategoryFormSubmitEvent";
import {
  buildCategoryAlertFormValues,
  CATEGORY_ALERT_ID,
} from "./CategoryAlerts.constants";

export const renderCategoryAlertSubmit = (
  values: CategoryAlertFormValues = buildCategoryAlertFormValues(),
  onValidationErrors: (
    errors: CategoryAlertFormErrors
  ) => void = vi.fn()
) =>
  renderHook(() =>
    useCategoryAlertFormSubmit({
      categoryId: CATEGORY_ALERT_ID,
      values,
      onValidationErrors,
    })
  );

export const submitCategoryAlertForm = async (
  result: ReturnType<
    typeof renderCategoryAlertSubmit
  >["result"]
): Promise<ReturnType<typeof vi.fn>> => {
  const preventDefault = vi.fn();

  await act(async () => {
    await result.current.onSubmit(
      buildCategoryFormSubmitEvent(preventDefault)
    );
  });

  return preventDefault;
};
