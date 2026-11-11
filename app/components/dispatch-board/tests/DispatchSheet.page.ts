import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";

export const createDispatchSheetPage = () => ({
  getAlert: () => screen.getByRole(ARIA_ROLE.ALERT),
  getBackButton: () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: DISPATCH_SHEET_COPY.BACK,
    }),
  getDeparture: () =>
    screen.getByLabelText(
      DISPATCH_SHEET_COPY.DEPARTURE_LABEL
    ),
  getGroupButton: (categoryName: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(categoryName),
    }),
  getReturn: () =>
    screen.getByLabelText(DISPATCH_SHEET_COPY.RETURN_LABEL),
  getSubmit: () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: DISPATCH_SHEET_COPY.SUBMIT,
    }),
  getUnit: (code: string) =>
    screen.getByRole(ARIA_ROLE.CHECKBOX, {
      name: new RegExp(code),
    }),
  queryUnits: () =>
    screen.queryAllByRole(ARIA_ROLE.CHECKBOX),
});
