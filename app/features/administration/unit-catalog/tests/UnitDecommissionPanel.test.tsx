import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { waitFor } from "@testing-library/react";
import { STATUS, STRING } from "@/app/constants";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_DECOMMISSION_COPY } from "../constants/UnitDecommissionCopy.constants";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import { FAKE_UNIT_ID } from "./Unit.constants";
import {
  EDIT_UNIT_FORM_VIEW_PROPS,
  EXPECTED_CATEGORY_UNITS_PATH,
  TYPED_DECOMMISSION_REASON as REASON,
} from "./UnitForm.constants";
import { renderUnitForm } from "./renderUnitForm";

const { REASON_LABEL } = UNIT_DECOMMISSION_COPY;
const { UNIT_OCCUPIED_ERROR, DECOMMISSION_SUCCESS_TOAST } =
  UNIT_CATALOG_COPY;

const mocks = vi.hoisted(() => ({
  decommission: vi.fn(),
  push: vi.fn(),
  showToast: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mocks.push, refresh: vi.fn() }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mocks.showToast }),
}));

vi.mock("../services/decommissionUnitAction", () => ({
  decommissionUnitAction: mocks.decommission,
}));

const openConfirmation = async () => {
  const page = renderUnitForm(EDIT_UNIT_FORM_VIEW_PROPS);
  await page.openDecommission();
  return page;
};

const confirmWithReason = async () => {
  const page = await openConfirmation();
  await page.fill([{ label: REASON_LABEL, text: REASON }]);
  await page.confirmDecommission();
  return page;
};

describe("Unit decommission panel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.decommission.mockResolvedValue({
      status: UNIT_MUTATION_STATUS.SUCCESS,
    });
  });

  it("requires a reason and does not call the action without one", async () => {
    const page = await openConfirmation();

    await page.confirmDecommission();

    expect(
      await page.findTextMatches(
        UNIT_FORM_ERROR_COPY.REASON_REQUIRED
      )
    ).toHaveLength(1);
    expect(mocks.decommission).not.toHaveBeenCalled();
  });

  it("decommissions the unit with the typed reason and goes to the units list", async () => {
    await confirmWithReason();

    await waitFor(() =>
      expect(mocks.push).toHaveBeenCalledWith(
        EXPECTED_CATEGORY_UNITS_PATH
      )
    );
    expect(mocks.decommission).toHaveBeenCalledWith({
      unitId: FAKE_UNIT_ID,
      reason: REASON,
    });
    expect(mocks.showToast).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      DECOMMISSION_SUCCESS_TOAST
    );
  });

  it("shows the occupied message in a toast and stays on the confirmation", async () => {
    mocks.decommission.mockResolvedValue({
      status: UNIT_MUTATION_STATUS.ERROR,
      message: UNIT_OCCUPIED_ERROR,
    });
    const page = await confirmWithReason();

    await waitFor(() =>
      expect(mocks.showToast).toHaveBeenCalledWith(
        STATUS.ERROR,
        UNIT_OCCUPIED_ERROR
      )
    );
    expect(mocks.push).not.toHaveBeenCalled();
    expect(page.getControl(REASON_LABEL)).toHaveValue(
      REASON
    );
  });

  it("closes the confirmation and clears the reason on cancel", async () => {
    const page = await confirmWithReason();

    await page.cancelDecommission();
    await page.openDecommission();

    expect(page.getControl(REASON_LABEL)).toHaveValue(
      STRING.Empty
    );
  });
});
