import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import CustomComboUnitSelector from "../components/CustomComboUnitSelector";
import { CUSTOM_COMBO_UNIT_SELECTOR_TEST } from "./CustomComboUnitSelector.constants";
import { createCustomComboUnitSelectorPage } from "./CustomComboUnitSelector.page";

describe("CustomComboUnitSelector", () => {
  it("lets Reservations choose a concrete available unit", () => {
    const onChange = vi.fn();
    render(
      <CustomComboUnitSelector
        categoryId={
          CUSTOM_COMBO_UNIT_SELECTOR_TEST.CATEGORY_ID
        }
        categoryName={
          CUSTOM_COMBO_UNIT_SELECTOR_TEST.CATEGORY_NAME
        }
        availableUnits={
          CUSTOM_COMBO_UNIT_SELECTOR_TEST.AVAILABLE_UNITS
        }
        hasError={false}
        isLoading={false}
        isScheduleValid
        selectedUnitId=""
        onChange={onChange}
      />
    );
    const page = createCustomComboUnitSelectorPage();

    page.selectFirstAvailableUnit();

    expect(onChange).toHaveBeenCalledWith(
      CUSTOM_COMBO_UNIT_SELECTOR_TEST.AVAILABLE_UNITS[0].id
    );
  });

  it("shows an error when availability cannot be checked", () => {
    render(
      <CustomComboUnitSelector
        categoryId={
          CUSTOM_COMBO_UNIT_SELECTOR_TEST.CATEGORY_ID
        }
        categoryName={
          CUSTOM_COMBO_UNIT_SELECTOR_TEST.CATEGORY_NAME
        }
        availableUnits={[]}
        hasError
        isLoading={false}
        isScheduleValid
        selectedUnitId=""
        onChange={vi.fn()}
      />
    );

    expect(
      createCustomComboUnitSelectorPage().getAvailabilityError()
    ).toBeInTheDocument();
  });

  it("disables selection when the schedule is incomplete", () => {
    render(
      <CustomComboUnitSelector
        categoryId={
          CUSTOM_COMBO_UNIT_SELECTOR_TEST.CATEGORY_ID
        }
        categoryName={
          CUSTOM_COMBO_UNIT_SELECTOR_TEST.CATEGORY_NAME
        }
        availableUnits={
          CUSTOM_COMBO_UNIT_SELECTOR_TEST.AVAILABLE_UNITS
        }
        hasError={false}
        isLoading={false}
        isScheduleValid={false}
        selectedUnitId=""
        onChange={vi.fn()}
      />
    );

    expect(
      screen.getByLabelText(
        `${RESERVATION_FORM_UI_COPY.UNIT}: ${CUSTOM_COMBO_UNIT_SELECTOR_TEST.CATEGORY_NAME}`
      )
    ).toBeDisabled();
  });
});
