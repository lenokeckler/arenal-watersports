import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { revalidatePath } from "next/cache";
import { reportServerError } from "@/app/services/observability";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import { RESERVATION_REFUND_ERROR } from "../constants/ReservationRefundError.constants";
import { RESERVATION_REFUND_FEEDBACK_COPY as COPY } from "../constants/ReservationRefundFeedbackCopy.constants";
import { recordReservationRefund } from "../services/recordReservationRefund";
import {
  REFUND_ACCESS_REDIRECT,
  REFUND_RECORDED,
  REFUND_UNEXPECTED_ERROR,
} from "./ReservationRefundAction.constants";
import { VALID_REFUND_INPUT } from "./ReservationRefundValues.constants";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("@/app/services/observability", () => ({
  reportServerError: vi.fn(),
}));
vi.mock("../services/recordReservationRefund", () => ({
  recordReservationRefund: vi.fn(),
}));

describe("recordReservationRefundAction failures", () => {
  beforeEach(() => {
    vi.resetAllMocks();
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

  it("still answers ok when revalidation throws after the insert", async () => {
    vi.mocked(recordReservationRefund).mockResolvedValue(
      REFUND_RECORDED
    );
    vi.mocked(revalidatePath).mockImplementation(() => {
      throw REFUND_UNEXPECTED_ERROR;
    });

    await expect(
      recordReservationRefundAction(VALID_REFUND_INPUT)
    ).resolves.toEqual({
      ok: true,
      recorded: REFUND_RECORDED,
    });
    expect(reportServerError).toHaveBeenCalledOnce();
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
