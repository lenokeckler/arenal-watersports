import { STRING } from "@/app/constants";
import { describe, expect, it } from "vitest";
import {
  renderReservationForm,
  reservationRouterBack,
} from "./ReservationFormView.fixture";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

describe("ReservationFormView duration selection", () => {
  it("shows the empty category state", () => {
    const page = renderReservationForm(false);
    expect(page.getEmptyCategories()).toBeInTheDocument();
  });

  it("selects an equipment category with its image", async () => {
    const page = renderReservationForm();

    await page.selectCategoryChoice(
      RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME
    );

    expect(
      page.getCategoryChoice(
        RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME
      )
    ).toHaveProperty("selected", true);
    expect(
      page.getEquipmentImage(STRING.Empty)
    ).toBeInTheDocument();
  });

  it("calls browser back from the calendar action", async () => {
    const page = renderReservationForm();

    await page.clickBack();

    expect(reservationRouterBack).toHaveBeenCalledOnce();
  });

  it("shows one selected preset and hides the custom field", async () => {
    const page = renderReservationForm();

    await page.selectDuration(
      RESERVATION_FORM_VIEW_TEST.PRESET_DURATION_LABEL
    );

    expect(
      page.queryCustomDurationInput()
    ).not.toBeInTheDocument();
    expect(
      page.getDurationOption(
        RESERVATION_FORM_VIEW_TEST.PRESET_DURATION_LABEL
      )
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      page.getDurationOption(
        RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_OPTION
      )
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("shows a blank field when custom duration is selected", async () => {
    const page = renderReservationForm();

    await page.selectDuration(
      RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_OPTION
    );
    expect(page.queryCustomDurationInput()).toHaveProperty(
      "value",
      ""
    );
  });

  it("preserves decimal input while typing", async () => {
    const page = renderReservationForm();

    await page.selectDuration(
      RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_OPTION
    );
    await page.typeCustomDuration(
      RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_HOURS
    );
    expect(page.queryCustomDurationInput()).toHaveProperty(
      "value",
      RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_HOURS
    );
  });

  it("clears the custom draft after selecting a preset", async () => {
    const page = renderReservationForm();

    await page.selectDuration(
      RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_OPTION
    );
    await page.typeCustomDuration(
      RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_HOURS
    );
    await page.selectDuration(
      RESERVATION_FORM_VIEW_TEST.SECOND_PRESET_DURATION_LABEL
    );
    expect(
      page.queryCustomDurationInput()
    ).not.toBeInTheDocument();
    await page.selectDuration(
      RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_OPTION
    );
    expect(page.queryCustomDurationInput()).toHaveProperty(
      "value",
      ""
    );
  });
});
