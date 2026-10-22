import { describe, expect, it } from "vitest";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import { PREDEFINED_COMBO_SELECTION_FIXTURE } from "./PredefinedComboSelection.fixture";
import { PREDEFINED_COMBO_SELECTION_TEST } from "./PredefinedComboSelection.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import { RESERVATION_GUIDE_SELECTION_TEST } from "./ReservationGuideSelection.constants";
import { createPredefinedComboSelectionPage } from "./PredefinedComboSelection.page";

describe("predefined combo catalog without categories", () => {
  it("allows a selected saved combo when categories are empty", async () => {
    const categories: ReservationCategoryOption[] = [];
    renderReservationForm(
      {
        kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
        guides: [
          {
            id: RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
            name: RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME,
          },
        ],
      },
      [PREDEFINED_COMBO_SELECTION_FIXTURE.COMBO],
      categories
    );
    const page = createPredefinedComboSelectionPage(
      document.body
    );
    await page.selectComboReservation();
    await page.selectMode(
      PREDEFINED_COMBO_SELECTION_TEST.COPY.PREDEFINED_MODE
    );
    await page.selectCombo(
      PREDEFINED_COMBO_SELECTION_FIXTURE.COMBO.id
    );

    expect(page.getSubmitButton()).toBeEnabled();
  });
});
