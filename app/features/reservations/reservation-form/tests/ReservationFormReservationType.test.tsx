import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { getReservationCategoryAvailabilityAction } from "../actions/getReservationCategoryAvailabilityAction";
import { getReservationCategoryConflictsAction } from "../actions/getReservationCategoryConflictsAction";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { RESERVATION_CATEGORY_AVAILABILITY_ROW } from "./getReservationInterval.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

vi.mock(
  "../actions/getReservationCategoryAvailabilityAction",
  () => ({
    getReservationCategoryAvailabilityAction: vi.fn(),
  })
);

vi.mock(
  "../actions/getReservationCategoryConflictsAction",
  () => ({
    getReservationCategoryConflictsAction: vi.fn(),
  })
);

describe("ReservationFormView reservation type", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      getReservationCategoryAvailabilityAction
    ).mockResolvedValue({
      ...RESERVATION_CATEGORY_AVAILABILITY_ROW,
      free: 2,
    });
    vi.mocked(
      getReservationCategoryConflictsAction
    ).mockResolvedValue([]);
  });

  it("submits the selected reservation type", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    const page = renderReservationForm();

    await page.setCustomerName(
      RESERVATION_FORM_VIEW_TEST.CUSTOMER_NAME
    );
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await page.selectCategoryChoice(
      RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME
    );
    await page.submit();

    expect(createReservationAction).toHaveBeenCalledWith(
      expect.objectContaining({
        reservationType: RESERVATION_TYPE.TOUR,
      })
    );
  });

  it("clears a guide-only category when switching away from tour", async () => {
    const page = renderReservationForm(true, false, true);

    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await page.selectCategoryChoice(
      RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_NAME
    );
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.RENTAL.label
    );

    expect(
      await page.findReservationTypeSelectionReset()
    ).toBeInTheDocument();
    expect(
      page.queryCategoryChoice(
        RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_NAME
      )
    ).not.toBeInTheDocument();
  });
});
