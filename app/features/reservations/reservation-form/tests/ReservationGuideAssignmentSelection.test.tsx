import { afterEach, expect, it, vi } from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { getReservationGuidesAction } from "../actions/getReservationGuidesAction";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import {
  createFailedGuideLoadResult,
  renderReservationGuideForm,
} from "./ReservationGuideAssignment.fixture";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import {
  RESERVATION_GUIDE_SELECTION_IDS,
  RESERVATION_GUIDE_SELECTION_OPTIONS,
} from "./ReservationGuideSelection.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

vi.mock("../actions/getReservationGuidesAction", () => ({
  getReservationGuidesAction: vi.fn(),
}));

afterEach(() => {
  vi.unstubAllGlobals();
});

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
      guideIds: RESERVATION_GUIDE_SELECTION_IDS.slice(0, 2),
    })
  );
});

it("shows a non-blocking warning when a tour is submitted without guides", async () => {
  vi.mocked(createReservationAction).mockResolvedValue({
    ok: true,
    reservationId:
      RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
  });
  const page = renderReservationGuideForm();
  await page.selectReservationType(
    RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
  );

  expect(page.getNoGuideWarning()).toBeVisible();
  await page.submit();

  expect(createReservationAction).toHaveBeenCalledWith(
    expect.objectContaining({ guideIds: [] })
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
  expect(page.queryGuideSelector()).not.toBeInTheDocument();
  await page.selectReservationType(
    RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
  );
  expect(
    page.getGuideCheckbox(
      RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME
    )
  ).not.toBeChecked();
});

it("shows eligible guides after a failed directory load is retried", async () => {
  vi.mocked(getReservationGuidesAction).mockResolvedValue({
    guides: RESERVATION_GUIDE_SELECTION_OPTIONS,
    kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
  });
  const page = renderReservationGuideForm(
    createFailedGuideLoadResult()
  );
  await page.selectReservationType(
    RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
  );

  await page.clickGuideRetry();

  expect(
    await page.findGuideCheckbox(
      RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME
    )
  ).toBeVisible();
});

it("shows the error feedback when retry still fails", async () => {
  vi.stubGlobal("reportError", vi.fn());
  vi.mocked(getReservationGuidesAction).mockRejectedValue(
    new Error(
      RESERVATION_GUIDE_ASSIGNMENT_TEST.RETRY_ERROR_MESSAGE
    )
  );
  const page = renderReservationGuideForm(
    createFailedGuideLoadResult()
  );
  await page.selectReservationType(
    RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
  );

  await page.clickGuideRetry();

  expect(await page.getGuideError()).toBeInTheDocument();
});
