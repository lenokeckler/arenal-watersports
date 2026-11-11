import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE, STRING } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import type { ExtraFormMode } from "../constants/ExtraFormMode.constants";
import {
  EXTRA_FORM_SUBMIT_LABEL,
  EXTRA_FORM_TITLE,
} from "../constants/ExtraFormModeCopy.constants";

const ARIA_DESCRIBED_BY_ATTRIBUTE = "aria-describedby";
const ARIA_INVALID_ATTRIBUTE = "aria-invalid";
const ARIA_INVALID_TRUE = "true";

export const createExtraFormPage = (
  mode: ExtraFormMode
) => {
  const user = userEvent.setup();

  const getNameField = () =>
    screen.getByLabelText(EXTRA_CATALOG_COPY.NAME_LABEL, {
      exact: false,
    });

  const getButton = (name: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, { name });

  const typeName = async (text: string): Promise<void> => {
    await user.clear(getNameField());
    await user.type(getNameField(), text);
  };

  const getNameDescribedByIds = (): string[] =>
    getNameField()
      .getAttribute(ARIA_DESCRIBED_BY_ATTRIBUTE)
      ?.split(STRING.SPACE) ?? [];

  const isNameFieldInvalid = (): boolean =>
    getNameField().getAttribute(ARIA_INVALID_ATTRIBUTE) ===
    ARIA_INVALID_TRUE;

  return {
    getNameField,
    getNameDescribedByIds,
    isNameFieldInvalid,
    getTitle: () =>
      screen.queryByRole(ARIA_ROLE.HEADING, {
        name: EXTRA_FORM_TITLE[mode],
      }),
    getSubmitButton: () =>
      getButton(EXTRA_FORM_SUBMIT_LABEL[mode]),
    getSavingButton: () =>
      screen.queryByRole(ARIA_ROLE.BUTTON, {
        name: EXTRA_CATALOG_COPY.LOADING_TEXT_SAVING,
      }),
    getCancelButton: () =>
      getButton(EXTRA_CATALOG_COPY.CANCEL_BUTTON),
    getNameError: (message: string) =>
      screen.queryByText(message),
    typeName,
    submit: () =>
      user.click(getButton(EXTRA_FORM_SUBMIT_LABEL[mode])),
    cancel: () =>
      user.click(
        getButton(EXTRA_CATALOG_COPY.CANCEL_BUTTON)
      ),
  };
};
