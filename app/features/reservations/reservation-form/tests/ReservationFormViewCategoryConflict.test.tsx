import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { getReservationCategoryAvailabilityAction } from "../actions/getReservationCategoryAvailabilityAction";
import { getReservationCategoryConflictsAction } from "../actions/getReservationCategoryConflictsAction";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { RESERVATION_CATEGORY_AVAILABILITY_ROW } from "./getReservationInterval.constants";
import { RESERVATION_CATEGORY_CONFLICT_WARNING_TEST } from "./ReservationCategoryConflictWarning.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

vi.mock(
  "../actions/getAvailableReservationUnitsAction",
  () => ({
    getAvailableReservationUnitsAction: vi.fn(),
  })
);

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

describe("ReservationFormView category conflict warning", () => {
  beforeEach(() => vi.clearAllMocks());
  it("shows the conflict and allows reservation submission", async () => {
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
    ).mockResolvedValue([
      RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.RPC_ROW,
    ]);
    const page = renderReservationForm();

    await page.selectCategoryChoice(
      RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME
    );
    await page.findCategoryConflictWarning();
    await page.findCategoryConflictCode();
    await page.findCategoryConflictCustomerName();
    await page.findCategoryConflictInterval();

    expect(page.getSubmitButton()).toBeEnabled();
    await page.submit();

    expect(createReservationAction).toHaveBeenCalledOnce();
  });

  it("keeps available concrete units selectable when a category conflict is advisory", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    vi.mocked(
      getAvailableReservationUnitsAction
    ).mockResolvedValue([
      {
        code: RESERVATION_FORM_VIEW_TEST.UNIT_CODE,
        id: RESERVATION_FORM_VIEW_TEST.UNIT_ID,
      },
    ]);
    vi.mocked(
      getReservationCategoryAvailabilityAction
    ).mockResolvedValue(
      RESERVATION_CATEGORY_AVAILABILITY_ROW
    );
    vi.mocked(
      getReservationCategoryConflictsAction
    ).mockResolvedValue([
      RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.RPC_ROW,
    ]);
    const page = renderReservationForm();

    await page.selectCategoryChoice(
      RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME
    );
    await page.findAvailableUnit(
      RESERVATION_FORM_VIEW_TEST.AVAILABLE_UNIT_CODE
    );
    await page.findCategoryConflictWarning();
    await page.selectUnit(
      RESERVATION_FORM_VIEW_TEST.UNIT_ID
    );
    await page.submit();

    expect(createReservationAction).toHaveBeenCalledWith(
      expect.objectContaining({
        unitId: RESERVATION_FORM_VIEW_TEST.UNIT_ID,
      })
    );
  });

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
    ).mockRejectedValue(new Error("Lookup unavailable"));
    const page = renderReservationForm();

    await page.selectCategoryChoice(
      RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME
    );
    await page.findCategoryConflictError();

    expect(page.getSubmitButton()).toBeEnabled();
    await page.submit();

    expect(createReservationAction).toHaveBeenCalledOnce();
  });
});
