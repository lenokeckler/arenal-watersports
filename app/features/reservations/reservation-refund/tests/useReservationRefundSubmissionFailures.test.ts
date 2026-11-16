import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import { RESERVATION_REFUND_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationRefundFeedbackCopy.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as VALIDATION } from "../constants/ReservationRefundValidationCopy.constants";
import { NETWORK_FAILURE } from "./ReservationRefundForm.constants";
import { renderSubmission } from "./renderReservationRefundSubmission";

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
});
