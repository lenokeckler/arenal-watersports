import { expect, it } from "vitest";
import { within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { CUSTOM_COMBO_TEST } from "./CustomCombo.constants";
import { createCustomComboPage } from "./CustomCombo.page";
import { PREDEFINED_COMBO_SELECTION_TEST } from "./PredefinedComboSelection.constants";
import { PREDEFINED_COMBO_SELECTION_FIXTURE } from "./PredefinedComboSelection.fixture";
import { createPredefinedComboSelectionPage } from "./PredefinedComboSelection.page";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

it("explains that no saved packages are available", async () => {
  renderReservationForm();
  const page = createPredefinedComboSelectionPage(
    document.body
  );
  await page.selectComboReservation();
  await page.selectMode(
    PREDEFINED_COMBO_SELECTION_TEST.COPY.PREDEFINED_MODE
  );

  expect(page.getEmptyCatalogMessage()).toBeInTheDocument();
});

it("shows the package name and audience in the catalog option", async () => {
  const combo = PREDEFINED_COMBO_SELECTION_FIXTURE.COMBO;
  renderReservationForm(undefined, [combo]);
  const page = createPredefinedComboSelectionPage(
    document.body
  );
  await page.selectComboReservation();
  await page.selectMode(
    PREDEFINED_COMBO_SELECTION_TEST.COPY.PREDEFINED_MODE
  );

  const optionLabel = `${combo.name} · ${PREDEFINED_COMBO_SELECTION_TEST.COPY.AUDIENCE_NATIONAL}`;
  expect(
    within(page.getComboSelect()).getByRole(
      ARIA_ROLE.OPTION,
      {
        name: optionLabel,
      }
    )
  ).toBeInTheDocument();
});

it("continues to offer custom equipment selection", async () => {
  renderReservationForm();
  const predefinedComboPage =
    createPredefinedComboSelectionPage(document.body);
  await predefinedComboPage.selectComboReservation();
  await predefinedComboPage.selectMode(
    PREDEFINED_COMBO_SELECTION_TEST.COPY.PREDEFINED_MODE
  );
  await predefinedComboPage.selectMode(
    PREDEFINED_COMBO_SELECTION_TEST.COPY.CUSTOM_MODE
  );

  const customComboPage = createCustomComboPage(
    document.body
  );
  await customComboPage.addCategory(
    RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME
  );

  expect(
    customComboPage.getCategoryQuantity(
      RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME,
      CUSTOM_COMBO_TEST.INITIAL_QUANTITY
    )
  ).toBeInTheDocument();
});
