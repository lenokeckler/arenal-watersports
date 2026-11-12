import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { CHECK_CIRCLE_ICON_NAME } from "./FormSuccessNotice.constants";

export const createFormSuccessNoticePage = () => ({
  queryNotice: () => screen.queryByRole(ARIA_ROLE.STATUS),
  getIcon: () => screen.getByText(CHECK_CIRCLE_ICON_NAME),
});
