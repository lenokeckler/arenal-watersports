import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_CHARGE_FIELD_ID as FIELD_ID } from "../constants/ReservationChargeUi.constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";

const BUSY_ATTRIBUTE = "aria-busy";
const AMOUNT_NAME = /^Monto acordado/;
const OTHER_METHOD_NAME = new RegExp(
  `^${COPY.OTHER_METHOD_LABEL}`
);
const SUBMIT_NAME = new RegExp(
  `^(${COPY.SUBMIT}|${COPY.SUBMITTING})`
);

export const createReservationChargeViewPage = () => {
  const user = userEvent.setup();
  const getAmount = () =>
    screen.getByRole(ARIA_ROLE.TEXTBOX, {
      name: AMOUNT_NAME,
    });
  const getPaymentChoice = (label: string) =>
    screen.getByRole(ARIA_ROLE.RADIO, { name: label });
  const getOtherMethod = () =>
    screen.getByRole(ARIA_ROLE.TEXTBOX, {
      name: OTHER_METHOD_NAME,
    });
  const getSubmit = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: SUBMIT_NAME,
    });
  const getCurrency = (label: string) =>
    screen.getByRole(ARIA_ROLE.RADIO, {
      name: new RegExp(label),
    });

  const getCurrencyGroup = () =>
    screen.getByRole(ARIA_ROLE.GROUP, {
      name: COPY.CURRENCY_LEGEND,
    });

  const getAmountByLabel = (label: string) =>
    screen.getByRole(ARIA_ROLE.TEXTBOX, {
      name: new RegExp(label),
    });
  const getToggle = (label: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, { name: label });

  return {
    clearAmount: () => user.clear(getAmount()),
    findAlertText: async () =>
      (await screen.findByRole(ARIA_ROLE.ALERT))
        .textContent,
    findStatusText: async () =>
      (await screen.findByRole(ARIA_ROLE.STATUS))
        .textContent,
    findText: (text: string) => screen.findByText(text),
    getAlert: () => screen.getByRole(ARIA_ROLE.ALERT),
    getAlertText: () =>
      screen.getByRole(ARIA_ROLE.ALERT).textContent,
    getAmount,
    getAmountByLabel,
    getAmountForm: () => getAmount().closest("form"),
    getSubmitForm: () => getSubmit().closest("form"),
    getCurrencyRadios: () =>
      within(getCurrencyGroup()).getAllByRole(
        ARIA_ROLE.RADIO
      ),
    getBusy: () =>
      getSubmit()
        .closest("form")
        ?.getAttribute(BUSY_ATTRIBUTE),
    getCurrency,
    getOtherMethod,
    getPaymentChoice,
    getPaymentChoices: () =>
      screen
        .getAllByRole<HTMLInputElement>(ARIA_ROLE.RADIO)
        .filter(
          ({ name }) => name === FIELD_ID.PAYMENT_METHOD
        ),
    pressKey: (keys: string) => user.keyboard(keys),
    queryOtherMethod: () =>
      screen.queryByRole(ARIA_ROLE.TEXTBOX, {
        name: OTHER_METHOD_NAME,
      }),
    typeOtherMethod: (method: string) =>
      user.type(getOtherMethod(), method),
    getStatusText: () =>
      screen.getByRole(ARIA_ROLE.STATUS).textContent,
    getSubmit,
    getToggle,
    queryAmountByLabel: (label: string) =>
      screen.queryByRole(ARIA_ROLE.TEXTBOX, {
        name: label,
      }),
    clickToggle: (label: string) =>
      user.click(getToggle(label)),
    typeAmountByLabel: (label: string, amount: string) =>
      user.type(getAmountByLabel(label), amount),
    queryCurrencyRadios: () =>
      screen
        .queryAllByRole(ARIA_ROLE.GROUP, {
          name: COPY.CURRENCY_LEGEND,
        })
        .flatMap((group) =>
          within(group).queryAllByRole(ARIA_ROLE.RADIO)
        ),
    queryText: (text: string) => screen.queryByText(text),
    selectCurrency: (label: string) =>
      user.click(getCurrency(label)),
    submit: () => user.click(getSubmit()),
    typeAmount: (amount: string) =>
      user.type(getAmount(), amount),
    selectPaymentMethod: (label: string) =>
      user.click(getPaymentChoice(label)),
  };
};
