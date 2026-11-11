import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { revalidatePath } from "next/cache";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { cancelReservationAction } from "../actions/cancelReservationAction";
import { RESERVATION_CANCELLATION_ERROR } from "../constants/ReservationCancellationError.constants";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as COPY } from "../constants/ReservationCancellationFeedbackCopy.constants";
import { cancelReservation } from "../services/cancelReservation";
import { VALID_CANCELLATION_INPUT } from "./ReservationCancellation.constants";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/cancelReservation", () => ({
  cancelReservation: vi.fn(),
}));

describe("cancelReservationAction cause", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("refuses an unknown cause before checking access", async () => {
    await expect(
      cancelReservationAction({
        ...VALID_CANCELLATION_INPUT,
        cause: "fire",
      })
    ).resolves.toEqual({
      ok: false,
      errors: {},
      formError: COPY.SUBMIT_ERROR,
    });
    expect(
      assertReservationCalendarAccess
    ).not.toHaveBeenCalled();
    expect(cancelReservation).not.toHaveBeenCalled();
  });

  it("asks for the cause on its field when the database requires it", async () => {
    vi.mocked(cancelReservation).mockRejectedValue(
      new Error(
        RESERVATION_CANCELLATION_ERROR.MESSAGE
          .CAUSE_REQUIRED
      )
    );

    await expect(
      cancelReservationAction(VALID_CANCELLATION_INPUT)
    ).resolves.toEqual({
      ok: false,
      errors: { cause: COPY.CAUSE_REQUIRED },
      formError: undefined,
    });
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
