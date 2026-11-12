import { act } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationChargeFeedbackCopy.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION } from "../constants/ReservationChargeValidationCopy.constants";
import { NETWORK_FAILURE } from "./ReservationChargeForm.constants";
import { renderSubmission } from "./renderReservationChargeSubmission";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

const submit = async (
  handleSubmit: () => void
): Promise<void> => {
  await act(() => Promise.resolve(handleSubmit()));
};

describe("useReservationChargeSubmission failures", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows the field errors the action returns", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      errors: { paymentMethod: VALIDATION.METHOD_REQUIRED },
      ok: false,
    });
    const { result } = renderSubmission();

    await submit(result.current.handleSubmit);

    expect(result.current.errors).toEqual({
      paymentMethod: VALIDATION.METHOD_REQUIRED,
    });
    expect(result.current.recorded).toBeNull();
  });

  it("shows the form error the action returns", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      errors: {},
      formError: FEEDBACK.STATUS_CHANGED,
      ok: false,
    });
    const { result } = renderSubmission();

    await submit(result.current.handleSubmit);

    expect(result.current.formError).toBe(
      FEEDBACK.STATUS_CHANGED
    );
  });

  it("never claims the charge was not recorded when the action throws", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockRejectedValue(NETWORK_FAILURE);
    const { result } = renderSubmission();

    await submit(result.current.handleSubmit);

    expect(result.current.formError).toBe(
      FEEDBACK.UNCONFIRMED
    );
    expect(result.current.isPending).toBe(false);
  });

  it("skips the action and reports offline when the browser has no connection", async () => {
    vi.spyOn(navigator, "onLine", "get").mockReturnValue(
      false
    );
    const { result } = renderSubmission();

    await submit(result.current.handleSubmit);

    expect(
      recordReservationChargeAction
    ).not.toHaveBeenCalled();
    expect(result.current.formError).toBe(FEEDBACK.OFFLINE);
  });
});
