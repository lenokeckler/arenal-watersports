import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";

export const createCategoryCreateFormPage = () => {
  const user = userEvent.setup();

  const getHeading = () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      name: CATEGORY_CATALOG_COPY.CREATE_FORM_TITLE,
    });

  const getNameInput = () =>
    screen.getByLabelText(
      CATEGORY_CATALOG_COPY.NAME_FIELD_LABEL,
      { exact: false }
    );

  const getTrackingModeInput = () =>
    screen.getByLabelText(
      CATEGORY_CATALOG_COPY.TRACKING_MODE_FIELD_LABEL,
      { exact: false }
    );

  const getGroupNameInput = () =>
    screen.getByLabelText(
      CATEGORY_CATALOG_COPY.GROUP_FIELD_LABEL,
      { exact: false }
    );

  const getNameError = () =>
    screen.queryByText(
      CATEGORY_CATALOG_COPY.NAME_FIELD_REQUIRED_ERROR
    );

  const getTrackingModeError = () =>
    screen.queryByText(
      CATEGORY_CATALOG_COPY.TRACKING_MODE_REQUIRED_ERROR
    );

  const getCancelButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.CANCEL_BUTTON,
    });

  const getSubmitButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.SUBMIT_BUTTON,
    });

  const getLoadingSubmitButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.LOADING_TEXT_CREATING,
    });

  const isSubmitButtonLoading = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.LOADING_TEXT_CREATING,
    }) !== null;

  const fillName = async (name: string): Promise<void> => {
    await user.type(getNameInput(), name);
  };

  const selectTrackingMode = async (
    value: string
  ): Promise<void> => {
    await user.selectOptions(getTrackingModeInput(), value);
  };

  const fillGroupName = async (
    groupName: string
  ): Promise<void> => {
    await user.type(getGroupNameInput(), groupName);
  };

  const submit = async (): Promise<void> => {
    await user.click(getSubmitButton());
  };

  const clickLoadingSubmitButton =
    async (): Promise<void> => {
      await user.click(getLoadingSubmitButton());
    };

  const cancel = async (): Promise<void> => {
    await user.click(getCancelButton());
  };

  return {
    getHeading,
    getNameInput,
    getTrackingModeInput,
    getGroupNameInput,
    getNameError,
    getTrackingModeError,
    getCancelButton,
    getSubmitButton,
    isSubmitButtonLoading,
    fillName,
    selectTrackingMode,
    fillGroupName,
    submit,
    clickLoadingSubmitButton,
    cancel,
  };
};
