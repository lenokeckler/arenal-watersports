import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";

export const createDispatchSheetPage = () => ({
  getAlert: () => screen.getByRole(ARIA_ROLE.ALERT),
  getBackButton: () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: DISPATCH_SHEET_COPY.BACK,
    }),
  getChangeUnits: () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: DISPATCH_SHEET_COPY.CHANGE_UNITS,
    }),
  getDeparture: () =>
    screen.getByLabelText(
      DISPATCH_SHEET_COPY.DEPARTURE_LABEL
    ),
  getGaugeLine: (code: string, name: string) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: new RegExp(`^${code}$`),
      })
    ).getByRole(ARIA_ROLE.BUTTON, { name }),
  getGroupButton: (categoryName: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(categoryName),
    }),
  getRadio: () =>
    screen.getByLabelText(
      DISPATCH_SHEET_COPY.RADIO_FIELD_LABEL
    ),
  getReturn: () =>
    screen.getByLabelText(DISPATCH_SHEET_COPY.RETURN_LABEL),
  getSubmit: () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: DISPATCH_SHEET_COPY.SUBMIT,
    }),
  getTakeLess: () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: DISPATCH_SHEET_COPY.TAKE_LESS,
    }),
  getTakeMore: () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: DISPATCH_SHEET_COPY.TAKE_MORE,
    }),
  getUnit: (code: string) =>
    screen.getByRole(ARIA_ROLE.CHECKBOX, {
      name: new RegExp(code),
    }),
  queryTakeLess: () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: DISPATCH_SHEET_COPY.TAKE_LESS,
    }),
  queryUnits: () =>
    screen.queryAllByRole(ARIA_ROLE.CHECKBOX),
});
