import { describe, expect, it, vi } from "vitest";
import { UNIT_FORM_COPY } from "../constants/UnitFormCopy.constants";
import { renderUnitForm } from "./renderUnitForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

describe("Unit form required marks", () => {
  it("marks only the code and the gauge bars as required", () => {
    const page = renderUnitForm();

    expect(page.getRequiredFieldLabels()).toEqual([
      UNIT_FORM_COPY.CODE_LABEL,
      UNIT_FORM_COPY.FUEL_MAX_LABEL,
    ]);
  });
});
