import { screen } from "@testing-library/react";

export const createReservationTypeFieldPage = () => ({
  getReservationTypeRadio: (label: string) =>
    screen.getByLabelText(label, { exact: false }),
  getReservationTypeDescription: (description: string) =>
    screen.getByText(description, { exact: true }),
  findStatusMessage: (message: string) =>
    screen.findByText(message, { exact: true }),
});
