import { describe, expect, it, vi } from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { renderReservationGuideForm } from "./ReservationGuideAssignment.fixture";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import { RESERVATION_GUIDE_SELECTION_TEST } from "./ReservationGuideSelection.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

describe("Reservation guide selection", () => {
  it("toggles and removes a selected guide", async () => {
    const page = renderReservationGuideForm();
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    const guideName =
      RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME;
    await page.toggleGuide(guideName);
    expect(page.getGuideCheckbox(guideName)).toBeChecked();
    await page.toggleGuide(guideName);
    expect(
      page.getGuideCheckbox(guideName)
    ).not.toBeChecked();
  });

  it("submits every selected guide identifier", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    const page = renderReservationGuideForm();
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await page.toggleGuide(
      RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME
    );
    await page.toggleGuide(
      RESERVATION_GUIDE_ASSIGNMENT_TEST.SECOND_NAME
    );
    await page.submit();
    expect(createReservationAction).toHaveBeenCalledWith(
      expect.objectContaining({
        guideIds: [
          RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
          RESERVATION_GUIDE_SELECTION_TEST.SECOND_ID,
        ],
      })
    );
  });

  it("clears selected guides when the reservation leaves tour type", async () => {
    const page = renderReservationGuideForm();
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await page.toggleGuide(
      RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME
    );
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.RENTAL.label
    );
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    expect(
      page.getGuideCheckbox(
        RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME
      )
    ).not.toBeChecked();
  });
});
