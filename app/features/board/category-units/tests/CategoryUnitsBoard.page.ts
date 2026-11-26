import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";

export const createCategoryUnitsBoardPage = () => ({
  getEditToggle: () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_UNITS_COPY.EDIT,
    }),
  getInfoAction: (code: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_UNITS_COPY.INFO_UNIT(code),
    }),
  getModifyAction: (code: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_UNITS_COPY.EDIT_UNIT(code),
    }),
  getSheet: () => screen.getByRole(ARIA_ROLE.DIALOG),
  queryEditToggle: () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_UNITS_COPY.EDIT,
    }),
  queryModifyAction: (code: string) =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_UNITS_COPY.EDIT_UNIT(code),
    }),
  querySheet: () => screen.queryByRole(ARIA_ROLE.DIALOG),
});
