import userEvent, {
  type UserEvent,
} from "@testing-library/user-event";
import { createReservationTypeFieldPage } from "./ReservationTypeField.page";
import { createReservationFormCustomerPage } from "./ReservationFormCustomer.page";
import { createFormQueries } from "./ReservationFormView.queries";

const createEquipmentActions = (
  user: UserEvent,
  queries: ReturnType<typeof createFormQueries>
) => ({
  selectCategory: async (
    categoryId: string
  ): Promise<void> => {
    await user.selectOptions(
      queries.getCategorySelect(),
      categoryId
    );
  },
  selectUnit: async (unitId: string): Promise<void> => {
    await user.selectOptions(
      queries.getUnitSelect(),
      unitId
    );
  },
});

const createReservationActions = (
  user: UserEvent,
  queries: ReturnType<typeof createFormQueries>
) => ({
  clickBack: async (): Promise<void> => {
    await user.click(queries.getBackButton());
  },
  selectDuration: async (label: string): Promise<void> => {
    await user.click(queries.getDurationOption(label));
  },
  submit: async (): Promise<void> => {
    await user.click(queries.getSubmitButton());
  },
  typeCustomDuration: async (
    value: string
  ): Promise<void> => {
    const input = queries.queryCustomDurationInput();
    if (!input) {
      throw new Error(
        "Custom duration input is not visible."
      );
    }
    await user.type(input, value);
  },
});

export const createReservationFormViewPage = (
  container: HTMLElement
) => {
  const user = userEvent.setup();
  const queries = createFormQueries(container);
  return {
    ...queries,
    ...createReservationTypeFieldPage(),
    ...createReservationFormCustomerPage(),
    ...createEquipmentActions(user, queries),
    ...createReservationActions(user, queries),
  };
};
