import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE, STRING } from "@/app/constants";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";

import {
  AMOUNT_NAME_SEPARATOR,
  ARIA_BUSY_ATTRIBUTE,
  ARIA_DESCRIBEDBY_ATTRIBUTE,
  ARIA_INVALID_ATTRIBUTE,
  HREF_ATTRIBUTE,
  ID_SEPARATOR,
} from "./ReservationRefundView.constants";

const AMOUNT_NAME = new RegExp(
  Object.values(COPY.AMOUNT_LABEL).join(
    AMOUNT_NAME_SEPARATOR
  )
);
const keepText = (text: string): string => text;
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
  const getReasonGroup = () =>
    screen.getByRole(ARIA_ROLE.GROUP, {
      name: COPY.REASON_LEGEND,
    });
  const describeBy = (element: HTMLElement) =>
    (
      element.getAttribute(ARIA_DESCRIBEDBY_ATTRIBUTE) ??
      STRING.Empty
    )
      .split(ID_SEPARATOR)
      .map((id) => document.getElementById(id)?.textContent)
      .join(ID_SEPARATOR);

  return {
    findAlertText: async () =>
      (await screen.findByRole(ARIA_ROLE.ALERT))
        .textContent,
    findStatusText: async () =>
      (await screen.findByRole(ARIA_ROLE.STATUS))
        .textContent,
    getAlert: () => screen.getByRole(ARIA_ROLE.ALERT),
    getAmount,
    getAmountDescription: () => describeBy(getAmount()),
    getAmountInvalid: () =>
      getAmount().getAttribute(ARIA_INVALID_ATTRIBUTE),
    getBackHref: () =>
      screen
        .getByRole(ARIA_ROLE.LINK, { name: COPY.BACK })
        .getAttribute(HREF_ATTRIBUTE),
    getBusy: () =>
      getSubmit()
        .closest("form")
        ?.getAttribute(ARIA_BUSY_ATTRIBUTE),
    getDefinitionValue: (label: string) =>
      screen.getByText(label).nextElementSibling
        ?.textContent,
    getOtherReason: () =>
      screen.getByRole(ARIA_ROLE.TEXTBOX, {
        name: OTHER_REASON_NAME,
      }),
    getRadio,
    getRadioInvalid: (label: string) =>
      getRadio(label).getAttribute(ARIA_INVALID_ATTRIBUTE),
    getReasonDescription: () =>
      describeBy(getReasonGroup()),
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
    queryExactText: (text: string) =>
      screen.queryByText(text, { normalizer: keepText }),
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
