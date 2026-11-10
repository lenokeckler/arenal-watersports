import { act, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_EDIT_COPY } from "../constants/ReservationEditCopy.constants";
import { RESERVATION_EQUIPMENT_LOCK } from "../constants/ReservationEquipmentLock.constants";
import {
  RESERVATION_EDIT,
  RESERVATION_EDIT_TEST,
} from "./ReservationEdit.constants";
import {
  availabilityAction,
  renderEditViewModel,
  submitEditViewModel,
  updateAction,
} from "./ReservationEditViewModel.testHarness";

const MOVED_TIME = "14:00";
const NEXT_TOKEN = "2035-04-12T16:00:00.654321+00:00";
const LOCKED_RESERVATION = {
  ...RESERVATION_EDIT,
  equipmentLock: RESERVATION_EQUIPMENT_LOCK.COMBO,
};
const UNIT_FAILURE = {
  errors: {},
  formError: RESERVATION_EDIT_COPY.UNIT_UNAVAILABLE,
  ok: false,
  unitUnavailable: true,
} as const;

describe("useReservationEditViewModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(availabilityAction).mockResolvedValue({
      availableQuantity: null,
      availableUnits: [],
    });
    vi.mocked(updateAction).mockResolvedValue({
      ok: true,
      reservationId: RESERVATION_EDIT.id,
    });
  });

  it("keeps the current equipment when the catalog dropped its category", async () => {
    const { result } = renderEditViewModel();

    await waitFor(() =>
      expect(result.current.isAvailabilityLoading).toBe(
        false
      )
    );

    expect(result.current.values.unitId).toBe(
      RESERVATION_EDIT_TEST.UNIT_ID
    );
    expect(availabilityAction).toHaveBeenCalledWith(
      expect.objectContaining({
        excludeReservationId: RESERVATION_EDIT.id,
      })
    );
  });

  it("drops the unit when the window moves and brings it back", async () => {
    const { result } = renderEditViewModel();

    act(() => result.current.handleTimeChange(MOVED_TIME));
    await waitFor(() =>
      expect(result.current.values.unitId).toBe("")
    );
    act(() =>
      result.current.handleTimeChange(RESERVATION_EDIT.time)
    );

    expect(result.current.values.unitId).toBe(
      RESERVATION_EDIT_TEST.UNIT_ID
    );
  });

  it("lets a people change save while availability fails", async () => {
    vi.mocked(availabilityAction).mockRejectedValue(
      new Error("offline")
    );
    const { result } = renderEditViewModel();

    await waitFor(() =>
      expect(result.current.hasAvailabilityError).toBe(true)
    );

    expect(result.current.isSubmitDisabled).toBe(false);
  });

  it("sends the token of the latest reservation prop", async () => {
    const { rerender, result } = renderEditViewModel();

    rerender({
      categories: [],
      reservation: {
        ...RESERVATION_EDIT,
        lastEditedAt: NEXT_TOKEN,
      },
    });
    await submitEditViewModel(result.current);

    expect(updateAction).toHaveBeenCalledWith(
      expect.objectContaining({
        expectedUpdatedAt: NEXT_TOKEN,
        reservationId: RESERVATION_EDIT.id,
      })
    );
  });

  it.each([
    [RESERVATION_EDIT, ""],
    [LOCKED_RESERVATION, RESERVATION_EDIT_TEST.UNIT_ID],
  ])(
    "shows a unit failure at form level (%#)",
    async (reservation, expectedUnitId) => {
      vi.mocked(updateAction).mockResolvedValue(
        UNIT_FAILURE
      );
      const { result } = renderEditViewModel(reservation);

      await submitEditViewModel(result.current);

      expect(result.current.formError).toBe(
        RESERVATION_EDIT_COPY.UNIT_UNAVAILABLE
      );
      expect(result.current.values.unitId).toBe(
        expectedUnitId
      );
    }
  );

  it("blocks another save after a stale refusal", async () => {
    vi.mocked(updateAction).mockResolvedValue({
      errors: {},
      formError: RESERVATION_EDIT_COPY.STALE,
      ok: false,
    });
    const { result } = renderEditViewModel();

    await submitEditViewModel(result.current);

    expect(result.current.isSubmitDisabled).toBe(true);
  });
});
