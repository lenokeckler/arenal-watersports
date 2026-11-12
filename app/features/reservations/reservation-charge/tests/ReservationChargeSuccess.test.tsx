import { describe, expect, it } from "vitest";
import {
  CURRENCY_NAME_COPY,
  CURRENCY_SYMBOL,
  PATHS,
} from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_UI_COPY } from "../constants/ReservationChargeUiCopy.constants";
import { CHARGE_RECORDED } from "./ReservationChargeAction.constants";
import { EXPECTED_SCHEDULED } from "./ReservationCharge.constants";
import { renderReservationChargeSuccess } from "./renderReservationChargeSuccess";

describe("ReservationChargeSuccess", () => {
  it("announces the charge and takes focus", () => {
    const page = renderReservationChargeSuccess();

    expect(page.getStatusText()).toBe(
      COPY.SUCCESS(EXPECTED_SCHEDULED.code)
    );
    expect(page.getStatus()).toHaveFocus();
  });

  it("shows amount, currency, method and who recorded it", () => {
    const page = renderReservationChargeSuccess();

    expect(
      page.getDefinitionValue(COPY.LABEL_AMOUNT)
    ).toContain(CURRENCY_SYMBOL.USD);
    expect(
      page.getDefinitionValue(COPY.LABEL_CURRENCY)
    ).toBe(CURRENCY_NAME_COPY.USD);
    expect(page.getDefinitionValue(COPY.LABEL_METHOD)).toBe(
      CHARGE_RECORDED.paymentMethod
    );
    expect(
      page.queryText(
        COPY.RECORDED_BY(CHARGE_RECORDED.recordedByName)
      )
    ).not.toBeNull();
  });

  it("links back to the reservation", () => {
    const page = renderReservationChargeSuccess();

    expect(
      page
        .getLink(
          RESERVATION_CHARGE_UI_COPY.BACK_TO_RESERVATION
        )
        .getAttribute("href")
    ).toBe(
      PATHS.RESERVATIONS.DETAIL(EXPECTED_SCHEDULED.id)
    );
  });
});
