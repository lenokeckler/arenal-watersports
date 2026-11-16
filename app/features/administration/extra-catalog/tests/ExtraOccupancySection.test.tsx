import { beforeEach, describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import {
  FAKE_OCCUPIED_CATEGORY_ID,
  FAKE_OCCUPIED_CATEGORY_NAME,
  FAKE_OCCUPIED_QUANTITY_TEXT,
} from "./Extra.constants";
import {
  CREATE_FORM_PROPS,
  EXTRA_FORM_SUCCESS_RESULT,
  LOCKED_EDIT_FORM_PROPS,
  UNLOCKED_OCCUPYING_EDIT_FORM_PROPS,
  VALID_EXTRA_FORM_VALUES,
} from "./ExtraForm.constants";
import {
  createExtraMock,
  updateExtraMock,
} from "./extraForm.harness";
import { renderExtraFormView } from "./renderExtraFormView";

describe("ExtraOccupancySection", () => {
  beforeEach(() => {
    createExtraMock.mockReset();
    updateExtraMock.mockReset();
    createExtraMock.mockResolvedValue(
      EXTRA_FORM_SUCCESS_RESULT
    );
    updateExtraMock.mockResolvedValue(
      EXTRA_FORM_SUCCESS_RESULT
    );
  });

  it("starts off, with no category or quantity fields", () => {
    const page = renderExtraFormView(CREATE_FORM_PROPS);

    expect(page.getOccupancyToggle()).not.toBeChecked();
    expect(page.queryCategorySelect()).toBeNull();
    expect(page.queryQuantityField()).toBeNull();
  });

  it("shows the category and quantity fields once the toggle is on", async () => {
    const page = renderExtraFormView(CREATE_FORM_PROPS);

    await page.toggleOccupancy();

    expect(page.getCategorySelect()).toBeEnabled();
    expect(page.getQuantityField()).toBeEnabled();
  });

  it("preloads the occupied category and quantity when editing", () => {
    const page = renderExtraFormView(
      UNLOCKED_OCCUPYING_EDIT_FORM_PROPS
    );

    expect(page.getOccupancyToggle()).toBeChecked();
    expect(page.getCategorySelect()).toHaveValue(
      FAKE_OCCUPIED_CATEGORY_ID
    );
    expect(page.getQuantityField()).toHaveValue(
      FAKE_OCCUPIED_QUANTITY_TEXT
    );
  });

  it("sends the chosen category and quantity on submit", async () => {
    const page = renderExtraFormView(CREATE_FORM_PROPS);

    await page.typeName(VALID_EXTRA_FORM_VALUES.name);
    await page.typePrice(
      CURRENCY_CODE.USD,
      VALID_EXTRA_FORM_VALUES.priceUsd
    );
    await page.toggleOccupancy();
    await page.chooseCategory(FAKE_OCCUPIED_CATEGORY_NAME);
    await page.typeQuantity(FAKE_OCCUPIED_QUANTITY_TEXT);
    await page.submit();

    expect(createExtraMock).toHaveBeenCalledWith(
      expect.objectContaining({
        occupiesCategoryId: FAKE_OCCUPIED_CATEGORY_ID,
        occupiesQuantity: FAKE_OCCUPIED_QUANTITY_TEXT,
      })
    );
  });

  it("shows the group error when only the category is chosen", async () => {
    const page = renderExtraFormView(CREATE_FORM_PROPS);

    await page.typeName(VALID_EXTRA_FORM_VALUES.name);
    await page.typePrice(
      CURRENCY_CODE.USD,
      VALID_EXTRA_FORM_VALUES.priceUsd
    );
    await page.toggleOccupancy();
    await page.chooseCategory(FAKE_OCCUPIED_CATEGORY_NAME);
    await page.submit();

    expect(
      page.getError(EXTRA_OCCUPANCY_COPY.INCOMPLETE_ERROR)
    ).toBeInTheDocument();
    expect(createExtraMock).not.toHaveBeenCalled();
  });

  it("shows the error the server returns for the occupancy", async () => {
    updateExtraMock.mockResolvedValue({
      status: EXTRA_MUTATION_STATUS.ERROR,
      occupancyError: EXTRA_OCCUPANCY_COPY.LOCKED_ERROR,
    });
    const page = renderExtraFormView(
      UNLOCKED_OCCUPYING_EDIT_FORM_PROPS
    );

    await page.submit();

    expect(
      page.getError(EXTRA_OCCUPANCY_COPY.LOCKED_ERROR)
    ).toBeInTheDocument();
  });

  it("disables the occupancy fields and explains why when a reservation uses the extra", () => {
    const page = renderExtraFormView(
      LOCKED_EDIT_FORM_PROPS
    );

    expect(page.getOccupancyToggle()).toBeDisabled();
    expect(page.getCategorySelect()).toBeDisabled();
    expect(page.getQuantityField()).toBeDisabled();
    expect(
      page.getError(EXTRA_OCCUPANCY_COPY.LOCKED_NOTE)
    ).toBeInTheDocument();
  });

  it("clears the category and quantity when the toggle is turned off", async () => {
    const page = renderExtraFormView(
      UNLOCKED_OCCUPYING_EDIT_FORM_PROPS
    );

    await page.toggleOccupancy();
    await page.submit();

    expect(updateExtraMock).toHaveBeenCalledWith(
      expect.objectContaining({
        occupiesCategoryId: STRING.Empty,
        occupiesQuantity: STRING.Empty,
      })
    );
  });
});
