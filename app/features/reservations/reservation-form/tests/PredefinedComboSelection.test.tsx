import { describe, expect, it } from "vitest";
import {
  PREDEFINED_COMBO_SELECTION_FIXTURE,
  selectPredefinedCombo,
} from "./PredefinedComboSelection.fixture";
import { PREDEFINED_COMBO_SELECTION_TEST } from "./PredefinedComboSelection.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

describe("predefined combo summary", () => {
  it("shows saved price and equipment quantities without a guide", async () => {
    const page = await selectPredefinedCombo(
      PREDEFINED_COMBO_SELECTION_FIXTURE.COMBO.id
    );
    const summary = page.getComboSummary();

    expect(summary).toHaveTextContent(
      PREDEFINED_COMBO_SELECTION_FIXTURE.COMBO.name
    );
    expect(summary).toHaveTextContent(
      RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME
    );
    expect(summary).toHaveTextContent(
      PREDEFINED_COMBO_SELECTION_TEST.PRICE_TEXT
    );
    expect(summary).toHaveTextContent(
      PREDEFINED_COMBO_SELECTION_TEST.ITEM_COUNT_EXPECTED
    );
    expect(page.getNoGuideStatus()).toBeInTheDocument();
    expect(
      page.getGuideAssignmentField()
    ).not.toBeInTheDocument();
  });

  it("shows guide assignment for a package with a guide component", async () => {
    const page = await selectPredefinedCombo(
      PREDEFINED_COMBO_SELECTION_FIXTURE.GUIDE_COMBO.id,
      PREDEFINED_COMBO_SELECTION_FIXTURE.GUIDE_COMBO
    );

    expect(
      page.getGuideAssignmentField()
    ).toBeInTheDocument();
    expect(page.getNoGuideStatus()).not.toBeInTheDocument();
  });
});
