import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { COMBO_AUDIENCE_OPTION_LABEL } from "../constants/ComboAudienceOptionCopy.constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import {
  COMBO_PRICE_LABEL,
  COMBO_PRICE_PLACEHOLDER,
} from "../constants/ComboPriceFieldCopy.constants";
import type { ComboAudience } from "../models/ComboAudience.type";

const ARIA_PRESSED_ATTRIBUTE = "aria-pressed";
const ARIA_PRESSED_TRUE = "true";

export const createComboFormPage = () => {
  const user = userEvent.setup();

  const getButton = (name: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, { name });

  const queryRow = (rowNumber: number) =>
    screen.queryByRole(ARIA_ROLE.GROUP, {
      name: `${COMBO_FORM_COPY.ITEM_ROW_LABEL} ${rowNumber.toString()}`,
    });

  const getRow = (rowNumber: number) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: `${COMBO_FORM_COPY.ITEM_ROW_LABEL} ${rowNumber.toString()}`,
      })
    );

  const getNameField = () =>
    screen.getByLabelText(COMBO_FORM_COPY.NAME_LABEL, {
      exact: false,
    });

  const getPriceField = (audience: ComboAudience) =>
    screen.getByLabelText(COMBO_PRICE_LABEL[audience]);

  const getCategoryField = (rowNumber: number) =>
    getRow(rowNumber).getByLabelText(
      COMBO_FORM_COPY.CATEGORY_LABEL,
      { exact: false }
    );

  const getQuantityField = (rowNumber: number) =>
    getRow(rowNumber).getByLabelText(
      COMBO_FORM_COPY.QUANTITY_LABEL
    );

  const getAudienceButton = (audience: ComboAudience) =>
    getButton(COMBO_AUDIENCE_OPTION_LABEL[audience]);

  const typeInto = async (
    field: HTMLElement,
    text: string
  ): Promise<void> => {
    await user.clear(field);
    await user.type(field, text);
  };

  return {
    clickAdd: () =>
      user.click(
        getButton(COMBO_FORM_COPY.ADD_ITEM_BUTTON)
      ),
    clickAudience: (audience: ComboAudience) =>
      user.click(getAudienceButton(audience)),
    clickBack: () =>
      user.click(getButton(COMBO_FORM_COPY.BACK_BUTTON)),
    clickRemove: (rowNumber: number) =>
      user.click(
        getRow(rowNumber).getByRole(ARIA_ROLE.BUTTON, {
          name: COMBO_FORM_COPY.REMOVE_ITEM_BUTTON,
        })
      ),
    getAddButton: () =>
      getButton(COMBO_FORM_COPY.ADD_ITEM_BUTTON),
    getAudienceButton,
    getBackButton: () =>
      getButton(COMBO_FORM_COPY.BACK_BUTTON),
    getBanner: () => screen.queryByRole(ARIA_ROLE.ALERT),
    getCategoryField,
    getNameField,
    getPriceField,
    getPriceFieldByPlaceholder: (audience: ComboAudience) =>
      screen.getByPlaceholderText(
        COMBO_PRICE_PLACEHOLDER[audience]
      ),
    getQuantityField,
    getRemoveButton: (rowNumber: number) =>
      getRow(rowNumber).getByRole(ARIA_ROLE.BUTTON, {
        name: COMBO_FORM_COPY.REMOVE_ITEM_BUTTON,
      }),
    getSavingButton: () =>
      screen.queryByRole(ARIA_ROLE.BUTTON, {
        name: COMBO_FORM_COPY.SAVING_TEXT,
      }),
    getSubmitButton: () =>
      getButton(COMBO_FORM_COPY.SAVE_BUTTON),
    isAudiencePressed: (audience: ComboAudience) =>
      getAudienceButton(audience).getAttribute(
        ARIA_PRESSED_ATTRIBUTE
      ) === ARIA_PRESSED_TRUE,
    queryAudienceButton: (audience: ComboAudience) =>
      screen.queryByRole(ARIA_ROLE.BUTTON, {
        name: COMBO_AUDIENCE_OPTION_LABEL[audience],
      }),
    queryLockedAudience: (audience: ComboAudience) =>
      screen.queryByText(
        COMBO_AUDIENCE_OPTION_LABEL[audience]
      ),
    queryRow,
    queryText: (text: string) => screen.queryByText(text),
    queryTitle: (title: string) =>
      screen.queryByRole(ARIA_ROLE.HEADING, {
        name: title,
      }),
    selectCategory: (
      rowNumber: number,
      categoryId: string
    ) =>
      user.selectOptions(
        getCategoryField(rowNumber),
        categoryId
      ),
    submit: () =>
      user.click(getButton(COMBO_FORM_COPY.SAVE_BUTTON)),
    typeName: (text: string) =>
      typeInto(getNameField(), text),
    typePrice: (audience: ComboAudience, text: string) =>
      typeInto(getPriceField(audience), text),
    typeQuantity: (rowNumber: number, text: string) =>
      typeInto(getQuantityField(rowNumber), text),
  };
};
