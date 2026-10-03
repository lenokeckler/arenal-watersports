import { screen } from "@testing-library/react";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { LOGIN_FORM_COPY } from "../constants/LoginFormCopy.constants";
import {
  ALERT_ROLE,
  BUTTON_ROLE,
} from "./LoginFormControls.constants";

export const createLoginFormControlsPage = () => {
  const queryBanner = () => screen.queryByRole(ALERT_ROLE);
  const getSubmit = (label: string) =>
    screen.getByRole(BUTTON_ROLE, {
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
