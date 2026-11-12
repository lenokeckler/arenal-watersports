import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationChargeFeedbackCopy.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION } from "../constants/ReservationChargeValidationCopy.constants";
import { EDITED_METHOD_TEXT } from "./ReservationChargeForm.constants";
import { renderReservationChargeView } from "./renderReservationChargeView";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

describe("ReservationChargeView action errors", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("announces a form error, focuses the alert and keeps the form usable", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      errors: {},
      formError: FEEDBACK.STATUS_CHANGED,
      ok: false,
    });
    const page = renderReservationChargeView();

    await page.typePaymentMethod(EDITED_METHOD_TEXT);
    await page.submit();

    expect(await page.findAlertText()).toBe(
      FEEDBACK.STATUS_CHANGED
    );
    expect(page.getAlert()).toHaveFocus();
    expect(page.getSubmit()).toBeEnabled();
    expect(page.getAmount()).toBeEnabled();
  });

  it("shows a field error from the server under the amount", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      errors: { amount: VALIDATION.AMOUNT_REQUIRED },
      ok: false,
    });
    const page = renderReservationChargeView();

    await page.typePaymentMethod(EDITED_METHOD_TEXT);
    await page.submit();

    expect(
      await page.findText(VALIDATION.AMOUNT_REQUIRED)
    ).toBeInTheDocument();
    expect(page.getAmount()).toHaveFocus();
  });

  it("disables the fields while the charge is pending", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockReturnValue(new Promise(() => undefined));
    const page = renderReservationChargeView();

    await page.typePaymentMethod(EDITED_METHOD_TEXT);
    await page.submit();

    expect(page.getAmount()).toBeDisabled();
    expect(page.getPaymentMethod()).toBeDisabled();
    expect(page.getSubmit()).toBeDisabled();
  });
});
