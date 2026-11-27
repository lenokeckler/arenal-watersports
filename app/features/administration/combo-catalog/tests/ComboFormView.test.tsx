import {
  pushMock,
  saveComboMock,
} from "./comboForm.harness";
import { render, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS, STRING } from "@/app/constants";
import { COMBO_AUDIENCE } from "../constants/ComboAudience.constants";
import { COMBO_AUDIENCE_ORDER } from "../constants/ComboAudienceOrder.constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import { COMBO_PRICE_ERROR_COPY } from "../constants/ComboPriceErrorCopy.constants";
import ComboFormView from "../ComboFormView";
import type { ComboFormViewProps } from "../models/ComboFormViewProps.interface";
import type { SaveComboResult } from "../models/SaveComboResult.interface";
import { NATIONAL_PRICE } from "./Combo.constants";
import { createComboFormPage } from "./ComboForm.page";
import {
  CREATE_FORM_PROPS,
  DEFAULT_COMBO_FOR_EDIT,
  EDIT_FORM_PROPS,
  EXPECTED_SAVE_PAYLOAD,
  FAKE_CATEGORY_ID,
  FAKE_COMBO_NAME,
  FIRST_ITEM_QUANTITY,
  FIRST_ROW_NUMBER,
  SAVE_FAILURE_RESULT,
  SAVE_SUCCESS_RESULT,
  SECOND_CATEGORY_ID,
  SECOND_ITEM_QUANTITY,
  SECOND_ROW_NUMBER,
  SERVER_ERROR_MESSAGE,
} from "./ComboForm.constants";
import { createDeferred } from "./createDeferred";

const renderComboFormView = (
  props: ComboFormViewProps = CREATE_FORM_PROPS
) => {
  render(<ComboFormView {...props} />);
  return createComboFormPage();
};

