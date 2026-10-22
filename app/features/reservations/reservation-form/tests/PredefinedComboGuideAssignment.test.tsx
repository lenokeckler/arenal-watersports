import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createPredefinedComboReservationAction } from "../actions/createPredefinedComboReservationAction";
import { PREDEFINED_COMBO_SELECTION_FIXTURE } from "./PredefinedComboSelection.fixture";
import { PREDEFINED_COMBO_SELECTION_TEST } from "./PredefinedComboSelection.constants";
import { prepareGuideAssignedPredefinedComboSubmission } from "./PredefinedComboGuideAssignment.fixture";

vi.mock(
  "../actions/createPredefinedComboReservationAction",
  () => ({
    createPredefinedComboReservationAction: vi.fn(),
  })
);

describe("predefined combo guide assignments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("clears custom guide assignments before submitting a package without a guide", async () => {
    vi.mocked(
      createPredefinedComboReservationAction
    ).mockResolvedValue({
      ok: true,
      reservationId:
        PREDEFINED_COMBO_SELECTION_TEST.SUCCESS_RESERVATION_ID,
    });
    const page =
      await prepareGuideAssignedPredefinedComboSubmission();
    await page.submit();

    expect(
      createPredefinedComboReservationAction
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        comboId:
          PREDEFINED_COMBO_SELECTION_FIXTURE.COMBO.id,
        guideIds: [],
      })
    );
  });
});
