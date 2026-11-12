import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import { RESERVATION_GUIDE_SELECTION_TEST } from "./ReservationGuideSelection.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import {
  createFailedGuideLoadResult,
  renderReservationGuideForm,
} from "./ReservationGuideAssignment.fixture";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Reservation guide refresh", () => {
  it("submits only guides remaining after a successful refresh", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    const page = renderReservationGuideForm();
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await page.fillCustomerName(
      RESERVATION_FORM_VIEW_TEST.CUSTOMER_NAME
    );
    await page.toggleGuide(
      RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME
    );
    await page.toggleGuide(
      RESERVATION_GUIDE_ASSIGNMENT_TEST.SECOND_NAME
    );
    page.rerenderGuideLoadResult({
      guides: [
        {
          id: RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
          name: RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME,
        },
      ],
      kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
    });
    await page.submit();

    expect(createReservationAction).toHaveBeenCalledWith(
      expect.objectContaining({
        guideIds: [
          RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
        ],
      })
    );
  });

  it("preserves guide selections when a refresh fails", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    const page = renderReservationGuideForm();
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await page.fillCustomerName(
      RESERVATION_FORM_VIEW_TEST.CUSTOMER_NAME
    );
    await page.toggleGuide(
      RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME
    );
    page.rerenderGuideLoadResult(
      createFailedGuideLoadResult()
    );
    await page.submit();

    expect(createReservationAction).toHaveBeenCalledWith(
      expect.objectContaining({
        guideIds: [
          RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
        ],
      })
    );
  });
});
