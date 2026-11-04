import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryAlertType } from "../constants/CategoryAlertType.constants";

export const createCategoryAlertsFormPage = () => {
  const user = userEvent.setup();

  const getHeading = () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      name: CATEGORY_CATALOG_COPY.ALERT_FORM_TITLE,
    });

  const getHint = () =>
    screen.getByText(CATEGORY_CATALOG_COPY.ALERT_FORM_HINT);

  const getTypeSelect = () =>
    screen.getByLabelText(
      CATEGORY_CATALOG_COPY.ALERT_TYPE_FIELD_LABEL,
      { exact: false }
    );

  const getTypeOptionLabels = () =>
    Array.from(
      (getTypeSelect() as HTMLSelectElement).options
    ).map((option) => option.textContent);

  const queryMinQuantityInput = () =>
    screen.queryByLabelText(
      CATEGORY_CATALOG_COPY.ALERT_MIN_QUANTITY_FIELD_LABEL,
      { exact: false }
    );

  const queryExpiryDaysInput = () =>
    screen.queryByLabelText(
      CATEGORY_CATALOG_COPY.ALERT_EXPIRY_DAYS_FIELD_LABEL,
      { exact: false }
    );

  const getTextInputs = () =>
    screen.queryAllByRole(ARIA_ROLE.TEXTBOX);

  const findTextMatches = (text: string) =>
    screen.findAllByText(text);

  const getCancelButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.CANCEL_BUTTON,
    });

  const getSubmitButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.ALERT_SUBMIT_BUTTON,
    });

  const waitForSubmitInFlight = () =>
    screen.findByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.LOADING_TEXT_UPDATING,
    });

  const waitForSubmitSettled = () =>
    screen.findByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.ALERT_SUBMIT_BUTTON,
    });

  const selectType = async (
    alertType: CategoryAlertType
  ): Promise<void> => {
    await user.selectOptions(getTypeSelect(), alertType);
  };

  const typeIntoField = async (
    label: string,
    text: string
  ): Promise<void> => {
    const field = screen.getByLabelText(label, {
      exact: false,
    });
    await user.clear(field);
    await user.type(field, text);
  };

  const typeMinQuantity = (text: string) =>
    typeIntoField(
      CATEGORY_CATALOG_COPY.ALERT_MIN_QUANTITY_FIELD_LABEL,
      text
    );

  const typeExpiryDays = (text: string) =>
    typeIntoField(
      CATEGORY_CATALOG_COPY.ALERT_EXPIRY_DAYS_FIELD_LABEL,
      text
    );

  const submit = async (): Promise<void> => {
    await user.click(getSubmitButton());
  };

  const cancel = async (): Promise<void> => {
    await user.click(getCancelButton());
  };

  return {
    getHeading,
    getHint,
    getTypeSelect,
    getTypeOptionLabels,
    queryMinQuantityInput,
    queryExpiryDaysInput,
    getTextInputs,
    findTextMatches,
    getCancelButton,
    waitForSubmitInFlight,
    waitForSubmitSettled,
    selectType,
    typeMinQuantity,
    typeExpiryDays,
    submit,
    cancel,
  };
};
