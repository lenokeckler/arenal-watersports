import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CURRENCY_NAME_COPY } from "@/app/constants";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION } from "../constants/ReservationChargeValidationCopy.constants";
import { CHARGE_RECORDED } from "./ReservationChargeAction.constants";
import {
  CRC_PROPOSAL_TEXT,
  EDITED_AMOUNT_TEXT,
  EDITED_METHOD_TEXT,
  EMPTY_CHARGE,
  MIXED_CHARGE,
  USD_PROPOSAL_TEXT,
} from "./ReservationChargeForm.constants";
import { renderReservationChargeView } from "./renderReservationChargeView";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

const SENT_CURRENCY = "USD";

describe("ReservationChargeView form", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("prefills the catalog proposal and uses the decimal keypad", () => {
    const page = renderReservationChargeView();

    expect(page.getAmount()).toHaveValue(USD_PROPOSAL_TEXT);
    expect(page.getAmount()).toHaveAttribute(
      "inputmode",
      "decimal"
    );
    expect(page.getSubmit()).toBeEnabled();
  });

  it("sends the edited amount and method, then shows the confirmation", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      ok: true,
      recorded: CHARGE_RECORDED,
    });
    const page = renderReservationChargeView();

    await page.clearAmount();
    await page.typeAmount(EDITED_AMOUNT_TEXT);
    await page.typePaymentMethod(EDITED_METHOD_TEXT);
    await page.submit();

    await waitFor(() =>
      expect(page.getStatusText()).not.toBeNull()
    );
    expect(
      recordReservationChargeAction
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        amountText: EDITED_AMOUNT_TEXT,
        currency: SENT_CURRENCY,
        paymentMethod: EDITED_METHOD_TEXT,
      })
    );
  });

  it("shows the validation messages, focuses the amount and sends nothing", async () => {
    const page = renderReservationChargeView(EMPTY_CHARGE);

    await page.submit();

    expect(
      page.queryText(VALIDATION.AMOUNT_REQUIRED)
    ).not.toBeNull();
    expect(page.getAmount()).toHaveFocus();
    expect(
      recordReservationChargeAction
    ).not.toHaveBeenCalled();
  });

  it("swaps the prefilled amount when the currency changes", async () => {
    const page = renderReservationChargeView();

    await page.selectCurrency(CURRENCY_NAME_COPY.CRC);

    expect(page.getAmount()).toHaveValue(CRC_PROPOSAL_TEXT);
    expect(
      page.queryText(COPY.AMOUNT_LABEL.CRC)
    ).not.toBeNull();
  });

  it("offers only the proposal currency without the group and names it in the label", () => {
    const page = renderReservationChargeView(MIXED_CHARGE);

    expect(page.queryCurrencyRadios()).toHaveLength(0);
    expect(
      page.queryText(COPY.AMOUNT_LABEL.USD)
    ).not.toBeNull();
  });

  it("offers both currencies with an empty amount when none has a proposal", () => {
    const page = renderReservationChargeView(EMPTY_CHARGE);

    expect(page.queryCurrencyRadios()).toHaveLength(2);
    expect(page.getAmount()).toHaveValue("");
    expect(
      page.queryText(COPY.AMOUNT_HELPER_MANUAL)
    ).not.toBeNull();
  });
});
