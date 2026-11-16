import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";

const BUSY_ATTRIBUTE = "aria-busy";
const HREF_ATTRIBUTE = "href";
const AMOUNT_NAME = /^Monto devuelto/;
const OTHER_REASON_NAME = new RegExp(COPY.OTHER_LABEL);
const SUBMIT_NAME = new RegExp(
  `^(${COPY.SUBMIT}|${COPY.SUBMITTING})`
);

export const createReservationRefundViewPage = () => {
  const user = userEvent.setup();
  const getAmount = () =>
    screen.getByRole(ARIA_ROLE.TEXTBOX, {
      name: AMOUNT_NAME,
    });
  const getSubmit = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: SUBMIT_NAME,
    });
  const getRadio = (label: string) =>
    screen.getByRole(ARIA_ROLE.RADIO, {
      name: new RegExp(label),
    });

  return {
    findAlertText: async () =>
      (await screen.findByRole(ARIA_ROLE.ALERT))
        .textContent,
    findStatusText: async () =>
      (await screen.findByRole(ARIA_ROLE.STATUS))
        .textContent,
    getAlert: () => screen.getByRole(ARIA_ROLE.ALERT),
    getAmount,
    getBackHref: () =>
      screen
        .getByRole(ARIA_ROLE.LINK, { name: COPY.BACK })
        .getAttribute(HREF_ATTRIBUTE),
    getBusy: () =>
      getSubmit()
        .closest("form")
        ?.getAttribute(BUSY_ATTRIBUTE),
    getDefinitionValue: (label: string) =>
      screen.getByText(label).nextElementSibling
        ?.textContent,
    getOtherReason: () =>
      screen.getByRole(ARIA_ROLE.TEXTBOX, {
        name: OTHER_REASON_NAME,
      }),
    getRadio,
    getSubmit,
    queryCurrencyGroup: () =>
      screen.queryByRole(ARIA_ROLE.GROUP, {
        name: COPY.CURRENCY_LEGEND,
      }),
    queryOtherReason: () =>
      screen.queryByRole(ARIA_ROLE.TEXTBOX, {
        name: OTHER_REASON_NAME,
      }),
    querySubmit: () =>
      screen.queryByRole(ARIA_ROLE.BUTTON, {
        name: SUBMIT_NAME,
      }),
    queryText: (text: string) => screen.queryByText(text),
    selectRadio: (label: string) =>
      user.click(getRadio(label)),
    submit: () => user.click(getSubmit()),
    typeAmount: (amount: string) =>
      user.type(getAmount(), amount),
    typeOtherReason: (text: string) =>
      user.type(
        screen.getByRole(ARIA_ROLE.TEXTBOX, {
          name: OTHER_REASON_NAME,
        }),
        text
      ),
  };
};
