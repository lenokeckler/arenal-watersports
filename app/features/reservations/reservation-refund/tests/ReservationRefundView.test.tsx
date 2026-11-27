import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CURRENCY_NAME_COPY } from "@/app/constants";
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_REASON as REASON_KEY } from "../constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_REASON_COPY as REASON } from "../constants/ReservationRefundReasonCopy.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as VALIDATION } from "../constants/ReservationRefundValidationCopy.constants";
import { REFUND_RECORDED } from "./ReservationRefundAction.constants";
import {
  BOTH_REFUND,
  EDITED_AMOUNT_TEXT,
  USD_ONLY_REFUND,
} from "./ReservationRefundForm.constants";
import { OTHER_REASON_TEXT } from "./ReservationRefundValues.constants";
import { renderReservationRefundView } from "./renderReservationRefundView";

vi.mock("../actions/recordReservationRefundAction", () => ({
  recordReservationRefundAction: vi.fn(),
}));

describe("ReservationRefundView form", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("starts empty with both currency cards and an enabled submit", () => {
    const page = renderReservationRefundView();

    expect(page.getAmount()).toHaveValue("");
    expect(
      page.getRadio(CURRENCY_NAME_COPY.USD)
    ).toBeChecked();
    expect(
      page.getRadio(CURRENCY_NAME_COPY.CRC)
    ).not.toBeChecked();
    expect(page.getSubmit()).toBeEnabled();
    expect(page.getBusy()).toBe("false");
  });

  it("hides the currency cards when only one currency has money", () => {
    const page =
      renderReservationRefundView(USD_ONLY_REFUND);

    expect(page.queryCurrencyGroup()).toBeNull();
    expect(
      page.queryText(COPY.AMOUNT_LABEL.USD)
    ).not.toBeNull();
  });

  it("reveals the textarea for Otro and hides it for a preset", async () => {
    const page = renderReservationRefundView();
    expect(page.queryOtherReason()).toBeNull();

    await page.selectRadio(REASON[REASON_KEY.OTHER]);
    await page.typeOtherReason(OTHER_REASON_TEXT);
    expect(page.getOtherReason()).toHaveValue(
      OTHER_REASON_TEXT
    );

    await page.selectRadio(
      REASON[REASON_KEY.CANCELLED_TRIP]
    );
    expect(page.queryOtherReason()).toBeNull();
  });

  it("shows both field errors and focuses the amount first", async () => {
    const page = renderReservationRefundView();

    await page.submit();

    expect(
      page.queryText(VALIDATION.AMOUNT_REQUIRED)
    ).not.toBeNull();
    expect(
      page.queryText(VALIDATION.REASON_REQUIRED)
    ).not.toBeNull();
    expect(page.getAmount()).toHaveFocus();
    expect(
      recordReservationRefundAction
    ).not.toHaveBeenCalled();
  });

  it("focuses the first reason radio when only the reason is missing", async () => {
    const page = renderReservationRefundView(BOTH_REFUND);
    await page.typeAmount(EDITED_AMOUNT_TEXT);

    await page.submit();

    expect(
      page.getRadio(REASON[REASON_KEY.CANCELLED_TRIP])
    ).toHaveFocus();
  });

  it("sends the chosen values and shows the receipt", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockResolvedValue({
      ok: true,
      recorded: REFUND_RECORDED,
    });
    const page = renderReservationRefundView();
    await page.typeAmount(EDITED_AMOUNT_TEXT);
    await page.selectRadio(
      REASON[REASON_KEY.CANCELLED_TRIP]
    );

    await page.submit();

    expect(await page.findStatusText()).toBe(
      COPY.SUCCESS(BOTH_REFUND.code)
    );
    expect(
      recordReservationRefundAction
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        amountText: EDITED_AMOUNT_TEXT,
        reason: REASON_KEY.CANCELLED_TRIP,
      })
    );
  });
});
