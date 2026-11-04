import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { waitFor } from "@testing-library/react";
import { STRING } from "@/app/constants";
import { UNIT_FORM_COPY } from "../constants/UnitFormCopy.constants";
import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import {
  buildCreateUnitInput,
  buildUpdateUnitInput,
} from "./Unit.constants";
import {
  CREATE_DEFAULT_FUEL_MAX,
  EDIT_UNIT_FORM_VIEW_PROPS,
  TYPED_CODE,
  TYPED_FUEL_LEVEL,
  TYPED_OIL,
  TYPED_USAGE,
} from "./UnitForm.constants";
import { SUCCESS_RESULT } from "./useUnitForm.constants";
import { renderUnitForm } from "./renderUnitForm";

const {
  CODE_LABEL,
  FUEL_LEVEL_LABEL,
  NEXT_OIL_CHANGE_LABEL,
  USAGE_HOURS_LABEL,
} = UNIT_FORM_COPY;

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  update: vi.fn(),
  push: vi.fn(),
  refresh: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mocks.push,
    refresh: mocks.refresh,
  }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/createUnitAction", () => ({
  createUnitAction: mocks.create,
}));

vi.mock("../services/updateUnitAction", () => ({
  updateUnitAction: mocks.update,
}));

const codeEntry = { label: CODE_LABEL, text: TYPED_CODE };
const withoutReadings = {
  code: TYPED_CODE,
  fuelMax: CREATE_DEFAULT_FUEL_MAX,
  fuelLevel: null,
  usageTotal: 0,
  nextOilChangeAt: null,
};

describe("UnitFormView submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.create.mockResolvedValue(SUCCESS_RESULT);
    mocks.update.mockResolvedValue(SUCCESS_RESULT);
  });

  it("creates the unit with the motor readings as numbers", async () => {
    const page = renderUnitForm();

    await page.fill([
      codeEntry,
      {
        label: FUEL_LEVEL_LABEL,
        text: `${TYPED_FUEL_LEVEL}`,
      },
      { label: USAGE_HOURS_LABEL, text: `${TYPED_USAGE}` },
      {
        label: NEXT_OIL_CHANGE_LABEL,
        text: `${TYPED_OIL}`,
      },
    ]);
    await page.submit();

    await waitFor(() =>
      expect(mocks.create).toHaveBeenCalledWith(
        buildCreateUnitInput({
          ...withoutReadings,
          fuelLevel: TYPED_FUEL_LEVEL,
          usageTotal: TYPED_USAGE,
          nextOilChangeAt: TYPED_OIL,
        })
      )
    );
    expect(mocks.update).not.toHaveBeenCalled();
  });

  it("updates the unit by id and refreshes instead of leaving after editing", async () => {
    const page = renderUnitForm(EDIT_UNIT_FORM_VIEW_PROPS);

    await page.fill([codeEntry]);
    await page.selectStatus(UNIT_STATUS.IN_REPAIR);
    await page.submit();

    await waitFor(() =>
      expect(mocks.update).toHaveBeenCalledWith(
        buildUpdateUnitInput({ code: TYPED_CODE })
      )
    );
    await waitFor(() =>
      expect(mocks.refresh).toHaveBeenCalledOnce()
    );
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it("sends null, not zero, when the fuel level is cleared", async () => {
    const page = renderUnitForm(EDIT_UNIT_FORM_VIEW_PROPS);

    await page.fill([
      { label: FUEL_LEVEL_LABEL, text: STRING.Empty },
    ]);
    await page.submit();

    await waitFor(() =>
      expect(mocks.update).toHaveBeenCalledWith(
        buildUpdateUnitInput({
          status: UNIT_STATUS.AVAILABLE,
          fuelLevel: null,
        })
      )
    );
  });
});
