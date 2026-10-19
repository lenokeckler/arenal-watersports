import { describe, expect, it, vi } from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { getReservationCategoryAvailabilityAction } from "../actions/getReservationCategoryAvailabilityAction";
import { getReservationCategoryConflictsAction } from "../actions/getReservationCategoryConflictsAction";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { RESERVATION_CATEGORY_AVAILABILITY_ROW } from "./getReservationInterval.constants";
import { RESERVATION_CATEGORY_CONFLICT_WARNING_TEST } from "./ReservationCategoryConflictWarning.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { createReservationCategoryConflictPage } from "./ReservationCategoryConflict.page";

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

describe("ReservationFormView conflict lookup failure", () => {
  it("allows submission when the conflict lookup fails", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    vi.mocked(
      getReservationCategoryAvailabilityAction
    ).mockResolvedValue(
      RESERVATION_CATEGORY_AVAILABILITY_ROW
    );
    vi.mocked(
      getReservationCategoryConflictsAction
    ).mockRejectedValue(
      new Error(
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.LOOKUP_FAILURE_MESSAGE
      )
    );
    const page = renderReservationForm();
    const conflictPage =
      createReservationCategoryConflictPage();

    await page.selectCategory(
      RESERVATION_FORM_VIEW_TEST.CATEGORY_ID
    );
    await conflictPage.findError();

    expect(page.getSubmitButton()).toBeEnabled();
    await page.submit();

    expect(createReservationAction).toHaveBeenCalledOnce();
  });
});
