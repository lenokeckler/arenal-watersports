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

  const getCause = (label: string) =>
    screen.getByRole(ARIA_ROLE.RADIO, {
      name: new RegExp(label),
    });

  return {
    getAlertText: () =>
      screen.getByRole(ARIA_ROLE.ALERT).textContent,
    getCause,
    getCauseGroup: () =>
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: COPY.LABEL_CAUSE,
      }),
    getReason,
    pressKey: (key: string) => user.keyboard(key),
    queryCauseGroup: () =>
      screen.queryByRole(ARIA_ROLE.GROUP, {
        name: COPY.LABEL_CAUSE,
      }),
    selectCause: (label: string) =>
      user.click(getCause(label)),
    getStatusText: () =>
      screen.getByRole(ARIA_ROLE.STATUS).textContent,
    getSubmit,
    queryText: (text: string) => screen.queryByText(text),
    submit: () => user.click(getSubmit()),
    typeReason: (reason: string) =>
      user.type(getReason(), reason),
  };
};
