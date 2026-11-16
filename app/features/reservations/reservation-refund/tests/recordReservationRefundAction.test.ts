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
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import { RESERVATION_REFUND_ERROR } from "../constants/ReservationRefundError.constants";
import { RESERVATION_REFUND_FEEDBACK_COPY as COPY } from "../constants/ReservationRefundFeedbackCopy.constants";
import { RESERVATION_REFUND_VALIDATION_COPY } from "../constants/ReservationRefundValidationCopy.constants";
import { recordReservationRefund } from "../services/recordReservationRefund";
import { REFUND_RESERVATION_ID } from "./ReservationRefund.constants";
import {
  REFUND_ACCESS_REDIRECT,
  REFUND_RECORDED,
  REFUND_UNEXPECTED_ERROR,
  VALID_REFUND_COMMAND,
} from "./ReservationRefundAction.constants";
import {
  OTHER_REASON_TEXT,
  OTHER_REFUND_VALUES,
  VALID_REFUND_INPUT,
} from "./ReservationRefundValues.constants";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/recordReservationRefund", () => ({
  recordReservationRefund: vi.fn(),
}));

describe("recordReservationRefundAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("records the refund and revalidates detail and income", async () => {
    vi.mocked(recordReservationRefund).mockResolvedValue(
      REFUND_RECORDED
    );

    await expect(
      recordReservationRefundAction(VALID_REFUND_INPUT)
    ).resolves.toEqual({
      ok: true,
      recorded: REFUND_RECORDED,
    });
    expect(
      assertReservationCalendarAccess
    ).toHaveBeenCalledOnce();
    expect(recordReservationRefund).toHaveBeenCalledWith(
      VALID_REFUND_COMMAND
    );
    expect(revalidatePath).toHaveBeenCalledTimes(2);
    expect(revalidatePath).toHaveBeenCalledWith(
      PATHS.RESERVATIONS.DETAIL(REFUND_RESERVATION_ID)
    );
    expect(revalidatePath).toHaveBeenCalledWith(
      PATHS.RESERVATIONS.INCOME
    );
  });

  it("refuses a malformed input before checking access", async () => {
    await expect(
      recordReservationRefundAction({})
    ).resolves.toEqual({
      ok: false,
      errors: {},
      formError: COPY.REQUEST_REJECTED,
    });
    expect(
      assertReservationCalendarAccess
    ).not.toHaveBeenCalled();
  });

  it("returns the field errors without calling the service", async () => {
    await expect(
      recordReservationRefundAction({
        ...VALID_REFUND_INPUT,
        amountText: "",
        reason: null,
      })
    ).resolves.toEqual({
      ok: false,
      errors: {
        amount:
          RESERVATION_REFUND_VALIDATION_COPY.AMOUNT_REQUIRED,
        reason:
          RESERVATION_REFUND_VALIDATION_COPY.REASON_REQUIRED,
      },
    });
    expect(recordReservationRefund).not.toHaveBeenCalled();
  });

  it("sends the trimmed free-text reason", async () => {
    vi.mocked(recordReservationRefund).mockResolvedValue(
      REFUND_RECORDED
    );

    await recordReservationRefundAction({
      ...OTHER_REFUND_VALUES,
      otherReasonText: ` ${OTHER_REASON_TEXT} `,
      reservationId: REFUND_RESERVATION_ID,
    });

    expect(recordReservationRefund).toHaveBeenCalledWith({
      ...VALID_REFUND_COMMAND,
      reason: OTHER_REASON_TEXT,
    });
  });

  it("maps a database refusal without revalidating", async () => {
    vi.mocked(recordReservationRefund).mockRejectedValue(
      new Error(
        RESERVATION_REFUND_ERROR.MESSAGE.EXCEEDS_NET
      )
    );

    await expect(
      recordReservationRefundAction(VALID_REFUND_INPUT)
    ).resolves.toEqual({
      ok: false,
      errors: {},
      formError: COPY.ABOVE_AVAILABLE,
    });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("rethrows an unexpected failure for server logging", async () => {
    vi.mocked(recordReservationRefund).mockRejectedValue(
      REFUND_UNEXPECTED_ERROR
    );

    await expect(
      recordReservationRefundAction(VALID_REFUND_INPUT)
    ).rejects.toBe(REFUND_UNEXPECTED_ERROR);
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("lets an access redirect through without recording", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(REFUND_ACCESS_REDIRECT);

    await expect(
      recordReservationRefundAction(VALID_REFUND_INPUT)
    ).rejects.toBe(REFUND_ACCESS_REDIRECT);
    expect(recordReservationRefund).not.toHaveBeenCalled();
  });
});
