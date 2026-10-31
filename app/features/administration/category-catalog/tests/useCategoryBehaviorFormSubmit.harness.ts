import {
  act,
  renderHook,
  type RenderHookResult,
} from "@testing-library/react";
import { vi } from "vitest";
import { useCategoryBehaviorFormSubmit } from "../hooks/useCategoryBehaviorFormSubmit";
import type { CategoryBehaviorFormSubmitViewModel } from "../models/CategoryBehaviorFormSubmitViewModel.interface";
import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";
import { FAKE_UPDATE_CATEGORY_ID } from "./UpdateCategoryBehaviorInput.constants";

export const renderSubmit = (
  onValidationErrors: () => void,
  values: CategoryBehaviorFormValues = VALID_CATEGORY_BEHAVIOR_FORM_VALUES
) =>
  renderHook(() =>
    useCategoryBehaviorFormSubmit({
      categoryId: FAKE_UPDATE_CATEGORY_ID,
      values,
      onValidationErrors,
    })
  );

export const buildFormEvent = () => ({
  preventDefault: vi.fn(),
});

export const submitForm = async (
  result: RenderHookResult<
    CategoryBehaviorFormSubmitViewModel,
    unknown
  >["result"]
): Promise<ReturnType<typeof buildFormEvent>> => {
  const formEvent = buildFormEvent();

  await act(async () => {
    await result.current.onSubmit(
      formEvent as unknown as React.FormEvent
    );
  });

  return formEvent;
};
