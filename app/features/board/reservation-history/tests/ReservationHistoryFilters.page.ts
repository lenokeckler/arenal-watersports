import { screen } from "@testing-library/react";
import { ARIA_ROLE, STRING } from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { DESCRIBED_BY_ATTRIBUTE } from "./ReservationHistoryFiltersForm.constants";

const OPTION_SELECTOR = "option";

export const createReservationHistoryFiltersPage = () => {
  const getField = (label: string) =>
    screen.getByLabelText<
      HTMLInputElement | HTMLSelectElement
    >(label);

  const getForm = () =>
    getField(
      RESERVATION_HISTORY_COPY.FILTER_FROM_LABEL
    ).closest("form");

  const getOptionLabels = (label: string) =>
    Array.from(
      getField(label).querySelectorAll(OPTION_SELECTOR)
    ).map((option) => option.textContent);

  const getSubmitButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: RESERVATION_HISTORY_COPY.FILTER_SUBMIT,
    });

  const getDescription = (field: HTMLElement) =>
    document.getElementById(
      field.getAttribute(DESCRIBED_BY_ATTRIBUTE) ??
        STRING.Empty
    );

  const queryText = (text: string) =>
    screen.queryByText(text);

  const queryAlert = () =>
    screen.queryByRole(ARIA_ROLE.ALERT);

  return {
    getDescription,
    getField,
    getForm,
    getOptionLabels,
    getSubmitButton,
    queryAlert,
    queryText,
  };
};
