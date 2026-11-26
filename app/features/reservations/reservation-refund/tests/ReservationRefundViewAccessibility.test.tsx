import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_REASON as REASON_KEY } from "../constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_REASON_COPY as REASON } from "../constants/ReservationRefundReasonCopy.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as VALIDATION } from "../constants/ReservationRefundValidationCopy.constants";
import { BOTH_REFUND } from "./ReservationRefundForm.constants";
import { AVAILABLE_USD } from "./ReservationRefundValues.constants";
import { ARIA_INVALID_VALUE } from "./ReservationRefundView.constants";
import { renderReservationRefundView } from "./renderReservationRefundView";

vi.mock("../actions/recordReservationRefundAction", () => ({
  recordReservationRefundAction: vi.fn(),
}));

const USD_HELPER = COPY.AMOUNT_HELPER(
  formatMoney({
    amount: AVAILABLE_USD,
    currency: CURRENCY_CODE.USD,
  })
);

describe("ReservationRefundView accessibility", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("describes the amount by its error and its helper and marks it invalid", async () => {
    const page = renderReservationRefundView(BOTH_REFUND);

    await page.submit();

    expect(page.getAmountInvalid()).toBe(
      ARIA_INVALID_VALUE
    );
    expect(page.getAmountDescription()).toContain(
      VALIDATION.AMOUNT_REQUIRED
    );
    expect(page.getAmountDescription()).toContain(
      USD_HELPER
    );
  });

  it("describes the reasons by their error and marks each radio invalid", async () => {
    const page = renderReservationRefundView(BOTH_REFUND);

    await page.submit();

    expect(page.getReasonDescription()).toBe(
      VALIDATION.REASON_REQUIRED
    );
    expect(
      page.getRadioInvalid(
        REASON[REASON_KEY.CANCELLED_TRIP]
      )
    ).toBe(ARIA_INVALID_VALUE);
  });
});
