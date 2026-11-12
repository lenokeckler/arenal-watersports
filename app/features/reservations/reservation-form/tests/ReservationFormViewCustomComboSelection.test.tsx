import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createCustomComboReservationAction } from "../actions/createCustomComboReservationAction";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_ERROR_SCROLL_OPTIONS } from "../constants/ReservationFormUi.constants";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { CUSTOM_COMBO_TEST } from "./CustomCombo.constants";
import { createCustomComboPage } from "./CustomCombo.page";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

vi.mock(
  "../actions/createCustomComboReservationAction",
  () => ({
    createCustomComboReservationAction: vi.fn(),
  })
);

beforeEach(() => vi.clearAllMocks());

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

  it("shows and focuses the equipment selection error on submission", async () => {
    renderReservationForm(true, true, true);
    const page = createCustomComboPage(document.body);
    await page.selectCombo();
    expect(page.getSubmitButton()).toBeEnabled();

    await page.submit();

    const selectionError =
      page.getEquipmentSelectionError();
    const scrollIntoView = vi.fn();
    selectionError.scrollIntoView = scrollIntoView;

    expect(selectionError).toHaveTextContent(
      RESERVATION_FORM_COPY[RESERVATION_FORM_FIELD.ITEMS]
    );
    await page.submit();

    expect(page.getFocusedElement()).toBe(selectionError);
    expect(scrollIntoView).toHaveBeenCalledWith(
      RESERVATION_FORM_ERROR_SCROLL_OPTIONS
    );
    expect(
      createCustomComboReservationAction
    ).not.toHaveBeenCalled();
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
