import type { UserEvent } from "@testing-library/user-event";
import { STRING } from "@/app/constants";
import type { PredefinedComboSelectionQueries } from "./models/PredefinedComboSelectionQueries.type";

const createComboSelectionActions = (
  user: UserEvent,
  queries: PredefinedComboSelectionQueries
) => ({
  selectComboReservation: async (): Promise<void> => {
    await user.click(queries.getComboReservationOption());
  },
  selectMode: async (label: string): Promise<void> => {
    await user.click(queries.getModeOption(label));
  },
  selectCombo: async (comboId: string): Promise<void> => {
    const comboSelect = queries.queryComboSelect();
    if (!comboSelect) {
      throw new Error(
        "Predefined combo selector is not visible."
      );
    }
    await user.selectOptions(comboSelect, comboId);
  },
  clearCombo: async (): Promise<void> => {
    const comboSelect = queries.queryComboSelect();
    if (!comboSelect) {
      throw new Error(
        "Predefined combo selector is not visible."
      );
    }
    await user.selectOptions(comboSelect, STRING.Empty);
  },
});

const createReservationActions = (
  user: UserEvent,
  queries: PredefinedComboSelectionQueries
) => ({
  fillCustomerName: async (
    value: string
  ): Promise<void> => {
    await user.type(queries.getCustomerNameInput(), value);
  },
  submit: async (): Promise<void> => {
    await user.click(queries.getSubmitButton());
  },
});

export const createPredefinedComboSelectionActions = (
  user: UserEvent,
  queries: PredefinedComboSelectionQueries
) => ({
  ...createComboSelectionActions(user, queries),
  ...createReservationActions(user, queries),
});
