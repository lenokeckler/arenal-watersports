import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";

export const createCategoryUnitsDispatchPage = () => ({
  getCancel: () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_UNITS_COPY.DISPATCH_CANCEL,
    }),
  getDispatch: () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_UNITS_COPY.DISPATCH_ACTION,
    }),
  getPickerAction: (customerName: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_UNITS_COPY.PICKER_DISPATCH(
        customerName
      ),
    }),
  getSelectBox: (code: string) =>
    screen.getByRole(ARIA_ROLE.CHECKBOX, {
      name: CATEGORY_UNITS_COPY.DISPATCH_SELECT_UNIT(code),
    }),
  queryDispatch: () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_UNITS_COPY.DISPATCH_ACTION,
    }),
  querySelectBoxes: () =>
    screen.queryAllByRole(ARIA_ROLE.CHECKBOX),
});
