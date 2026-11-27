import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { buildFormSubmitEvent } from "@/app/utils/form-submit/tests/buildFormSubmitEvent";
import { useExtraCompatibilityUnitsFormViewModel } from "../hooks/useExtraCompatibilityUnitsFormViewModel";
import type { ExtraCompatibilityUnits } from "../models/ExtraCompatibilityUnits.interface";
import { COMPATIBILITY_UNITS } from "./ExtraCompatibility.constants";

const hoisted = vi.hoisted(() => ({
  push: vi.fn(),
  refresh: vi.fn(),
  rethrow: vi.fn(),
  setCompatibility: vi.fn(),
  showToast: vi.fn(),
}));

export const pushMock = hoisted.push;
export const refreshMock = hoisted.refresh;
export const rethrowMock = hoisted.rethrow;
export const showToastMock = hoisted.showToast;
export const setCompatibilityMock =
  hoisted.setCompatibility;

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

vi.mock("../services/setExtraCompatibilityAction", () => ({
  setExtraCompatibilityAction: hoisted.setCompatibility,
}));

export const renderUnitsViewModel = (
  compatibility: ExtraCompatibilityUnits = COMPATIBILITY_UNITS
) =>
  renderHook(() =>
    useExtraCompatibilityUnitsFormViewModel(compatibility)
  );

export const submitUnitsViewModel = async (
  result: ReturnType<typeof renderUnitsViewModel>["result"]
): Promise<void> => {
  await act(async () => {
    await result.current.onSubmit(buildFormSubmitEvent());
  });
};

export const toggleUnit = (
  result: ReturnType<typeof renderUnitsViewModel>["result"],
  unitId: string
): void => {
  act(() => {
    result.current.onToggleUnit(unitId);
  });
};
