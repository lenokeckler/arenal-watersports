import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import ReservationDepositView from "../ReservationDepositView";
import { RESERVATION_DEPOSIT_FORM_COPY as COPY } from "../constants/ReservationDepositFormCopy.constants";
import type { ReservationDeposit } from "../models/ReservationDeposit.interface";
import { UNDECIDED_DEPOSIT } from "./ReservationDeposit.constants";

const SUBMIT_NAME = new RegExp(
  [
    COPY.SUBMIT,
    COPY.SUBMITTING,
    COPY.SUBMIT_DECLINED,
    COPY.SUBMITTING_DECLINED,
  ].join("|")
);

const keepText = (text: string): string => text;

export const renderReservationDepositView = (
  deposit: ReservationDeposit = UNDECIDED_DEPOSIT
) => {
  const user = userEvent.setup();
  render(<ReservationDepositView deposit={deposit} />);
  const getAmount = () =>
    screen.getByRole(ARIA_ROLE.TEXTBOX);

  return {
    clearAmount: () => user.clear(getAmount()),
    findAlertText: async () =>
      (await screen.findByRole(ARIA_ROLE.ALERT))
        .textContent,
    findStatusText: async () =>
      (await screen.findByRole(ARIA_ROLE.STATUS))
        .textContent,
    getAmount,
    getSubmit: () =>
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: SUBMIT_NAME,
      }),
    queryAmount: () =>
      screen.queryByRole(ARIA_ROLE.TEXTBOX),
    queryExactText: (text: string) =>
      screen.queryByText(text, { normalizer: keepText }),
    queryText: (text: string) => screen.queryByText(text),
    selectRadio: (label: string) =>
      user.click(
        screen.getByRole(ARIA_ROLE.RADIO, {
          name: new RegExp(label),
        })
      ),
    submit: () =>
      user.click(
        screen.getByRole(ARIA_ROLE.BUTTON, {
          name: SUBMIT_NAME,
        })
      ),
    typeAmount: (text: string) =>
      user.type(getAmount(), text),
  };
};
