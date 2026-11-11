import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";

const FUEL_FIELD = /^Rayas de gasolina/;

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
  getReadingCard: (code: string) =>
    screen.getByRole(ARIA_ROLE.GROUP, {
      name: new RegExp(`^${code}$`),
    }),
  getReadingFuelField: (code: string) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: new RegExp(`^${code}$`),
      })
    ).getByLabelText(FUEL_FIELD),
  getReadingPreset: (code: string, name: string) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: new RegExp(`^${code}$`),
      })
    ).getByRole(ARIA_ROLE.BUTTON, { name }),
  getReadingUsageField: (code: string, label: string) =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: new RegExp(`^${code}$`),
      })
    ).getByLabelText(label),
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
