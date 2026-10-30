import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useCategoryDepositFormSubmit } from "../hooks/useCategoryDepositFormSubmit";
import type { CategoryDepositFormErrors } from "../models/CategoryDepositFormErrors.interface";
import type { CategoryDepositFormValues } from "../models/CategoryDepositFormValues.interface";
import { buildCategoryFormSubmitEvent } from "./buildCategoryFormSubmitEvent";
import {
  buildCategoryDepositFormValues,
  CATEGORY_DEPOSIT_ID,
} from "./CategoryDepositFormValues.constants";

export const renderCategoryDepositSubmit = (
  values: CategoryDepositFormValues = buildCategoryDepositFormValues(),
  onValidationErrors: (
    errors: CategoryDepositFormErrors
  ) => void = vi.fn()
) =>
  renderHook(() =>
    useCategoryDepositFormSubmit({
      categoryId: CATEGORY_DEPOSIT_ID,
      values,
      onValidationErrors,
    })
  );

export const submitCategoryDepositForm = async (
  result: ReturnType<
    typeof renderCategoryDepositSubmit
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
