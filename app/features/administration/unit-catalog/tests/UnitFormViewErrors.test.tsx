import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { waitFor } from "@testing-library/react";
import { STRING } from "@/app/constants";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_FORM_COPY as L } from "../constants/UnitFormCopy.constants";
import { UNIT_FORM_ERROR_COPY as E } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_FORM_LIMITS } from "../constants/UnitFormLimits.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import {
  EDIT_UNIT_FORM_VIEW_PROPS,
  EXPECTED_CATEGORY_UNITS_PATH,
  TYPED_CODE,
  TYPED_USAGE,
} from "./UnitForm.constants";
import { renderUnitForm } from "./renderUnitForm";

const DUPLICATE = UNIT_CATALOG_COPY.CODE_DUPLICATE_ERROR;

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  update: vi.fn(),
  push: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mocks.push, refresh: vi.fn() }),
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

const codeEntry = { label: L.CODE_LABEL, text: TYPED_CODE };
const usageEntry = {
  label: L.USAGE_HOURS_LABEL,
  text: `${TYPED_USAGE}`,
};
const longCode = "A".repeat(
  UNIT_FORM_LIMITS.CODE_MAX_LENGTH + 1
);

const VALIDATION_CASES = [
  ["no code", L.CODE_LABEL, STRING.Empty, E.CODE_REQUIRED],
  ["a code of 41", L.CODE_LABEL, longCode, E.CODE_TOO_LONG],
  ["0 bars", L.FUEL_MAX_LABEL, "0", E.FUEL_MAX_INVALID],
  ["21 bars", L.FUEL_MAX_LABEL, "21", E.FUEL_MAX_INVALID],
  [
    "fuel 9",
    L.FUEL_LEVEL_LABEL,
    "9",
    E.FUEL_LEVEL_ABOVE_MAX,
  ],
  [
    "usage -1",
    L.USAGE_HOURS_LABEL,
    "-1",
    E.DECIMAL_INVALID,
  ],
];

describe("UnitFormView errors", () => {
  beforeEach(() => vi.clearAllMocks());

  it.each(VALIDATION_CASES)(
    "shows the error of %s under that field and saves nothing",
    async (_name, label, text, errorText) => {
      const page = renderUnitForm();

      await page.fill([codeEntry, { label, text }]);
      await page.submit();

      expect(
        await page.findTextMatches(errorText)
      ).toHaveLength(1);
      expect(
        page.getControl(label)
      ).toHaveAccessibleDescription(
        expect.stringContaining(errorText)
      );
      expect(mocks.create).not.toHaveBeenCalled();
    }
  );

  it.each([
    ["create", {}, mocks.create],
    ["update", EDIT_UNIT_FORM_VIEW_PROPS, mocks.update],
  ])(
    "shows the duplicate code error under the code field on %s",
    async (_name, props, action) => {
      action.mockResolvedValue({
        status: UNIT_MUTATION_STATUS.ERROR,
        codeError: DUPLICATE,
      });
      const page = renderUnitForm(props);

      await page.fill([codeEntry, usageEntry]);
      await page.submit();

      await waitFor(() =>
        expect(
          page.getControl(L.CODE_LABEL)
        ).toHaveAccessibleDescription(
          expect.stringContaining(DUPLICATE)
        )
      );
    }
  );

  it("disables the fields and Cancelar while the unit is saving", async () => {
    mocks.create.mockReturnValue(
      new Promise(() => undefined)
    );
    const page = renderUnitForm();

    await page.fill([codeEntry, usageEntry]);
    await page.submit();

    expect(
      await page.findButton(L.LOADING_TEXT)
    ).toBeDisabled();
    expect(page.getControl(L.CODE_LABEL)).toBeDisabled();
    expect(page.getStatusSelect()).toBeDisabled();
    expect(page.getButton(L.CANCEL_BUTTON)).toBeDisabled();
  });

  it("goes back to the units list when cancelling", async () => {
    const page = renderUnitForm();

    await page.click(L.CANCEL_BUTTON);

    expect(mocks.push).toHaveBeenCalledWith(
      EXPECTED_CATEGORY_UNITS_PATH
    );
  });
});
