import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";

export const createFormSuccessNoticePage = () => ({
  queryNotice: () => screen.queryByRole(ARIA_ROLE.STATUS),
});
