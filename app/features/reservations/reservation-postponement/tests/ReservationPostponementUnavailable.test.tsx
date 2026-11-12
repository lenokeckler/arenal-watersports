import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ReservationPostponementUnavailable from "../components/ReservationPostponementUnavailable";
import {
  RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY,
  RESERVATION_POSTPONEMENT_UNAVAILABLE_STATUS_BODY,
} from "../constants/ReservationPostponementUnavailableCopy.constants";
import {
  NOT_POSTPONABLE_STATUS_CASES,
  POSTPONEMENT_CALENDAR_HREF,
} from "./ReservationPostponement.constants";
import { createReservationPostponementPage } from "./ReservationPostponement.page";

describe("ReservationPostponementUnavailable", () => {
  it.each(NOT_POSTPONABLE_STATUS_CASES)(
    "explains a %s reservation and offers a way back",
    (status) => {
      render(
        <ReservationPostponementUnavailable
          status={status}
        />
      );
      const page = createReservationPostponementPage();

      expect(
        page.getText(
          RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY.TITLE
        )
      ).toBeInTheDocument();
      expect(page.getStatusText()).toContain(
        RESERVATION_POSTPONEMENT_UNAVAILABLE_STATUS_BODY[
          status
        ]
      );
      expect(page.getStatusText()).toContain(
        RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY.RULE
      );
      expect(page.getCalendarLinkTargets()).toEqual([
        POSTPONEMENT_CALENDAR_HREF,
        POSTPONEMENT_CALENDAR_HREF,
      ]);
    }
  );
});
