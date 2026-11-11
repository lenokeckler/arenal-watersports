import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";

export const createFormErrorBannerPage = () => ({
  queryBanner: () => screen.queryByRole(ARIA_ROLE.ALERT),
});
