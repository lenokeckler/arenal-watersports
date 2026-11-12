import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_CANCELLATION_FORM_COPY as COPY } from "../constants/ReservationCancellationFormCopy.constants";

export const createReservationCancellationViewPage = () => {
  const user = userEvent.setup();
  const getReason = () =>
    screen.getByRole(ARIA_ROLE.TEXTBOX, {
      name: new RegExp(COPY.LABEL_REASON),
    });
  const getSubmit = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: COPY.SUBMIT,
    });

  return {
    getAlertText: () =>
      screen.getByRole(ARIA_ROLE.ALERT).textContent,
    getReason,
    getStatusText: () =>
      screen.getByRole(ARIA_ROLE.STATUS).textContent,
    getSubmit,
    queryText: (text: string) => screen.queryByText(text),
    submit: () => user.click(getSubmit()),
    typeReason: (reason: string) =>
      user.type(getReason(), reason),
  };
};
