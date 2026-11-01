import { act, renderHook } from "@testing-library/react";
import { useCategoryAlertFormViewModel } from "../hooks/useCategoryAlertFormViewModel";
import { buildCategoryFormSubmitEvent } from "./buildCategoryFormSubmitEvent";
import { DEFAULT_CATEGORY_ALERTS } from "./CategoryAlerts.constants";

export const renderCategoryAlertViewModel = () =>
  renderHook(() =>
    useCategoryAlertFormViewModel({
      alerts: DEFAULT_CATEGORY_ALERTS,
    })
  );

export const submitCategoryAlertViewModel = async (
  result: ReturnType<
    typeof renderCategoryAlertViewModel
  >["result"]
): Promise<void> => {
  await act(async () => {
    await result.current.onSubmit(
      buildCategoryFormSubmitEvent()
    );
  });
};
