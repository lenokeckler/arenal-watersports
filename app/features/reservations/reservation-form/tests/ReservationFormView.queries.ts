import { within } from "@testing-library/react";
import { ARIA_ROLE, STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

const createReservationQueries = (
  container: HTMLElement
) => {
  const form = within(container);
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
    getReservationTypeRadio: (label: string) =>
      form.getByLabelText(label, { exact: false }),
    getReservationTypeDescription: (description: string) =>
      form.getByText(description, { exact: true }),
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

const createEquipmentQueries = (container: HTMLElement) => {
  const form = within(container);
  const getCategorySelect = () =>
    form.getByLabelText(
      `${RESERVATION_FORM_UI_COPY.CATEGORY} ${STRING.ASTERISK}`,
      { exact: true }
    );
  return {
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
    queryCategoryOption: (
      categoryId: string
    ): NullableRef<HTMLOptionElement> =>
      getCategorySelect().querySelector<HTMLOptionElement>(
        `option[value="${categoryId}"]`
      ),
  };
};

export const createFormQueries = (
  container: HTMLElement
) => ({
  ...createReservationQueries(container),
  ...createEquipmentQueries(container),
});
