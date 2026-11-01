import { act, renderHook } from "@testing-library/react";
import { useCategoryDepositFormViewModel } from "../hooks/useCategoryDepositFormViewModel";
import { buildCategoryFormSubmitEvent } from "./buildCategoryFormSubmitEvent";
import { DEFAULT_CATEGORY_DEPOSIT } from "./CategoryDepositFormValues.constants";

export const renderCategoryDepositViewModel = () =>
  renderHook(() =>
    useCategoryDepositFormViewModel({
      deposit: DEFAULT_CATEGORY_DEPOSIT,
    })
  );

export const submitCategoryDepositViewModel = async (
  result: ReturnType<
    typeof renderCategoryDepositViewModel
  >["result"]
): Promise<void> => {
  await act(async () => {
    await result.current.onSubmit(
      buildCategoryFormSubmitEvent()
    );
  });
};
