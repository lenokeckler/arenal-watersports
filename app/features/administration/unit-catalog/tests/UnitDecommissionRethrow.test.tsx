import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { waitFor } from "@testing-library/react";
import { UNIT_DECOMMISSION_COPY } from "../constants/UnitDecommissionCopy.constants";
import {
  EDIT_UNIT_FORM_VIEW_PROPS,
  TYPED_DECOMMISSION_REASON,
} from "./UnitForm.constants";
import { renderUnitForm } from "./renderUnitForm";

const mocks = vi.hoisted(() => ({
  decommission: vi.fn(),
  rethrow: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  unstable_rethrow: mocks.rethrow,
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/decommissionUnitAction", () => ({
  decommissionUnitAction: mocks.decommission,
}));

describe("Unit decommission control flow", () => {
  beforeEach(() => vi.clearAllMocks());

  it("passes a thrown action error through unstable_rethrow before any toast", async () => {
    const failure = new Error("fake-control-flow-signal");
    mocks.decommission.mockRejectedValue(failure);
    const page = renderUnitForm(EDIT_UNIT_FORM_VIEW_PROPS);

    await page.openDecommission();
    await page.fill([
      {
        label: UNIT_DECOMMISSION_COPY.REASON_LABEL,
        text: TYPED_DECOMMISSION_REASON,
      },
    ]);
    await page.confirmDecommission();

    await waitFor(() =>
      expect(mocks.rethrow).toHaveBeenCalledWith(failure)
    );
  });
});
