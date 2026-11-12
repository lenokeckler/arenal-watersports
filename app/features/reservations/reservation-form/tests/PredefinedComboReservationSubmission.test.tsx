import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createPredefinedComboReservationAction } from "../actions/createPredefinedComboReservationAction";
import {
  PREDEFINED_COMBO_SELECTION_FIXTURE,
  selectPredefinedCombo,
} from "./PredefinedComboSelection.fixture";
import { PREDEFINED_COMBO_SELECTION_TEST } from "./PredefinedComboSelection.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

vi.mock(
  "../actions/createPredefinedComboReservationAction",
  () => ({
    createPredefinedComboReservationAction: vi.fn(),
  })
);

describe("predefined combo reservation submission", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits the persisted combo ID with reservation details only", async () => {
    vi.mocked(
      createPredefinedComboReservationAction
    ).mockResolvedValue({
      ok: true,
      reservationId:
        PREDEFINED_COMBO_SELECTION_TEST.SUCCESS_RESERVATION_ID,
    });
    const page = await selectPredefinedCombo(
      PREDEFINED_COMBO_SELECTION_FIXTURE.COMBO.id
    );
    await page.fillCustomerName(
      PREDEFINED_COMBO_SELECTION_TEST.CUSTOMER_NAME
    );
    await page.submit();

    expect(
      createPredefinedComboReservationAction
    ).toHaveBeenCalledWith({
      comboId: PREDEFINED_COMBO_SELECTION_FIXTURE.COMBO.id,
      customerName:
        PREDEFINED_COMBO_SELECTION_TEST.CUSTOMER_NAME,
      date: RESERVATION_FORM_VIEW_TEST.DATE,
      durationHours: 1,
      guideIds: [],
      peopleCount: 1,
      time: "09:00",
    });
  });
});
