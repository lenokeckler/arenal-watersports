import { within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { PREDEFINED_COMBO_FORM_COPY } from "../constants/PredefinedComboFormCopy.constants";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { PREDEFINED_COMBO_FORM_FIELD_ID } from "../constants/PredefinedComboForm.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";

const createComboQueries = (container: HTMLElement) => {
  const form = within(container);
  return {
    getModeOption: (label: string) =>
      form.getByLabelText(label, { exact: true }),
    getComboReservationOption: () =>
      form.getByLabelText(
        RESERVATION_TYPE_COPY.OPTIONS.COMBO.label,
        { exact: false }
      ),
    getComboSelect: () =>
      form.getByLabelText(
        PREDEFINED_COMBO_FORM_COPY.SELECT_COMBO,
        { exact: true }
      ),
    queryComboSelect: () =>
      container.querySelector<HTMLSelectElement>(
        `#${PREDEFINED_COMBO_FORM_FIELD_ID.SELECT}`
      ),
  };
};

const createSummaryQueries = (container: HTMLElement) => {
  const form = within(container);
  return {
    getComboSummary: () =>
      form.getByRole(ARIA_ROLE.REGION, {
        name: PREDEFINED_COMBO_FORM_COPY.SUMMARY_TITLE,
      }),
    getEmptyCatalogMessage: () =>
      form.getByText(
        PREDEFINED_COMBO_FORM_COPY.EMPTY_CATALOG,
        { exact: true }
      ),
    getNoGuideStatus: () =>
      form.queryByRole(ARIA_ROLE.STATUS, {
        name: CUSTOM_COMBO_FORM_COPY.NO_GUIDE,
      }),
    getGuideAssignmentField: () =>
      form.queryByRole(ARIA_ROLE.GROUP, {
        name: RESERVATION_FORM_UI_COPY.GUIDES,
      }),
  };
};

const createReservationQueries = (
  container: HTMLElement
) => {
  const form = within(container);
  return {
    getCustomerNameInput: () =>
      form.getByLabelText(
        RESERVATION_FORM_UI_COPY.CUSTOMER_NAME,
        { exact: false }
      ),
    getSubmitButton: () =>
      form.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_FORM_UI_COPY.SUBMIT,
      }),
  };
};

export const createPredefinedComboSelectionQueries = (
  container: HTMLElement
) => ({
  ...createComboQueries(container),
  ...createSummaryQueries(container),
  ...createReservationQueries(container),
});
