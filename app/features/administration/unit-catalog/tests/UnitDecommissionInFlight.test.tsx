import { describe, expect, it, vi } from "vitest";
import { UNIT_DECOMMISSION_COPY } from "../constants/UnitDecommissionCopy.constants";
import {
  EDIT_UNIT_FORM_VIEW_PROPS,
  TYPED_DECOMMISSION_REASON,
} from "./UnitForm.constants";
import { renderUnitForm } from "./renderUnitForm";

const { REASON_LABEL, LOADING_TEXT } =
  UNIT_DECOMMISSION_COPY;

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/decommissionUnitAction", () => ({
  decommissionUnitAction: () =>
    new Promise(() => undefined),
}));

describe("Unit decommission in flight", () => {
  it("disables the reason, Cancelar and the confirm button while decommissioning", async () => {
    const page = renderUnitForm(EDIT_UNIT_FORM_VIEW_PROPS);

    await page.openDecommission();
    await page.fill([
      {
        label: REASON_LABEL,
        text: TYPED_DECOMMISSION_REASON,
      },
    ]);
    await page.confirmDecommission();

    expect(
      await page.findButton(LOADING_TEXT)
    ).toBeDisabled();
    expect(page.getControl(REASON_LABEL)).toBeDisabled();
    expect(page.getDecommissionCancel()).toBeDisabled();
  });
});
