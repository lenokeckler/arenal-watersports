import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { cancelReservationAction } from "../actions/cancelReservationAction";
import { RESERVATION_CANCELLATION_ERROR } from "../constants/ReservationCancellationError.constants";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as COPY } from "../constants/ReservationCancellationFeedbackCopy.constants";
import { cancelReservation } from "../services/cancelReservation";
import {
  CANCELLATION_ACCESS_REDIRECT,
  CANCELLATION_RESERVATION_ID,
  CANCELLATION_UNEXPECTED_ERROR,
  VALID_CANCELLATION_INPUT,
} from "./ReservationCancellation.constants";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/cancelReservation", () => ({
  cancelReservation: vi.fn(),
}));

describe("cancelReservationAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("cancels and revalidates only the calendar", async () => {
    vi.mocked(cancelReservation).mockResolvedValue(
      CANCELLATION_RESERVATION_ID
    );

    await expect(
      cancelReservationAction(VALID_CANCELLATION_INPUT)
    ).resolves.toEqual({
      ok: true,
      reservationId: CANCELLATION_RESERVATION_ID,
    });
    expect(revalidatePath).toHaveBeenCalledTimes(1);
    expect(revalidatePath).toHaveBeenCalledWith(
      PATHS.RESERVATIONS.CALENDAR
    );
  });

  it("refuses a malformed input before checking access", async () => {
    await expect(
      cancelReservationAction({})
    ).resolves.toEqual({
      ok: false,
      errors: {},
      formError: COPY.SUBMIT_ERROR,
    });
    expect(
      assertReservationCalendarAccess
    ).not.toHaveBeenCalled();
  });

  it("asks for the reason without calling the service", async () => {
    await expect(
      cancelReservationAction({
        ...VALID_CANCELLATION_INPUT,
        reason: "  ",
      })
    ).resolves.toEqual({
      ok: false,
      errors: { reason: COPY.REASON_REQUIRED },
    });
    expect(cancelReservation).not.toHaveBeenCalled();
  });

  it("maps a database refusal without revalidating", async () => {
    vi.mocked(cancelReservation).mockRejectedValue(
      new Error(
        RESERVATION_CANCELLATION_ERROR.MESSAGE
          .NOT_CANCELLABLE
      )
    );

    await expect(
      cancelReservationAction(VALID_CANCELLATION_INPUT)
    ).resolves.toEqual({
      ok: false,
      errors: {},
      formError: COPY.NOT_CANCELLABLE,
    });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("rethrows an unexpected failure for server logging", async () => {
    vi.mocked(cancelReservation).mockRejectedValue(
      CANCELLATION_UNEXPECTED_ERROR
    );

    await expect(
      cancelReservationAction(VALID_CANCELLATION_INPUT)
    ).rejects.toBe(CANCELLATION_UNEXPECTED_ERROR);
  });

  it("lets an access redirect through without cancelling", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(CANCELLATION_ACCESS_REDIRECT);

    await expect(
      cancelReservationAction(VALID_CANCELLATION_INPUT)
    ).rejects.toBe(CANCELLATION_ACCESS_REDIRECT);
    expect(cancelReservation).not.toHaveBeenCalled();
  });
});
