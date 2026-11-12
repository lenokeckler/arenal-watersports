import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";

export const createCategoryImageFormPage = () => {
  const user = userEvent.setup({ applyAccept: false });

  const getHeading = () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      name: CATEGORY_IMAGE_COPY.FORM_TITLE,
    });

  const getFileInput = () =>
    screen.getByLabelText<HTMLInputElement>(
      CATEGORY_IMAGE_COPY.FILE_INPUT_LABEL
    );

  const getChooseButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_IMAGE_COPY.CHOOSE_BUTTON,
    });

  const queryButton = (name: string) =>
    screen.queryByRole(ARIA_ROLE.BUTTON, { name });

  const getSaveButton = () =>
    queryButton(CATEGORY_IMAGE_COPY.SAVE_BUTTON);

  const getRemoveButton = () =>
    queryButton(CATEGORY_IMAGE_COPY.REMOVE_BUTTON);

  const getBackButton = () =>
    queryButton(CATEGORY_IMAGE_COPY.BACK_BUTTON);

  const queryPreviewImage = (alt: string) =>
    screen.queryByRole(ARIA_ROLE.IMG, { name: alt });

  const queryEmptyPreview = () =>
    screen.queryByText(CATEGORY_IMAGE_COPY.PREVIEW_EMPTY);

  const queryText = (text: string) =>
    screen.queryByText(text);

  const queryAlert = () =>
    screen.queryByRole(ARIA_ROLE.ALERT);

  const chooseFile = async (file: File): Promise<void> => {
    await user.upload(getFileInput(), file);
  };

  const clickButton = async (
    name: string
  ): Promise<void> => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, { name })
    );
  };

  const save = (): Promise<void> =>
    clickButton(CATEGORY_IMAGE_COPY.SAVE_BUTTON);

  const startRemoval = (): Promise<void> =>
    clickButton(CATEGORY_IMAGE_COPY.REMOVE_BUTTON);

  const confirmRemoval = (): Promise<void> =>
    clickButton(CATEGORY_IMAGE_COPY.REMOVE_CONFIRM_BUTTON);

  const goBack = (): Promise<void> =>
    clickButton(CATEGORY_IMAGE_COPY.BACK_BUTTON);

  return {
    chooseFile,
    confirmRemoval,
    goBack,
    save,
    startRemoval,
    getBackButton,
    getChooseButton,
    getFileInput,
    getHeading,
    getRemoveButton,
    getSaveButton,
    queryAlert,
    queryEmptyPreview,
    queryPreviewImage,
    queryText,
  };
};
