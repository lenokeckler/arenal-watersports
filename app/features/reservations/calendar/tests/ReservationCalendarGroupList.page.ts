import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";

export const createReservationCalendarGroupListPage = (
  accessibleName: string
) => ({
  getReservationLink: (): HTMLAnchorElement =>
    screen.getByRole(ARIA_ROLE.LINK, {
      name: accessibleName,
    }) as HTMLAnchorElement,
});
