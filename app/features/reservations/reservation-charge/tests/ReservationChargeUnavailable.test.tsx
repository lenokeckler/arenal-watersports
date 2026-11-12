import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import ReservationChargeUnavailable from "../components/ReservationChargeUnavailable";
import { RESERVATION_CHARGE_UI_COPY } from "../constants/ReservationChargeUiCopy.constants";
import { RESERVATION_CHARGE_UNAVAILABLE_COPY as COPY } from "../constants/ReservationChargeUnavailableCopy.constants";
import { RESERVATION_CHARGE_UNAVAILABLE_REASON } from "../constants/ReservationChargeUnavailableReason.constants";
import { CHARGE_RESERVATION_ID } from "./ReservationCharge.constants";
import { createReservationChargePage } from "./ReservationCharge.page";

const HREF_ATTRIBUTE = "href";
const DETAIL_PATH = PATHS.RESERVATIONS.DETAIL(
  CHARGE_RESERVATION_ID
);
const REASONS = Object.values(
  RESERVATION_CHARGE_UNAVAILABLE_REASON
);

describe("ReservationChargeUnavailable", () => {
  it.each(REASONS)(
    "explains the %s reason and links back to the reservation",
    (reason) => {
      render(
        <ReservationChargeUnavailable
          reason={reason}
          reservationId={CHARGE_RESERVATION_ID}
        />
      );
      const page = createReservationChargePage();

      expect(page.getStatusText()).toBe(
        `${COPY.TITLE}${COPY.BODY[reason]}${COPY.RULE}`
      );
      expect(
        page.getHeading(RESERVATION_CHARGE_UI_COPY.TITLE)
      ).toBeInTheDocument();
      expect(
        page
          .getLink(
            RESERVATION_CHARGE_UI_COPY.BACK_TO_RESERVATION
          )
          .getAttribute(HREF_ATTRIBUTE)
      ).toBe(DETAIL_PATH);
    }
  );
});
