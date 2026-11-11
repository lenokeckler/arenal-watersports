import { act, renderHook } from "@testing-library/react";
import { useUnitFormViewModel } from "../hooks/useUnitFormViewModel";
import type { UnitFormViewModelProps } from "../models/UnitFormViewModelProps.interface";
import { buildFormSubmitEvent } from "@/app/utils/form-submit/tests/buildFormSubmitEvent";
import { buildUnitCategory } from "./UnitList.constants";

export const renderUnitViewModel = (
  props: Omit<UnitFormViewModelProps, "category">
) =>
  renderHook(() =>
    useUnitFormViewModel({
      ...props,
      category: buildUnitCategory(),
    })
  );

export const submitUnitViewModel = async (
  result: ReturnType<typeof renderUnitViewModel>["result"]
): Promise<void> => {
  await act(async () => {
    await result.current.onSubmit(buildFormSubmitEvent());
  });
};
