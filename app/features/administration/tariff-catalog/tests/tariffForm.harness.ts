import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { buildFormSubmitEvent } from "@/app/utils/form-submit/tests/buildFormSubmitEvent";
import { useTariffFormSubmit } from "../hooks/useTariffFormSubmit";
import { useTariffFormViewModel } from "../hooks/useTariffFormViewModel";
import type { TariffFormSubmitOptions } from "../models/TariffFormSubmitOptions.interface";
import { EDIT_FORM_PROPS } from "./TariffForm.constants";

const hoisted = vi.hoisted(() => ({
  push: vi.fn(),
  refresh: vi.fn(),
  rethrow: vi.fn(),
  saveTariffs: vi.fn(),
  showToast: vi.fn(),
}));

export const pushMock = hoisted.push;
export const refreshMock = hoisted.refresh;
export const rethrowMock = hoisted.rethrow;
export const saveTariffsMock = hoisted.saveTariffs;
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

vi.mock("../services/saveTariffsAction", () => ({
  saveTariffsAction: hoisted.saveTariffs,
}));

export const renderTariffSubmit = (
  options: TariffFormSubmitOptions
) => renderHook(() => useTariffFormSubmit(options));

export const renderTariffViewModel = () =>
  renderHook(() => useTariffFormViewModel(EDIT_FORM_PROPS));

export const submitTariffForm = async (
  result:
    | ReturnType<typeof renderTariffSubmit>["result"]
    | ReturnType<typeof renderTariffViewModel>["result"]
): Promise<void> => {
  await act(async () => {
    await result.current.onSubmit(buildFormSubmitEvent());
  });
};
