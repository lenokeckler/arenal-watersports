import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { buildFormSubmitEvent } from "@/app/utils/form-submit/tests/buildFormSubmitEvent";
import { useExtraFormSubmit } from "../hooks/useExtraFormSubmit";
import { useExtraFormViewModel } from "../hooks/useExtraFormViewModel";
import type { ExtraFormViewModelProps } from "../models/ExtraFormViewModelProps.type";
import { buildExtraFormFieldChangeEvent } from "./buildExtraFormFieldChangeEvent";
import {
  buildExtraFormSubmitOptions,
  CREATE_FORM_PROPS,
} from "./ExtraForm.constants";
import type { ExtraFormSubmitOverrides } from "./models/ExtraFormSubmitOverrides.interface";

const hoisted = vi.hoisted(() => ({
  createExtra: vi.fn(),
  push: vi.fn(),
  refresh: vi.fn(),
  rethrow: vi.fn(),
  showToast: vi.fn(),
  updateExtra: vi.fn(),
}));

export const pushMock = hoisted.push;
export const refreshMock = hoisted.refresh;
export const rethrowMock = hoisted.rethrow;
export const showToastMock = hoisted.showToast;
export const createExtraMock = hoisted.createExtra;
export const updateExtraMock = hoisted.updateExtra;

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

vi.mock("../services/createExtraAction", () => ({
  createExtraAction: hoisted.createExtra,
}));

vi.mock("../services/updateExtraAction", () => ({
  updateExtraAction: hoisted.updateExtra,
}));

export const renderExtraSubmit = (
  overrides: ExtraFormSubmitOverrides = {},
  props: ExtraFormViewModelProps = CREATE_FORM_PROPS
) =>
  renderHook(() =>
    useExtraFormSubmit(
      buildExtraFormSubmitOptions(overrides, props)
    )
  );

export const renderExtraViewModel = (
  props: ExtraFormViewModelProps
) => renderHook(() => useExtraFormViewModel(props));

export const submitExtraFormEvent = async (
  result: ReturnType<typeof renderExtraSubmit>["result"]
): Promise<void> => {
  await act(async () => {
    await result.current.onSubmit(buildFormSubmitEvent());
  });
};

export const changeExtraName = (
  result: ReturnType<typeof renderExtraViewModel>["result"],
  value: string
): void => {
  act(() => {
    result.current.onNameChange(
      buildExtraFormFieldChangeEvent({ value })
    );
  });
};

export const submitExtraViewModel = async (
  result: ReturnType<typeof renderExtraViewModel>["result"]
): Promise<void> => {
  await act(async () => {
    await result.current.onSubmit(buildFormSubmitEvent());
  });
};
