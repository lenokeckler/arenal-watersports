import { screen } from "@testing-library/react";

export const createReservationSplitCardsPage = () => {
  const queryText = (text: string) =>
    screen.queryByText(text);

  return { queryText };
};
