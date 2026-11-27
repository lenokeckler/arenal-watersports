import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CURRENCY_CODE,
  CURRENCY_NAME_COPY,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_REASON as REASON_KEY } from "../constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_REASON_COPY as REASON } from "../constants/ReservationRefundReasonCopy.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as VALIDATION } from "../constants/ReservationRefundValidationCopy.constants";
import { REFUND_RECORDED } from "./ReservationRefundAction.constants";
import {
  ABOVE_USD_AMOUNT_TEXT,
  BOTH_REFUND,
  EDITED_AMOUNT_TEXT,
} from "./ReservationRefundForm.constants";
import {
  AVAILABLE_CRC,
  AVAILABLE_USD,
} from "./ReservationRefundValues.constants";
import { ABOVE_CRC_AMOUNT_TEXT } from "./ReservationRefundView.constants";
import { renderReservationRefundView } from "./renderReservationRefundView";

vi.mock("../actions/recordReservationRefundAction", () => ({
  recordReservationRefundAction: vi.fn(),
}));

const CRC_MAX = formatMoney({
  amount: AVAILABLE_CRC,
  currency: CURRENCY_CODE.CRC,
});
const USD_MAX = formatMoney({
  amount: AVAILABLE_USD,
  currency: CURRENCY_CODE.USD,
});

describe("ReservationRefundView currency", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("switches the label and the maximum to the chosen currency and keeps the amount", async () => {
    const page = renderReservationRefundView(BOTH_REFUND);
    await page.typeAmount(EDITED_AMOUNT_TEXT);
    expect(
      page.queryExactText(COPY.AMOUNT_HELPER(USD_MAX))
    ).not.toBeNull();

    await page.selectRadio(CURRENCY_NAME_COPY.CRC);

    expect(
      page.queryText(COPY.AMOUNT_LABEL.CRC)
    ).not.toBeNull();
    expect(
      page.queryExactText(COPY.AMOUNT_HELPER(CRC_MAX))
    ).not.toBeNull();
    expect(page.getAmount()).toHaveValue(
      EDITED_AMOUNT_TEXT
    );
  });

  it("sends the chosen currency", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockResolvedValue({
      ok: true,
      recorded: REFUND_RECORDED,
    });
    const page = renderReservationRefundView(BOTH_REFUND);
    await page.selectRadio(CURRENCY_NAME_COPY.CRC);
    await page.typeAmount(EDITED_AMOUNT_TEXT);
    await page.selectRadio(
      REASON[REASON_KEY.CANCELLED_TRIP]
    );

    await page.submit();

    expect(
      recordReservationRefundAction
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        amountText: EDITED_AMOUNT_TEXT,
        currency: CURRENCY_CODE.CRC,
      })
    );
  });

  it("refuses an amount above the available of the first currency", async () => {
    const page = renderReservationRefundView(BOTH_REFUND);
    await page.typeAmount(ABOVE_USD_AMOUNT_TEXT);
    await page.selectRadio(
      REASON[REASON_KEY.CANCELLED_TRIP]
    );

    await page.submit();

    expect(
      page.queryExactText(
        VALIDATION.AMOUNT_ABOVE_AVAILABLE(USD_MAX)
      )
    ).not.toBeNull();
    expect(
      recordReservationRefundAction
    ).not.toHaveBeenCalled();
  });

  it("refuses an amount above the available of the chosen currency", async () => {
    const page = renderReservationRefundView(BOTH_REFUND);
    await page.selectRadio(CURRENCY_NAME_COPY.CRC);
    await page.typeAmount(ABOVE_CRC_AMOUNT_TEXT);
    await page.selectRadio(
      REASON[REASON_KEY.CANCELLED_TRIP]
    );

    await page.submit();

    expect(
      page.queryExactText(
        VALIDATION.AMOUNT_ABOVE_AVAILABLE(CRC_MAX)
      )
    ).not.toBeNull();
    expect(
      recordReservationRefundAction
    ).not.toHaveBeenCalled();
  });
});
