import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_EDIT_COPY } from "../constants/ReservationEditCopy.constants";
import { RESERVATION_EQUIPMENT_LOCK as lock } from "../constants/ReservationEquipmentLock.constants";
import {
  RESERVATION_EDIT,
  RESERVATION_EDIT_LONG_DATE,
  RESERVATION_EDIT_TEST,
} from "./ReservationEdit.constants";
import {
  renderReservationEdit,
  updateAction,
} from "./ReservationEdit.fixture";

describe("ReservationEditView", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows name and date as a summary, not as inputs", () => {
    const page = renderReservationEdit();

    expect(
      page.getSummaryValue(RESERVATION_EDIT.customerName)
    ).toBeInTheDocument();
    expect(
      page.getSummaryValue(RESERVATION_EDIT_LONG_DATE)
    ).toBeInTheDocument();
    expect(page.queryCustomerNameInput()).toBeNull();
    expect(page.queryDateInput()).toBeNull();
  });

  it("shows the last editor as one sentence", () => {
    const page = renderReservationEdit();

    expect(
      page.getSummaryValue(RESERVATION_EDIT.lastEditLabel)
    ).toBeInTheDocument();
  });

  it("uses the edit copy", () => {
    const page = renderReservationEdit();

    expect(page.getHeading()).toBeInTheDocument();
    expect(page.getSubmitButton()).toBeInTheDocument();
  });

  it("keeps the equipment controls of a single unlocked item", () => {
    const page = renderReservationEdit();

    expect(
      page.queryEquipmentControls()
    ).toBeInTheDocument();
  });

  it.each([
    [lock.COMBO, RESERVATION_EDIT_COPY.COMBO_LOCKED],
    [
      lock.MULTIPLE_ITEMS,
      RESERVATION_EDIT_COPY.MULTIPLE_ITEMS_LOCKED,
    ],
  ])(
    "shows %s equipment read-only with its reason",
    (equipmentLock, notice) => {
      const page = renderReservationEdit({
        ...RESERVATION_EDIT,
        equipmentLabels: [
          RESERVATION_EDIT_TEST.UNIT_LABEL,
          RESERVATION_EDIT_TEST.CATEGORY_LABEL,
        ],
        equipmentLock,
      });

      expect(page.getLockedEquipment()).toHaveTextContent(
        RESERVATION_EDIT_TEST.CATEGORY_LABEL
      );
      expect(page.getLockNotice(notice)).toBeVisible();
      expect(page.queryEquipmentControls()).toBeNull();
    }
  );

  it("keeps the form on screen after a successful save", async () => {
    vi.mocked(updateAction).mockResolvedValue({
      ok: true,
      reservationId: RESERVATION_EDIT.id,
    });
    const page = renderReservationEdit();

    await page.submit();

    expect(
      await page.findSuccessMessage()
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(page.getSubmitButton()).toBeDisabled()
    );
  });

  it("shows the stale refusal", async () => {
    vi.mocked(updateAction).mockResolvedValue({
      errors: {},
      formError: RESERVATION_EDIT_COPY.STALE,
      ok: false,
    });
    const page = renderReservationEdit();

    await page.submit();

    expect(
      await page.findFormError(RESERVATION_EDIT_COPY.STALE)
    ).toBeInTheDocument();
  });
});
