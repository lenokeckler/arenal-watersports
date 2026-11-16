import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { EDITED_METHOD_TEXT } from "./ReservationChargeForm.constants";
import { renderReservationChargeForm } from "./renderReservationChargeForm";

describe("ReservationChargeForm", () => {
  it("no longer holds the amount or the currency group", () => {
    const page = renderReservationChargeForm();

    expect(
      screen.queryByRole(ARIA_ROLE.TEXTBOX, {
        name: COPY.AMOUNT_LABEL.USD,
      })
    ).toBeNull();
    expect(page.queryCurrencyRadios()).toHaveLength(0);
  });

  it("keeps the payment method and the actions", () => {
    const page = renderReservationChargeForm();

    expect(
      page.getPaymentChoice(EDITED_METHOD_TEXT)
    ).toBeInTheDocument();
    expect(page.getSubmit()).toBeEnabled();
    expect(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: COPY.ACTIONS,
      })
    ).toBeInTheDocument();
  });
});
