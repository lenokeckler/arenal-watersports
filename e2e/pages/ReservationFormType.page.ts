import type { Page } from "@playwright/test";

export const createReservationFormTypePage = (
  page: Page
) => ({
  selectReservationType: (label: string) =>
    page
      .getByRole("radio", { name: label })
      .check({ force: true }),
});
