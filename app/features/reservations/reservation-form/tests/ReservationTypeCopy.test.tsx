import { describe, expect, it } from "vitest";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";

describe("ReservationTypeField descriptions", () => {
  it("explains rental equipment is taken by the customer", () => {
    const page = renderReservationForm();

    expect(
      page.getReservationTypeDescription(
        RESERVATION_TYPE_COPY.OPTIONS.RENTAL.description
      )
    ).toBeInTheDocument();
  });

  it("explains tours are accompanied by a guide", () => {
    const page = renderReservationForm();

    expect(
      page.getReservationTypeDescription(
        RESERVATION_TYPE_COPY.OPTIONS.TOUR.description
      )
    ).toBeInTheDocument();
  });

  it("describes combo as a package of different equipment", () => {
    const page = renderReservationForm();

    expect(
      page.getReservationTypeDescription(
        RESERVATION_TYPE_COPY.OPTIONS.COMBO.description
      )
    ).toBeInTheDocument();
  });
});
