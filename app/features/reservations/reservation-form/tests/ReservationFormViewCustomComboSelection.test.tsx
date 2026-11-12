import { describe, expect, it } from "vitest";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { CUSTOM_COMBO_TEST } from "./CustomCombo.constants";
import { createCustomComboPage } from "./CustomCombo.page";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

describe("custom combo selection", () => {
  it("offers guide-only categories and shows the no-guide state", async () => {
    renderReservationForm(true, true, true);
    const page = createCustomComboPage(document.body);
    await page.selectCombo();

    expect(
      page.getGuideOnlyCategoryHeading(
        RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME
      )
    ).toBeInTheDocument();
    expect(page.getNoGuideState()).toHaveTextContent(
      CUSTOM_COMBO_FORM_COPY.NO_GUIDE
    );
    expect(
      page.queryEquipmentQuantityNote()
    ).not.toBeInTheDocument();
  });

  it("adds, changes, and removes equipment quantities", async () => {
    renderReservationForm(true, true, true);
    const page = createCustomComboPage(document.body);
    const categoryName =
      RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME;
    await page.selectCombo();
    await page.addCategory(categoryName);
    expect(
      page.getCategoryQuantity(
        categoryName,
        CUSTOM_COMBO_TEST.INITIAL_QUANTITY
      )
    ).toBeInTheDocument();

    await page.increaseCategory(categoryName);
    expect(
      page.getCategoryQuantity(
        categoryName,
        CUSTOM_COMBO_TEST.INCREMENTED_QUANTITY
      )
    ).toBeInTheDocument();
    await page.decreaseCategory(categoryName);
    await page.decreaseCategory(categoryName);
    expect(
      page.queryCategorySelection(categoryName)
    ).not.toBeInTheDocument();
  });

  it("keeps rental and tour controls intact", () => {
    const page = renderReservationForm();
    expect(
      page.getReservationTypeDescription(
        RESERVATION_TYPE_COPY.OPTIONS.RENTAL.description
      )
    ).toBeInTheDocument();
    expect(
      page.getReservationTypeDescription(
        RESERVATION_TYPE_COPY.OPTIONS.TOUR.description
      )
    ).toBeInTheDocument();
  });
});