describe("ComboFormView", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    saveComboMock.mockResolvedValue(SAVE_SUCCESS_RESULT);
  });

  it("renders the create form with an empty name, one empty row and the audience chooser", () => {
    const page = renderComboFormView();

    expect(
      page.queryTitle(COMBO_FORM_COPY.TITLE_CREATE)
    ).toBeInTheDocument();
    expect(page.getNameField()).toHaveValue(STRING.Empty);
    expect(
      page.getPriceField(COMBO_AUDIENCE.NATIONAL)
    ).toHaveValue(STRING.Empty);
    COMBO_AUDIENCE_ORDER.forEach((audience) => {
      expect(
        page.queryAudienceButton(audience)
      ).toBeInTheDocument();
    });
    expect(
      page.isAudiencePressed(COMBO_AUDIENCE.NATIONAL)
    ).toBe(true);
    expect(
      page.isAudiencePressed(COMBO_AUDIENCE.FOREIGN)
    ).toBe(false);
    expect(
      page.getCategoryField(FIRST_ROW_NUMBER)
    ).toHaveValue(STRING.Empty);
    expect(page.queryRow(SECOND_ROW_NUMBER)).toBeNull();
  });

  it("renders the edit form with the saved values and the audience as read-only text", () => {
    const page = renderComboFormView(EDIT_FORM_PROPS);

    expect(
      page.queryTitle(COMBO_FORM_COPY.TITLE_EDIT)
    ).toBeInTheDocument();
    expect(page.getNameField()).toHaveValue(
      FAKE_COMBO_NAME
    );
    expect(
      page.getPriceField(DEFAULT_COMBO_FOR_EDIT.audience)
    ).toHaveValue(
      DEFAULT_COMBO_FOR_EDIT.packagePrice?.toString()
    );
    expect(
      page.getCategoryField(FIRST_ROW_NUMBER)
    ).toHaveValue(FAKE_CATEGORY_ID);
    expect(
      page.getQuantityField(FIRST_ROW_NUMBER)
    ).toHaveValue(FIRST_ITEM_QUANTITY.toString());
    COMBO_AUDIENCE_ORDER.forEach((audience) => {
      expect(page.queryAudienceButton(audience)).toBeNull();
    });
    expect(
      page.queryLockedAudience(
        DEFAULT_COMBO_FOR_EDIT.audience
      )
    ).toBeInTheDocument();
  });

  it("adds a row with Agregar equipo and removes it with Quitar", async () => {
    const page = renderComboFormView();

    await page.clickAdd();
    expect(
      page.queryRow(SECOND_ROW_NUMBER)
    ).toBeInTheDocument();
    await page.clickRemove(SECOND_ROW_NUMBER);

    expect(page.queryRow(SECOND_ROW_NUMBER)).toBeNull();
    expect(
      page.queryRow(FIRST_ROW_NUMBER)
    ).toBeInTheDocument();
  });

  it("asks for at least one item after the last row is removed and the form is submitted", async () => {
    const page = renderComboFormView();
    await page.clickRemove(FIRST_ROW_NUMBER);
    expect(
      page.queryText(COMBO_FORM_COPY.ITEMS_REQUIRED_ERROR)
    ).toBeNull();

    await page.submit();

    expect(page.queryRow(FIRST_ROW_NUMBER)).toBeNull();
    expect(
      page.queryText(COMBO_FORM_COPY.ITEMS_REQUIRED_ERROR)
    ).toBeInTheDocument();
    expect(saveComboMock).not.toHaveBeenCalled();
  });

  it("shows every validation message after a failed submit and saves nothing", async () => {
    const page = renderComboFormView();
    expect(
      page.queryText(COMBO_FORM_COPY.NAME_REQUIRED_ERROR)
    ).toBeNull();

    await page.submit();

    [
      COMBO_FORM_COPY.NAME_REQUIRED_ERROR,
      COMBO_PRICE_ERROR_COPY[COMBO_AUDIENCE.NATIONAL]
        .required,
      COMBO_FORM_COPY.CATEGORY_REQUIRED_ERROR,
      COMBO_FORM_COPY.QUANTITY_INVALID_ERROR,
    ].forEach((message) => {
      expect(page.queryText(message)).toBeInTheDocument();
    });
    expect(saveComboMock).not.toHaveBeenCalled();
  });

  it("creates the combo with what was typed", async () => {
    const page = renderComboFormView();
    await page.typeName(FAKE_COMBO_NAME);
    await page.typePrice(
      COMBO_AUDIENCE.NATIONAL,
      NATIONAL_PRICE.toString()
    );
    await page.selectCategory(
      FIRST_ROW_NUMBER,
      FAKE_CATEGORY_ID
    );
    await page.typeQuantity(
      FIRST_ROW_NUMBER,
      FIRST_ITEM_QUANTITY.toString()
    );
    await page.clickAdd();
    await page.selectCategory(
      SECOND_ROW_NUMBER,
      SECOND_CATEGORY_ID
    );
    await page.typeQuantity(
      SECOND_ROW_NUMBER,
      SECOND_ITEM_QUANTITY.toString()
    );

    await page.submit();

    expect(saveComboMock).toHaveBeenCalledWith(
      EXPECTED_SAVE_PAYLOAD
    );
  });

  it("goes back to the list from Regresar without saving", async () => {
    const page = renderComboFormView();

    await page.clickBack();

    expect(pushMock).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.COMBOS
    );
    expect(saveComboMock).not.toHaveBeenCalled();
  });

  it("shows the saving text and locks the form while the combo is saved", async () => {
    const deferred = createDeferred<SaveComboResult>();
    saveComboMock.mockReturnValue(deferred.promise);
    const page = renderComboFormView(EDIT_FORM_PROPS);

    await page.submit();

    await waitFor(() =>
      expect(page.getSavingButton()).toBeDisabled()
    );
    expect(page.getNameField()).toBeDisabled();
    expect(
      page.getPriceField(DEFAULT_COMBO_FOR_EDIT.audience)
    ).toBeDisabled();
    expect(page.getAddButton()).toBeDisabled();
    expect(page.getBackButton()).toBeDisabled();
    expect(
      page.getRemoveButton(FIRST_ROW_NUMBER)
    ).toBeDisabled();
    expect(
      page.getCategoryField(FIRST_ROW_NUMBER)
    ).toBeDisabled();
    deferred.resolve(SAVE_SUCCESS_RESULT);
    await waitFor(() =>
      expect(page.getNameField()).toBeEnabled()
    );
  });

  it("keeps what was typed and shows the message of the action in the banner when saving fails", async () => {
    saveComboMock.mockResolvedValue(SAVE_FAILURE_RESULT);
    const page = renderComboFormView(EDIT_FORM_PROPS);

    await page.submit();

    expect(page.getBanner()).toHaveTextContent(
      SERVER_ERROR_MESSAGE
    );
    expect(page.getNameField()).toHaveValue(
      FAKE_COMBO_NAME
    );
    expect(page.getSubmitButton()).toBeEnabled();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
