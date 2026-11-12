import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";

export const createEquipmentBoardRealtimePage = () => {
  const getNotice = () => screen.getByRole(ARIA_ROLE.ALERT);

  const queryNotice = () =>
    screen.queryByRole(ARIA_ROLE.ALERT);

  return { getNotice, queryNotice };
};
