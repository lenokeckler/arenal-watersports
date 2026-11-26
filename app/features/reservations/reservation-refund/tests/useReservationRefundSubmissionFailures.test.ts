import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { isBrowserOffline } from "@/app/utils/network/isBrowserOffline";
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import { RESERVATION_REFUND_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationRefundFeedbackCopy.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as VALIDATION } from "../constants/ReservationRefundValidationCopy.constants";
import { REFUND_RECORDED } from "./ReservationRefundAction.constants";
import { NETWORK_FAILURE } from "./ReservationRefundForm.constants";
import { renderSubmission } from "./renderReservationRefundSubmission";

vi.mock("@/app/utils/network/isBrowserOffline", () => ({
  isBrowserOffline: vi.fn(),
}));
vi.mock("../actions/recordReservationRefundAction", () => ({
  recordReservationRefundAction: vi.fn(),
}));

const submit = async (
  handleSubmit: () => void
): Promise<void> => {
  await act(() => Promise.resolve(handleSubmit()));
};

describe("useReservationRefundSubmission failures", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows the field errors the action returns", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockResolvedValue({
      errors: { reason: VALIDATION.REASON_REQUIRED },
      ok: false,
    });
    const { result } = renderSubmission();

    await submit(result.current.handleSubmit);

    expect(result.current.errors).toEqual({
      reason: VALIDATION.REASON_REQUIRED,
    });
    expect(result.current.recorded).toBeNull();
  });

  it("shows the form error the action returns", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockResolvedValue({
      errors: {},
      formError: FEEDBACK.ABOVE_AVAILABLE,
      ok: false,
    });
    const { result } = renderSubmission();

    await submit(result.current.handleSubmit);

    expect(result.current.formError).toBe(
      FEEDBACK.ABOVE_AVAILABLE
    );
    expect(result.current.isPending).toBe(false);
  });

  it("says the refund is unconfirmed when the call fails", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockRejectedValue(NETWORK_FAILURE);
    const { result } = renderSubmission();

    await submit(result.current.handleSubmit);

    expect(result.current.formError).toBe(
      FEEDBACK.UNCONFIRMED
    );
    expect(result.current.recorded).toBeNull();
    expect(result.current.isPending).toBe(false);
  });

  it("locks the form after an unconfirmed failure", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockRejectedValue(NETWORK_FAILURE);
    const { result } = renderSubmission();
    await submit(result.current.handleSubmit);

    await submit(result.current.handleSubmit);
    act(() => result.current.clearErrors());

    expect(result.current.mayBeRecorded).toBe(true);
    expect(
      recordReservationRefundAction
    ).toHaveBeenCalledTimes(1);
    expect(result.current.formError).toBe(
      FEEDBACK.UNCONFIRMED
    );
  });

  it("sends once more after an offline failure", async () => {
    vi.mocked(isBrowserOffline).mockReturnValueOnce(true);
    vi.mocked(
      recordReservationRefundAction
    ).mockResolvedValue({
      ok: true,
      recorded: REFUND_RECORDED,
    });
    const { result } = renderSubmission();
    await submit(result.current.handleSubmit);
    expect(result.current.formError).toBe(FEEDBACK.OFFLINE);
    expect(result.current.mayBeRecorded).toBe(false);

    await submit(result.current.handleSubmit);

    expect(
      recordReservationRefundAction
    ).toHaveBeenCalledTimes(1);
    expect(result.current.recorded).toEqual(
      REFUND_RECORDED
    );
  });
});
