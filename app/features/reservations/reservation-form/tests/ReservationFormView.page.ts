import userEvent, {
  type UserEvent,
} from "@testing-library/user-event";
import { createFormQueries } from "./ReservationFormView.queries";
import { STRING } from "@/app/constants";

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
  fillCustomerName: async (
    value: string
  ): Promise<void> => {
    await user.type(queries.getCustomerNameInput(), value);
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
  selectReservationType: async (
    label: string
  ): Promise<void> => {
    await user.click(
      queries.getReservationTypeRadio(label)
    );
  },
  toggleExtra: async (name: string): Promise<void> => {
    await user.click(queries.getExtraCheckbox(name));
  },
  clickExtrasRetry: async (): Promise<void> => {
    await user.click(queries.getExtrasRetryButton());
  },
  clickQuoteRetry: async (): Promise<void> => {
    await user.click(queries.getQuoteRetryButton());
  },
});

export const createReservationFormViewPage = (
  container: HTMLElement
) => {
  const user = userEvent.setup();
  const queries = createFormQueries(container);
  return {
    ...queries,
    ...createEquipmentActions(user, queries),
    ...createReservationActions(user, queries),
    getRenderedText: (): string =>
      container.textContent ?? STRING.Empty,
  };
};
