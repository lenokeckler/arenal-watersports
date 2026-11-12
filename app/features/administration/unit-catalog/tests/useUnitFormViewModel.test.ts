import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STRING } from "@/app/constants";
import { UNIT_FORM_LIMITS } from "../constants/UnitFormLimits.constants";
import { UNIT_FORM_MODE } from "../constants/UnitFormMode.constants";
import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import type { CreateUnitInput } from "../models/CreateUnitInput.interface";
import type { UpdateUnitInput } from "../models/UpdateUnitInput.interface";
import { resolveCategoryUnitsPath } from "../utils/resolveUnitPaths";
import { buildUnitFormFieldChangeEvent } from "./buildUnitFormFieldChangeEvent";
import {
  buildUpdateUnitInput,
  DEFAULT_UNIT,
  DEFAULT_UNIT_FORM_VALUES,
  FAKE_CATEGORY_ID,
} from "./Unit.constants";
import {
  renderUnitViewModel,
  submitUnitViewModel,
} from "./UnitViewModel.harness";
import {
  EDITED_CODE,
  SUCCESS_RESULT,
} from "./useUnitForm.constants";

const mockPush = vi.fn();
const mockCreateUnitAction = vi.fn();
const mockUpdateUnitAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: vi.fn() }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/createUnitAction", () => ({
  createUnitAction: (input: CreateUnitInput) =>
    mockCreateUnitAction(input),
}));

vi.mock("../services/updateUnitAction", () => ({
  updateUnitAction: (input: UpdateUnitInput) =>
    mockUpdateUnitAction(input),
}));

describe("useUnitFormViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockUpdateUnitAction.mockResolvedValue(SUCCESS_RESULT);
  });

  it.each([
    {
      mode: UNIT_FORM_MODE.CREATE,
      unit: undefined,
      values: {
        code: STRING.Empty,
        status: UNIT_STATUS.AVAILABLE,
        fuelMax:
          UNIT_FORM_LIMITS.FUEL_MAX_DEFAULT.toString(),
        fuelLevel: STRING.Empty,
        usageTotal: STRING.Empty,
        nextOilChangeAt: STRING.Empty,
      },
    },
    {
      mode: UNIT_FORM_MODE.EDIT,
      unit: DEFAULT_UNIT,
      values: DEFAULT_UNIT_FORM_VALUES,
    },
  ])(
    "seeds the $mode form with an idle state",
    ({ mode, unit, values }) => {
      const { result } = renderUnitViewModel({
        mode,
        unit,
      });

      expect(result.current.values).toStrictEqual(values);
      expect(result.current.errors).toStrictEqual({});
      expect(result.current.isSubmitting).toBe(false);
    }
  );

  it("shows the code error on submit without calling the server", async () => {
    const { result } = renderUnitViewModel({
      mode: UNIT_FORM_MODE.CREATE,
    });

    await submitUnitViewModel(result);

    expect(result.current.errors.code).toBeDefined();
    expect(mockCreateUnitAction).not.toHaveBeenCalled();
  });

  it("submits the edited code with the unit id", async () => {
    const { result } = renderUnitViewModel({
      mode: UNIT_FORM_MODE.EDIT,
      unit: DEFAULT_UNIT,
    });
    act(() => {
      result.current.onCodeChange(
        buildUnitFormFieldChangeEvent({
          value: EDITED_CODE,
        })
      );
    });

    await submitUnitViewModel(result);

    expect(mockUpdateUnitAction).toHaveBeenCalledWith(
      buildUpdateUnitInput({
        code: EDITED_CODE,
        status: UNIT_STATUS.AVAILABLE,
      })
    );
  });

  it("goes back to the units of the category", () => {
    const { result } = renderUnitViewModel({
      mode: UNIT_FORM_MODE.CREATE,
    });

    act(() => {
      result.current.onBack();
    });

    expect(mockPush).toHaveBeenCalledWith(
      resolveCategoryUnitsPath(FAKE_CATEGORY_ID)
    );
  });
});
