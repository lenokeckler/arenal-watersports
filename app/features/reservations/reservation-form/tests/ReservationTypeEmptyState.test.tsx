import { describe, expect, it } from "vitest";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_TYPE_EMPTY_STATE_TEST } from "./ReservationTypeEmptyState.constants";

describe("ReservationForm empty state", () => {
  it("shows a neutral empty state for tours without categories", async () => {
    const page = renderReservationForm([]);

    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );

    const statusMessage = await page.findStatusMessage(
      RESERVATION_FORM_UI_COPY.NO_CATEGORIES
    );

    expect(statusMessage).toHaveTextContent(
      RESERVATION_FORM_UI_COPY.NO_CATEGORIES
    );
    expect(statusMessage).not.toHaveTextContent(
      RESERVATION_TYPE_EMPTY_STATE_TEST.FORBIDDEN_TOUR_INSTRUCTION
    );
  });
});
