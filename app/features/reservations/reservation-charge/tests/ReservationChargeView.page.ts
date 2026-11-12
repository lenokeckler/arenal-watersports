import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";

const AMOUNT_NAME = /^Monto cobrado/;
const SUBMIT_NAME = new RegExp(
  `^(${COPY.SUBMIT}|${COPY.SUBMITTING})`
);

export const createReservationChargeViewPage = () => {
  const user = userEvent.setup();
  const getAmount = () =>
    screen.getByRole(ARIA_ROLE.TEXTBOX, {
      name: AMOUNT_NAME,
    });
  const getPaymentMethod = () =>
    screen.getByRole(ARIA_ROLE.TEXTBOX, {
      name: new RegExp(COPY.LABEL_METHOD),
    });
  const getSubmit = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: SUBMIT_NAME,
    });
  const getCurrency = (label: string) =>
    screen.getByRole(ARIA_ROLE.RADIO, {
      name: new RegExp(label),
    });

  return {
    clearAmount: () => user.clear(getAmount()),
    findAlertText: async () =>
      (await screen.findByRole(ARIA_ROLE.ALERT))
        .textContent,
    findText: (text: string) => screen.findByText(text),
    getAlert: () => screen.getByRole(ARIA_ROLE.ALERT),
    getAlertText: () =>
      screen.getByRole(ARIA_ROLE.ALERT).textContent,
    getAmount,
    getCurrency,
    getPaymentMethod,
    getStatusText: () =>
      screen.getByRole(ARIA_ROLE.STATUS).textContent,
    getSubmit,
    queryCurrencyRadios: () =>
      screen.queryAllByRole(ARIA_ROLE.RADIO),
    queryText: (text: string) => screen.queryByText(text),
    selectCurrency: (label: string) =>
      user.click(getCurrency(label)),
    submit: () => user.click(getSubmit()),
    typeAmount: (amount: string) =>
      user.type(getAmount(), amount),
    typePaymentMethod: (method: string) =>
      user.type(getPaymentMethod(), method),
  };
};
