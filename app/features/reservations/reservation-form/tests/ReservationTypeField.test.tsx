import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { STRING } from "@/app/constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";

vi.mock(
  "../actions/getAvailableReservationUnitsAction",
  () => ({
    getAvailableReservationUnitsAction: vi.fn(),
  })
);

beforeEach(() => {
  vi.mocked(
    getAvailableReservationUnitsAction
  ).mockResolvedValue({
    availableQuantity: null,
    availableUnits: [],
  });
});

describe("ReservationTypeField", () => {
  it("defaults to rental and hides guide-only categories", () => {
    const page = renderReservationForm(true, true, true);

    expect(
      page.getReservationTypeRadio(
        RESERVATION_TYPE_COPY.OPTIONS.RENTAL.label
      )
    ).toBeChecked();
    expect(
      page.queryCategoryOption(
        RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID
      )
    ).not.toBeInTheDocument();
  });

  it("offers guide-only categories only for tours", async () => {
    const page = renderReservationForm(true, true, true);

    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await page.selectCategory(
      RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID
    );

    expect(
      page.getSelectedCategoryOption()
    ).toHaveAccessibleName(
      RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME
    );
  });

  it.each([
    RESERVATION_TYPE_COPY.OPTIONS.RENTAL.label,
    RESERVATION_TYPE_COPY.OPTIONS.COMBO.label,
  ])(
    "clears a guide-only selection when switching to %s",
    async (reservationTypeLabel) => {
      const page = renderReservationForm(true, true, true);

      await page.selectReservationType(
        RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
      );
      await page.selectCategory(
        RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID
      );
      await page.selectReservationType(
        reservationTypeLabel
      );

      expect(
        page.getSelectedCategoryOption()
      ).not.toBeInTheDocument();
      expect(
        page.queryCategoryOption(
          RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID
        )
      ).not.toBeInTheDocument();
      expect(
        await page.findStatusMessage()
      ).toHaveTextContent(
        reservationTypeLabel ===
          RESERVATION_TYPE_COPY.OPTIONS.COMBO.label
          ? CUSTOM_COMBO_FORM_COPY.NO_GUIDE
          : RESERVATION_FORM_UI_COPY.RESERVATION_TYPE_SELECTION_CLEARED
      );
    }
  );
});

describe("concrete unit reset", () => {
  it("clears a selected concrete unit when changing to a non-tour type", async () => {
    vi.mocked(
      getAvailableReservationUnitsAction
    ).mockResolvedValue({
      availableQuantity: null,
      availableUnits: [
        {
          code: RESERVATION_FORM_VIEW_TEST.UNIT_CODE,
          id: RESERVATION_FORM_VIEW_TEST.UNIT_ID,
        },
      ],
    });
    const page = renderReservationForm(true, true, true);

    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await page.selectCategory(
      RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID
    );
    await page.findUnitOption();
    await page.selectUnit(
      RESERVATION_FORM_VIEW_TEST.UNIT_ID
    );
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.RENTAL.label
    );
    expect(
      await page.findStatusMessage()
    ).toHaveTextContent(
      RESERVATION_FORM_UI_COPY.RESERVATION_TYPE_SELECTION_CLEARED
    );
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await page.selectCategory(
      RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID
    );
    await page.findUnitOption();

    expect(page.getUnitSelect()).toHaveValue(STRING.Empty);
  });
});

describe("combo reservation type", () => {
  it("offers combo without adding package composition fields", () => {
    const page = renderReservationForm();

    expect(
      page.getReservationTypeRadio(
        RESERVATION_TYPE_COPY.OPTIONS.COMBO.label
      )
    ).toBeInTheDocument();
    expect(
      page.getReservationTypeRadio(
        RESERVATION_TYPE_COPY.OPTIONS.COMBO.label
      )
    ).not.toBeChecked();
  });
});
