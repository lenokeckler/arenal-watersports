import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { buildFormSubmitEvent } from "@/app/utils/form-submit/tests/buildFormSubmitEvent";
import { useComboFormSubmit } from "../hooks/useComboFormSubmit";
import { useComboFormViewModel } from "../hooks/useComboFormViewModel";
import type { ComboFormSubmitOptions } from "../models/ComboFormSubmitOptions.interface";
import type { ComboFormViewProps } from "../models/ComboFormViewProps.interface";
import { buildComboFormFieldChangeEvent } from "./buildComboFormFieldChangeEvent";
import { CREATE_FORM_PROPS } from "./ComboForm.constants";

const hoisted = vi.hoisted(() => ({
  push: vi.fn(),
  refresh: vi.fn(),
  rethrow: vi.fn(),
  saveCombo: vi.fn(),
  showToast: vi.fn(),
}));

export const pushMock = hoisted.push;
export const refreshMock = hoisted.refresh;
export const rethrowMock = hoisted.rethrow;
export const saveComboMock = hoisted.saveCombo;
export const showToastMock = hoisted.showToast;

vi.mock("next/navigation", () => ({
  unstable_rethrow: hoisted.rethrow,
  useRouter: () => ({
    push: hoisted.push,
    refresh: hoisted.refresh,
  }),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: hoisted.showToast }),
}));

vi.mock("../services/saveComboAction", () => ({
  saveComboAction: hoisted.saveCombo,
}));

export const renderComboSubmit = (
  options: ComboFormSubmitOptions
) => renderHook(() => useComboFormSubmit(options));

export const renderComboViewModel = (
  props: ComboFormViewProps = CREATE_FORM_PROPS
) => renderHook(() => useComboFormViewModel(props));

export const submitComboForm = async (
  result:
    | ReturnType<typeof renderComboSubmit>["result"]
    | ReturnType<typeof renderComboViewModel>["result"]
): Promise<void> => {
  await act(async () => {
    await result.current.onSubmit(buildFormSubmitEvent());
  });
};

export const changeComboName = (
  result: ReturnType<typeof renderComboViewModel>["result"],
  value: string
): void => {
  act(() => {
    result.current.onNameChange(
      buildComboFormFieldChangeEvent({ value })
    );
  });
};
