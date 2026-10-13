import { screen } from "@testing-library/react";
import { MATERIAL_ICON_NAME } from "../constants/MaterialIconName.constants";

export const createMaterialIconPage = (
  name: string = MATERIAL_ICON_NAME.VISIBILITY
) => {
  const getIcon = () => screen.getByText(name);

  const queryByRole = (role: string) =>
    screen.queryByRole(role);

  return { getIcon, queryByRole };
};
