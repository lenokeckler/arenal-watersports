import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";

export const createReservationTypeFieldPage = () => ({
  getReservationTypeRadio: (label: string) =>
    screen.getByLabelText(label, { exact: false }),
  getReservationTypeDescription: (description: string) =>
    screen.getByText(description, { exact: true }),
  findStatusMessage: () =>
    screen.findByRole(ARIA_ROLE.STATUS),
});
