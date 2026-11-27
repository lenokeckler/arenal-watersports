import { describe, expect, it } from "vitest";
import {
  CURRENCY_NAME_COPY,
  CURRENCY_SYMBOL,
  PATHS,
} from "@/app/constants";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_UI_COPY } from "../constants/ReservationRefundUiCopy.constants";
import { EXPECTED_SCHEDULED } from "./ReservationRefund.constants";
import { REFUND_RECORDED } from "./ReservationRefundAction.constants";
import { renderReservationRefundSuccess } from "./renderReservationRefundSuccess";

describe("ReservationRefundSuccess", () => {
  it("announces the refund and takes focus", () => {
    const page = renderReservationRefundSuccess();

    expect(page.getStatus()).toHaveTextContent(
      COPY.SUCCESS(EXPECTED_SCHEDULED.code)
    );
    expect(page.getStatus()).toHaveFocus();
  });

  it("shows amount, currency, reason and who recorded it", () => {
    const page = renderReservationRefundSuccess();

    expect(
      page.getDefinitionValue(COPY.LABEL_AMOUNT)
    ).toContain(CURRENCY_SYMBOL.USD);
    expect(
      page.getDefinitionValue(COPY.LABEL_CURRENCY)
    ).toBe(CURRENCY_NAME_COPY.USD);
    expect(page.getDefinitionValue(COPY.LABEL_REASON)).toBe(
      REFUND_RECORDED.reason
    );
    expect(
      page.queryText(
        COPY.RECORDED_BY(REFUND_RECORDED.recordedByName)
      )
    ).not.toBeNull();
  });

  it("links back to the reservation", () => {
    const page = renderReservationRefundSuccess();

    expect(
      page.getLinkHref(
        RESERVATION_REFUND_UI_COPY.BACK_TO_RESERVATION
      )
    ).toBe(
      PATHS.RESERVATIONS.DETAIL(EXPECTED_SCHEDULED.id)
    );
  });
});
