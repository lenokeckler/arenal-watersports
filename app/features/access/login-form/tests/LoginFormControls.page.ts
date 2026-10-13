import { screen } from "@testing-library/react";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { ARIA_ROLE } from "@/app/constants";
import { LOGIN_FORM_COPY } from "../constants/LoginFormCopy.constants";

export const createLoginFormControlsPage = () => {
  const queryBanner = () =>
    screen.queryByRole(ARIA_ROLE.ALERT);
  const getSubmit = (label: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(label),
    });
  const getIdleSubmit = () =>
    getSubmit(LOGIN_FORM_COPY.SUBMIT);
  const getPendingSubmit = () =>
    getSubmit(LOGIN_FORM_COPY.SUBMITTING);
  const getLoginIcon = () =>
    screen.getByText(MATERIAL_ICON_NAME.LOGIN);
  const getProgressIcon = () =>
    screen.getByText(MATERIAL_ICON_NAME.PROGRESS_ACTIVITY);

  return {
    getIdleSubmit,
    getLoginIcon,
    getPendingSubmit,
    getProgressIcon,
    queryBanner,
  };
};
