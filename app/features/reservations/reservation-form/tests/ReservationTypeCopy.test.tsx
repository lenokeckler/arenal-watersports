import { describe, expect, it } from "vitest";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";

describe("ReservationTypeField descriptions", () => {
  it("explains rental equipment is taken by the customer", () => {
    const page = renderReservationForm();

    expect(
      page.getReservationTypeDescription(
        RESERVATION_FORM_VIEW_TEST.RENTAL_TYPE_DESCRIPTION
      )
    ).toBeInTheDocument();
  });

  it("explains tours are accompanied by a guide", () => {
    const page = renderReservationForm();

    expect(
      page.getReservationTypeDescription(
        RESERVATION_FORM_VIEW_TEST.TOUR_TYPE_DESCRIPTION
      )
    ).toBeInTheDocument();
  });

  it("describes combo as a package of different equipment", () => {
    const page = renderReservationForm();

    expect(
      page.getReservationTypeDescription(
        RESERVATION_FORM_VIEW_TEST.COMBO_TYPE_DESCRIPTION
      )
    ).toBeInTheDocument();
  });
});
