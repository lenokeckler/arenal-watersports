import { expect, it } from "vitest";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { createCustomComboPage } from "./CustomCombo.page";
import { renderReservationFormWithCombos } from "./ReservationFormView.fixture";

it("shows the missing rental tariff and prevents adding that category", async () => {
  const page = renderReservationFormWithCombos(
    undefined,
    [],
    [
      {
        hasIndividualTariff: false,
        id: RESERVATION_FORM_VIEW_TEST.CATEGORY_ID,
        isGuideOnly: false,
        isInterchangeable: true,
        name: RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME,
      },
    ]
  );
  const comboPage = createCustomComboPage(document.body);
  await comboPage.selectCombo();

  expect(
    comboPage.getMissingTariffStatus(
      RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME
    )
  ).toHaveTextContent(
    CUSTOM_COMBO_FORM_COPY.MISSING_RENTAL_TARIFF
  );
  expect(
    comboPage.queryAddCategoryButton(
      RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME
    )
  ).not.toBeInTheDocument();
  expect(page.getSubmitButton()).toBeEnabled();
});

it("keeps missing tariff eligibility when a unit category duplicates it", async () => {
  const page = renderReservationFormWithCombos(
    undefined,
    [],
    [
      {
        hasIndividualTariff: false,
        id: RESERVATION_FORM_VIEW_TEST.CATEGORY_ID,
        isGuideOnly: false,
        isInterchangeable: true,
        name: RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME,
      },
    ],
    [
      {
        id: RESERVATION_FORM_VIEW_TEST.CATEGORY_ID,
        isGuideOnly: false,
        name: RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME,
      },
    ]
  );
  const comboPage = createCustomComboPage(document.body);
  await comboPage.selectCombo();

  expect(
    comboPage.getMissingTariffStatus(
      RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME
    )
  ).toHaveTextContent(
    CUSTOM_COMBO_FORM_COPY.MISSING_RENTAL_TARIFF
  );
  expect(
    comboPage.queryAddCategoryButton(
      RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME
    )
  ).not.toBeInTheDocument();
  expect(page.getSubmitButton()).toBeEnabled();
});
