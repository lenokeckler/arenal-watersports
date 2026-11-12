import { describe, expect, it, vi } from "vitest";
import { UNIT_FORM_MODE } from "../constants/UnitFormMode.constants";
import { DEFAULT_UNIT } from "./Unit.constants";
import { renderUnitViewModel } from "./UnitViewModel.harness";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/createUnitAction", () => ({
  createUnitAction: vi.fn(),
}));

vi.mock("../services/updateUnitAction", () => ({
  updateUnitAction: vi.fn(),
}));

describe("useUnitFormViewModel status lock", () => {
  it.each([
    { isOccupied: true, expected: true },
    { isOccupied: false, expected: false },
  ])(
    "locks the status only while the unit is occupied ($isOccupied)",
    ({ isOccupied, expected }) => {
      const { result } = renderUnitViewModel({
        mode: UNIT_FORM_MODE.EDIT,
        unit: { ...DEFAULT_UNIT, isOccupied },
      });

      expect(result.current.isStatusLocked).toBe(expected);
    }
  );

  it("never locks the status of a new unit", () => {
    const { result } = renderUnitViewModel({
      mode: UNIT_FORM_MODE.CREATE,
    });

    expect(result.current.isStatusLocked).toBe(false);
  });
});
