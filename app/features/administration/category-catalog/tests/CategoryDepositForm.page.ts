import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ARIA_ROLE,
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { DEPOSIT_FIELD_LABEL } from "./CategoryDepositForm.constants";

export const createCategoryDepositFormPage = () => {
  const user = userEvent.setup();

  const getHeading = () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      name: CATEGORY_CATALOG_COPY.DEPOSIT_FORM_TITLE,
    });

  const getHint = () =>
    screen.getByText(
      CATEGORY_CATALOG_COPY.DEPOSIT_FORM_HINT
    );

  const getAmountInput = (currency: CurrencyCode) =>
    screen.getByLabelText(DEPOSIT_FIELD_LABEL[currency], {
      exact: false,
    });

  const getAmountInputs = () =>
    screen.getAllByRole(ARIA_ROLE.TEXTBOX);

  const queryTextOutsideHint = (pattern: RegExp) =>
    screen
      .queryAllByText(pattern)
      .filter((element) => element !== getHint());

  const findTextMatches = (text: string) =>
    screen.findAllByText(text);

  const getCancelButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.CANCEL_BUTTON,
    });

  const getSubmitButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.DEPOSIT_SUBMIT_BUTTON,
    });

  const waitForSubmitInFlight = () =>
    screen.findByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.LOADING_TEXT_UPDATING,
    });

  const waitForSubmitSettled = () =>
    screen.findByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.DEPOSIT_SUBMIT_BUTTON,
    });

  const typeAmount = async (
    currency: CurrencyCode,
    amountText: string
  ): Promise<void> => {
    const input = getAmountInput(currency);
    await user.clear(input);
    await user.type(input, amountText);
  };

  const clearBothAmounts = async (): Promise<void> => {
    await user.clear(getAmountInput(CURRENCY_CODE.USD));
    await user.clear(getAmountInput(CURRENCY_CODE.CRC));
  };

  const submit = async (): Promise<void> => {
    await user.click(getSubmitButton());
  };

  const cancel = async (): Promise<void> => {
    await user.click(getCancelButton());
  };

  return {
    getHeading,
    getHint,
    getAmountInput,
    getAmountInputs,
    queryTextOutsideHint,
    findTextMatches,
    getCancelButton,
    waitForSubmitInFlight,
    waitForSubmitSettled,
    typeAmount,
    clearBothAmounts,
    submit,
    cancel,
  };
};
