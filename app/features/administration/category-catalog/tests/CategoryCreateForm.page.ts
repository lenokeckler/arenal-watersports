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

  const getChoiceCard = (label: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(`^${label}`),
    });

  const getGroupNameInput = () =>
    screen.getByLabelText(
      CATEGORY_CATALOG_COPY.GROUP_FIELD_LABEL,
      { exact: false }
    );

  const isChoiceSelected = (label: string): boolean =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(`^${label}`),
      pressed: true,
    }) !== null;

  const getNameError = () =>
    screen.queryByText(
      CATEGORY_CATALOG_COPY.NAME_FIELD_REQUIRED_ERROR
    );

  const getNameDuplicateError = () =>
    screen.queryByText(
      CATEGORY_CATALOG_COPY.NAME_DUPLICATE_ERROR
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

  const selectChoice = async (
    label: string
  ): Promise<void> => {
    await user.click(getChoiceCard(label));
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
    getChoiceCard,
    isChoiceSelected,
    getGroupNameInput,
    getNameError,
    getNameDuplicateError,
    getTrackingModeError,
    getCancelButton,
    getSubmitButton,
    isSubmitButtonLoading,
    fillName,
    selectChoice,
    fillGroupName,
    submit,
    clickLoadingSubmitButton,
    cancel,
  };
};
