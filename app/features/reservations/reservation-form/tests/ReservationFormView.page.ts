import { within } from "@testing-library/react";
import userEvent, {
  type UserEvent,
} from "@testing-library/user-event";
import { ARIA_ROLE, STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

const createFormQueries = (container: HTMLElement) => {
  const form = within(container);
  const getCategorySelect = () =>
    form.getByLabelText(
      `${RESERVATION_FORM_UI_COPY.CATEGORY} ${STRING.ASTERISK}`,
      { exact: true }
    );

  return {
    getDurationOption: (label: string) =>
      form.getByRole(ARIA_ROLE.BUTTON, { name: label }),
    getBackButton: () =>
      form.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_FORM_VIEW_TEST.BACK_TO_CALENDAR,
      }),
    findDurationValidationError: () =>
      form.getByText(
        RESERVATION_FORM_COPY[
          RESERVATION_FORM_FIELD.DURATION_HOURS
        ]
      ),
    findSubmissionError: () =>
      form.getByText(RESERVATION_FORM_UI_COPY.SUBMIT_ERROR),
    getSubmitButton: () =>
      form.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_FORM_UI_COPY.SUBMIT,
      }),
    getCategorySelect,
    getQuantityInput: () =>
      form.queryByLabelText(
        RESERVATION_FORM_UI_COPY.QUANTITY,
        {
          exact: false,
        }
      ),
    getUnitSelect: () =>
      form.getByLabelText(RESERVATION_FORM_UI_COPY.UNIT, {
        exact: false,
      }),
    findUnitOption: () =>
      form.findByRole(ARIA_ROLE.OPTION, {
        name: RESERVATION_FORM_VIEW_TEST.UNIT_CODE,
      }),
    findUnitValidationError: () =>
      form.getByText(
        RESERVATION_FORM_COPY[
          RESERVATION_FORM_FIELD.UNIT_ID
        ]
      ),
    getReservationTypeRadio: (label: string) =>
      form.getByLabelText(label, { exact: false }),
    getReservationTypeDescription: (description: string) =>
      form.getByText(description, { exact: true }),
    queryCategoryOption: (
      categoryId: string
    ): NullableRef<HTMLOptionElement> =>
      getCategorySelect().querySelector<HTMLOptionElement>(
        `option[value="${categoryId}"]`
      ),
    getCustomerNameInput: () =>
      form.getByLabelText(
        RESERVATION_FORM_UI_COPY.CUSTOMER_NAME,
        {
          exact: false,
        }
      ),
    queryCustomDurationInput:
      (): NullableRef<HTMLInputElement> =>
        container.querySelector<HTMLInputElement>(
          `#${RESERVATION_FORM_FIELD_ID.DURATION}`
        ),
  };
};

const createEquipmentActions = (
  user: UserEvent,
  queries: ReturnType<typeof createFormQueries>
) => ({
  selectCategory: async (categoryId: string) => {
    await user.selectOptions(
      queries.getCategorySelect(),
      categoryId
    );
  },
  selectUnit: async (unitId: string) => {
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
  clickBack: async () => {
    await user.click(queries.getBackButton());
  },
  selectDuration: async (label: string) => {
    await user.click(queries.getDurationOption(label));
  },
  submit: async () => {
    await user.click(queries.getSubmitButton());
  },
  fillCustomerName: async (value: string) => {
    await user.type(queries.getCustomerNameInput(), value);
  },
  typeCustomDuration: async (value: string) => {
    const input = queries.queryCustomDurationInput();
    if (!input) {
      throw new Error(
        "Custom duration input is not visible."
      );
    }
    await user.type(input, value);
  },
  selectReservationType: async (label: string) => {
    await user.click(
      queries.getReservationTypeRadio(label)
    );
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
  };
};
