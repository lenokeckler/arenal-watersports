import { describe, expect, it, vi } from "vitest";
import { UNIT_FORM_COPY } from "../constants/UnitFormCopy.constants";
import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import { DEFAULT_UNIT_FORM_VALUES as STORED } from "./Unit.constants";
import {
  BASE_FIELD_LABELS,
  CREATE_DEFAULT_FUEL_MAX,
  EDIT_UNIT_FORM_VIEW_PROPS,
  motorFieldLabels,
  MOTORLESS_UNIT_CATEGORY,
  STATUS_OPTION_LABELS,
} from "./UnitForm.constants";
import { renderUnitForm } from "./renderUnitForm";

const {
  CODE_LABEL,
  FUEL_LEVEL_LABEL,
  FUEL_MAX_LABEL,
  NEXT_OIL_CHANGE_LABEL,
  USAGE_HOURS_LABEL,
} = UNIT_FORM_COPY;

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

const PREFILLED_FIELDS = [
  [CODE_LABEL, STORED.code],
  [FUEL_MAX_LABEL, STORED.fuelMax],
  [FUEL_LEVEL_LABEL, STORED.fuelLevel],
  [USAGE_HOURS_LABEL, STORED.usageTotal],
  [NEXT_OIL_CHANGE_LABEL, STORED.nextOilChangeAt],
];

describe("UnitFormView", () => {
  it("renders the labelled fields in order", () => {
    const page = renderUnitForm();

    expect(page.getFieldLabels()).toEqual([
      ...BASE_FIELD_LABELS,
      ...motorFieldLabels(USAGE_HOURS_LABEL),
    ]);
  });

  it("offers the four editable statuses and never decommissioned", () => {
    const page = renderUnitForm();

    expect(page.getStatusOptionLabels()).toEqual(
      STATUS_OPTION_LABELS
    );
  });

  it("starts a new unit available with the default gauge bars", () => {
    const page = renderUnitForm();

    expect(page.getStatusSelect()).toHaveValue(
      UNIT_STATUS.AVAILABLE
    );
    expect(page.getControl(FUEL_MAX_LABEL)).toHaveValue(
      `${CREATE_DEFAULT_FUEL_MAX}`
    );
  });

  it("hides every motor field for a category without motor", () => {
    const page = renderUnitForm({
      category: MOTORLESS_UNIT_CATEGORY,
    });

    expect(page.getFieldLabels()).toEqual(
      BASE_FIELD_LABELS
    );
  });

  it("prefills the edit form with the stored unit", () => {
    const page = renderUnitForm(EDIT_UNIT_FORM_VIEW_PROPS);

    PREFILLED_FIELDS.forEach(([label, value]) => {
      expect(page.getControl(label)).toHaveValue(value);
    });
  });
});
