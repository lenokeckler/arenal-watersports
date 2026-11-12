import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { UNIT_FORM_MODE } from "../constants/UnitFormMode.constants";
import { useUnitFormSubmit } from "../hooks/useUnitFormSubmit";
import type { UnitFormSubmitOptions } from "../models/UnitFormSubmitOptions.interface";
import { buildFormSubmitEvent } from "@/app/utils/form-submit/tests/buildFormSubmitEvent";
import {
  buildUnitFormValues,
  FAKE_CATEGORY_ID,
  FAKE_UNIT_ID,
} from "./Unit.constants";

export const buildUnitSubmitOptions = (
  overrides: Partial<UnitFormSubmitOptions> = {}
): UnitFormSubmitOptions => ({
  mode: UNIT_FORM_MODE.CREATE,
  categoryId: FAKE_CATEGORY_ID,
  unitId: FAKE_UNIT_ID,
  hasMotor: true,
  values: buildUnitFormValues(),
  onValidationErrors: vi.fn(),
  setCodeError: vi.fn(),
  ...overrides,
});

export const renderUnitSubmit = (
  overrides: Partial<UnitFormSubmitOptions> = {}
) => {
  const options = buildUnitSubmitOptions(overrides);
  return renderHook(() => useUnitFormSubmit(options));
};

export const submitUnitFormEvent = async (
  result: ReturnType<typeof renderUnitSubmit>["result"]
): Promise<ReturnType<typeof vi.fn>> => {
  const preventDefault = vi.fn();

  await act(async () => {
    await result.current.onSubmit(
      buildFormSubmitEvent(preventDefault)
    );
  });

  return preventDefault;
};
