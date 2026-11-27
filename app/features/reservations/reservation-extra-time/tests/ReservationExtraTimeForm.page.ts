import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_EXTRA_TIME_FORM_COPY as COPY } from "../constants/ReservationExtraTimeFormCopy.constants";

const AMOUNT_NAME = /^Monto acordado/;

export const createReservationExtraTimeFormPage = () => {
  const user = userEvent.setup();
  const getRadio = (label: string) =>
    screen.getByRole(ARIA_ROLE.RADIO, {
      name: new RegExp(`^${label}`),
    });
  const getAmount = () =>
    screen.getByRole(ARIA_ROLE.TEXTBOX, {
      name: AMOUNT_NAME,
    });
  const getSubmit = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(
        [
          COPY.SUBMIT_UNDECIDED,
          ...Object.values(COPY.SUBMIT),
          COPY.SUBMITTING,
        ].join("|")
      ),
    });

  return {
    choose: (label: string) => user.click(getRadio(label)),
    findAlertText: async () =>
      (await screen.findByRole(ARIA_ROLE.ALERT))
        .textContent,
    getAmount,
    getBackLink: () =>
      screen.getByRole(ARIA_ROLE.LINK, { name: COPY.BACK }),
    getRadio,
    getSubmit,
    queryAmount: () =>
      screen.queryByRole(ARIA_ROLE.TEXTBOX, {
        name: AMOUNT_NAME,
      }),
    queryOtherMethod: () =>
      screen.queryByRole(ARIA_ROLE.TEXTBOX, {
        name: new RegExp(
          COPY.OTHER_METHOD_LABEL.replace("?", "\\?")
        ),
      }),
    queryText: (text: string) => screen.queryByText(text),
    submit: () => user.click(getSubmit()),
    typeAmount: (amount: string) =>
      user.type(getAmount(), amount),
  };
};
