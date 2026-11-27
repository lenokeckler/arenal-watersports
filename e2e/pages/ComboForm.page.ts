import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { COMBO_AUDIENCE_OPTION_LABEL } from "@/app/features/administration/combo-catalog/constants/ComboAudienceOptionCopy.constants";
import { COMBO_FORM_COPY } from "@/app/features/administration/combo-catalog/constants/ComboFormCopy.constants";
import { COMBO_FORM_FIELD_ID } from "@/app/features/administration/combo-catalog/constants/ComboFormFieldId.constants";
import {
  COMBO_PRICE_LABEL,
  COMBO_PRICE_PLACEHOLDER,
} from "@/app/features/administration/combo-catalog/constants/ComboPriceFieldCopy.constants";
import type { ComboAudience } from "@/app/features/administration/combo-catalog/models/ComboAudience.type";
import { resolveComboEditPath } from "@/app/features/administration/combo-catalog/utils/resolveComboEditPath";

export const createComboFormPage = (page: Page) => {
  const goToCreate = async (): Promise<void> => {
    await page.goto(PATHS.ADMINISTRATION.COMBOS_NEW);
  };

  const goToEdit = async (
    comboId: string
  ): Promise<void> => {
    await page.goto(resolveComboEditPath(comboId));
  };

  const getNameInput = (): Locator =>
    page.locator(`#${COMBO_FORM_FIELD_ID.NAME}`);

  const getPriceInput = (
    audience: ComboAudience
  ): Locator =>
    page.getByLabel(COMBO_PRICE_LABEL[audience], {
      exact: true,
    });

  const getPriceInputByPlaceholder = (
    audience: ComboAudience
  ): Locator =>
    page.getByPlaceholder(
      COMBO_PRICE_PLACEHOLDER[audience]
    );

  const getAudienceButton = (
    audience: ComboAudience
  ): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: COMBO_AUDIENCE_OPTION_LABEL[audience],
      exact: true,
    });

  const getLockedAudience = (
    audience: ComboAudience
  ): Locator =>
    page
      .getByRole(ARIA_ROLE.GROUP, {
        name: COMBO_FORM_COPY.AUDIENCE_LABEL,
      })
      .getByText(COMBO_AUDIENCE_OPTION_LABEL[audience], {
        exact: true,
      });

  const getRow = (rowNumber: number): Locator =>
    page.getByRole(ARIA_ROLE.GROUP, {
      name: `${COMBO_FORM_COPY.ITEM_ROW_LABEL} ${rowNumber.toString()}`,
      exact: true,
    });

  const getCategorySelect = (rowNumber: number): Locator =>
    page.locator(
      `#${COMBO_FORM_FIELD_ID.ITEM_CATEGORY}-${rowNumber.toString()}`
    );

  const getQuantityInput = (rowNumber: number): Locator =>
    page.locator(
      `#${COMBO_FORM_FIELD_ID.ITEM_QUANTITY}-${rowNumber.toString()}`
    );

  const getMessage = (message: string): Locator =>
    page.getByText(message, { exact: true });

  const getBanner = (message: string): Locator =>
    page
      .getByRole(ARIA_ROLE.ALERT)
      .filter({ hasText: message });

  const fillName = async (value: string): Promise<void> => {
    await getNameInput().fill(value);
  };

  const chooseAudience = async (
    audience: ComboAudience
  ): Promise<void> => {
    await getAudienceButton(audience).click();
  };

  const fillPrice = async (
    audience: ComboAudience,
    value: string
  ): Promise<void> => {
    await getPriceInput(audience).fill(value);
  };

  const addEquipmentRow = async (): Promise<void> => {
    await page
      .getByRole(ARIA_ROLE.BUTTON, {
        name: COMBO_FORM_COPY.ADD_ITEM_BUTTON,
      })
      .click();
  };

  const chooseCategory = async (
    rowNumber: number,
    categoryName: string
  ): Promise<void> => {
    await getCategorySelect(rowNumber).selectOption({
      label: categoryName,
    });
  };

  const fillQuantity = async (
    rowNumber: number,
    value: string
  ): Promise<void> => {
    await getQuantityInput(rowNumber).fill(value);
  };

  const removeRow = async (
    rowNumber: number
  ): Promise<void> => {
    await getRow(rowNumber)
      .getByRole(ARIA_ROLE.BUTTON, {
        name: COMBO_FORM_COPY.REMOVE_ITEM_BUTTON,
      })
      .click();
  };

  const submit = async (): Promise<void> => {
    await page
      .getByRole(ARIA_ROLE.BUTTON, {
        name: COMBO_FORM_COPY.SAVE_BUTTON,
      })
      .click();
  };

  const back = async (): Promise<void> => {
    await page
      .getByRole(ARIA_ROLE.BUTTON, {
        name: COMBO_FORM_COPY.BACK_BUTTON,
      })
      .click();
  };

  return {
    goToCreate,
    goToEdit,
    getNameInput,
    getPriceInput,
    getPriceInputByPlaceholder,
    getAudienceButton,
    getLockedAudience,
    getRow,
    getCategorySelect,
    getQuantityInput,
    getMessage,
    getBanner,
    fillName,
    chooseAudience,
    fillPrice,
    addEquipmentRow,
    chooseCategory,
    fillQuantity,
    removeRow,
    submit,
    back,
  };
};
