import { describe, expect, it, vi } from "vitest";
import { createPredefinedComboReservationAction } from "../actions/createPredefinedComboReservationAction";
import { PREDEFINED_COMBO_SELECTION_FIXTURE } from "./PredefinedComboSelection.fixture";
import { PREDEFINED_COMBO_SELECTION_TEST } from "./PredefinedComboSelection.constants";
import { createPredefinedComboSelectionPage } from "./PredefinedComboSelection.page";
import { renderReservationForm } from "./ReservationFormView.fixture";

vi.mock(
  "../actions/createPredefinedComboReservationAction",
  () => ({
    createPredefinedComboReservationAction: vi.fn(),
  })
);

describe("predefined combo selection validation", () => {
  it("shows and clears an error when a package is not selected", async () => {
    renderReservationForm(undefined, [
      PREDEFINED_COMBO_SELECTION_FIXTURE.COMBO,
    ]);
    const page = createPredefinedComboSelectionPage(
      document.body
    );
    await page.selectComboReservation();
    await page.selectMode(
      PREDEFINED_COMBO_SELECTION_TEST.COPY.PREDEFINED_MODE
    );
    await page.submit();

    expect(document.body).toHaveTextContent(
      PREDEFINED_COMBO_SELECTION_TEST.COPY.NO_SELECTION
    );
    expect(
      createPredefinedComboReservationAction
    ).not.toHaveBeenCalled();

    await page.selectCombo(
      PREDEFINED_COMBO_SELECTION_FIXTURE.COMBO.id
    );

    expect(document.body).not.toHaveTextContent(
      PREDEFINED_COMBO_SELECTION_TEST.COPY.NO_SELECTION
    );
  });
});
