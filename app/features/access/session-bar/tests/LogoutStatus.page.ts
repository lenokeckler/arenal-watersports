import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";

export const createLogoutStatusPage = () => ({
  getStatus: () => screen.getByRole(ARIA_ROLE.STATUS),
});
