import { describe, expect, it, vi } from "vitest";
import { getReservationGuidesAction } from "../actions/getReservationGuidesAction";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import {
  createFailedGuideLoadResult,
  renderReservationGuideForm,
} from "./ReservationGuideAssignment.fixture";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import { RESERVATION_GUIDE_SELECTION_TEST } from "./ReservationGuideSelection.constants";

vi.mock("../actions/getReservationGuidesAction", () => ({
  getReservationGuidesAction: vi.fn(),
}));

describe("Reservation guide directory", () => {
  it("shows the empty directory state", async () => {
    const page = renderReservationGuideForm({
      guides: [],
      kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
    });
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );

    expect(page.queryGuideSelector()).toBeInTheDocument();
    expect(
      page.queryGuideSelector()?.textContent
    ).toContain(RESERVATION_FORM_UI_COPY.GUIDES_EMPTY);
  });

  it("retries an initial guide load failure successfully", async () => {
    vi.mocked(getReservationGuidesAction).mockResolvedValue(
      {
        guides: [
          {
            id: RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
            name: RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME,
          },
        ],
        kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
      }
    );
    const page = renderReservationGuideForm(
      createFailedGuideLoadResult()
    );
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );

    expect(
      page.queryGuideSelector()?.textContent
    ).toContain(RESERVATION_FORM_UI_COPY.GUIDES_ERROR);
    await page.clickGuideRetry();
    expect(
      page.getGuideCheckbox(
        RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME
      )
    ).toBeInTheDocument();
  });

  it("keeps safe copy when retry returns a failure", async () => {
    vi.mocked(getReservationGuidesAction).mockResolvedValue(
      createFailedGuideLoadResult()
    );
    const page = renderReservationGuideForm(
      createFailedGuideLoadResult()
    );
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await page.clickGuideRetry();

    expect(
      page.queryGuideSelector()?.textContent
    ).toContain(RESERVATION_FORM_UI_COPY.GUIDES_ERROR);
    expect(
      page.queryGuideSelector()?.textContent
    ).not.toContain(
      RESERVATION_GUIDE_ASSIGNMENT_TEST.LOAD_ERROR_CODE
    );
  });

  it.each([
    RESERVATION_TYPE_COPY.OPTIONS.RENTAL.label,
    RESERVATION_TYPE_COPY.OPTIONS.COMBO.label,
  ])(
    "hides guide selector for %s",
    async (reservationType) => {
      const page = renderReservationGuideForm();
      await page.selectReservationType(reservationType);

      expect(
        page.queryGuideSelector()
      ).not.toBeInTheDocument();
    }
  );
});
