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
import { recordReservationExtraTimeAction } from "../actions/recordReservationExtraTimeAction";
import { RESERVATION_EXTRA_TIME_ERROR } from "../constants/ReservationExtraTimeError.constants";
import { RESERVATION_EXTRA_TIME_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationExtraTimeFeedbackCopy.constants";
import { RESERVATION_EXTRA_TIME_OUTCOME as OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import { RESERVATION_EXTRA_TIME_VALIDATION_COPY as VALIDATION } from "../constants/ReservationExtraTimeValidationCopy.constants";
import { recordReservationExtraTime } from "../services/recordReservationExtraTime";
import {
  EXTRA_TIME_CHARGED_INPUT,
  EXTRA_TIME_COURTESY_INPUT,
  EXTRA_TIME_RESERVATION_ID,
} from "./ReservationExtraTime.constants";
import { EXTRA_TIME_CHARGED_RECORDED } from "./ReservationExtraTimeData.constants";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/recordReservationExtraTime", () => ({
  recordReservationExtraTime: vi.fn(),
}));

describe("recordReservationExtraTimeAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("records a charge and revalidates the detail and the income", async () => {
    vi.mocked(recordReservationExtraTime).mockResolvedValue(
      EXTRA_TIME_CHARGED_RECORDED
    );

    await expect(
      recordReservationExtraTimeAction(
        EXTRA_TIME_CHARGED_INPUT
      )
    ).resolves.toEqual({
      ok: true,
      recorded: EXTRA_TIME_CHARGED_RECORDED,
    });
    expect(
      assertReservationCalendarAccess
    ).toHaveBeenCalledOnce();
    expect(revalidatePath).toHaveBeenCalledWith(
      PATHS.RESERVATIONS.DETAIL(EXTRA_TIME_RESERVATION_ID)
    );
    expect(revalidatePath).toHaveBeenCalledWith(
      PATHS.RESERVATIONS.INCOME
    );
  });

  it("records a courtesy without a charge", async () => {
    vi.mocked(recordReservationExtraTime).mockResolvedValue(
      {
        ...EXTRA_TIME_CHARGED_RECORDED,
        charge: null,
        outcome: OUTCOME.COURTESY,
      }
    );

    await recordReservationExtraTimeAction(
      EXTRA_TIME_COURTESY_INPUT
    );

    expect(recordReservationExtraTime).toHaveBeenCalledWith(
      {
        charge: null,
        outcome: OUTCOME.COURTESY,
        reservationId: EXTRA_TIME_RESERVATION_ID,
      }
    );
  });

  it("refuses a malformed input before checking access", async () => {
    await expect(
      recordReservationExtraTimeAction({})
    ).resolves.toEqual({
      errors: {},
      formError: FEEDBACK.REQUEST_REJECTED,
      ok: false,
    });
    expect(
      assertReservationCalendarAccess
    ).not.toHaveBeenCalled();
  });

  it("returns the field errors without calling the database", async () => {
    await expect(
      recordReservationExtraTimeAction({
        ...EXTRA_TIME_CHARGED_INPUT,
        outcome: null,
      })
    ).resolves.toEqual({
      errors: { outcome: VALIDATION.OUTCOME_REQUIRED },
      ok: false,
    });
    expect(
      recordReservationExtraTime
    ).not.toHaveBeenCalled();
  });

  it("maps a database refusal to the form error", async () => {
    vi.mocked(recordReservationExtraTime).mockRejectedValue(
      new Error(
        RESERVATION_EXTRA_TIME_ERROR.MESSAGE
          .ALREADY_RESOLVED
      )
    );

    await expect(
      recordReservationExtraTimeAction(
        EXTRA_TIME_CHARGED_INPUT
      )
    ).resolves.toEqual({
      errors: {},
      formError: FEEDBACK.ALREADY_RESOLVED,
      ok: false,
    });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("rethrows an unexpected failure", async () => {
    const failure = new Error("connection reset");
    vi.mocked(recordReservationExtraTime).mockRejectedValue(
      failure
    );

    await expect(
      recordReservationExtraTimeAction(
        EXTRA_TIME_CHARGED_INPUT
      )
    ).rejects.toThrow(failure);
  });
});
