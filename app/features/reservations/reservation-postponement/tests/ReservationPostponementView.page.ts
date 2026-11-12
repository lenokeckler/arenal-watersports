import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_FORM_COPY as COPY } from "../constants/ReservationPostponementFormCopy.constants";
import type { ReservationPostponementCause } from "../models/ReservationPostponementCause.type";

const VALUE_ATTRIBUTE = "value";

export const createReservationPostponementViewPage = () => {
  const user = userEvent.setup();

  const getDateInput = () =>
    screen.getByLabelText(COPY.LABEL_NEW_DATE, {
      exact: false,
    });

  const getTimeInput = () =>
    screen.getByLabelText(COPY.LABEL_NEW_TIME, {
      exact: false,
    });

  const getSubmit = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: COPY.SUBMIT,
    });

  const queryReason = () =>
    screen.queryByRole(ARIA_ROLE.TEXTBOX, {
      name: new RegExp(COPY.LABEL_REASON),
    });

  const getCauseNames = () =>
    within(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: COPY.LABEL_CAUSE,
      })
    )
      .getAllByRole(ARIA_ROLE.RADIO)
      .map((radio) => radio.getAttribute(VALUE_ATTRIBUTE));

  const chooseCause = (
    cause: ReservationPostponementCause
  ) =>
    user.click(
      screen.getByLabelText(COPY.CAUSE_LABEL[cause])
    );

  const typeReason = async (reason: string) => {
    const field = queryReason();
    if (field) {
      await user.type(field, reason);
    }
  };

  const setDate = async (date: string) => {
    await user.clear(getDateInput());
    await user.type(getDateInput(), date);
  };

  const submit = () => user.click(getSubmit());

  const queryText = (text: string) =>
    screen.queryByText(text);

  const getAlertText = () =>
    screen.getByRole(ARIA_ROLE.ALERT).textContent;

  const getStatusText = () =>
    screen.getByRole(ARIA_ROLE.STATUS).textContent;

  return {
    chooseCause,
    getAlertText,
    getCauseNames,
    getDateInput,
    getStatusText,
    getSubmit,
    getTimeInput,
    queryReason,
    queryText,
    setDate,
    submit,
    typeReason,
  };
};
