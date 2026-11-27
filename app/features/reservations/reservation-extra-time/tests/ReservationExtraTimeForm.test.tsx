import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CURRENCY_NAME_COPY,
  CURRENCY_CODE,
  PATHS,
  PAYMENT_CHOICE,
  PAYMENT_CHOICE_COPY,
} from "@/app/constants";
import { recordReservationExtraTimeAction } from "../actions/recordReservationExtraTimeAction";
import { RESERVATION_EXTRA_TIME_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationExtraTimeFeedbackCopy.constants";
import { RESERVATION_EXTRA_TIME_FORM_COPY as COPY } from "../constants/ReservationExtraTimeFormCopy.constants";
import { RESERVATION_EXTRA_TIME_OUTCOME as OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import { RESERVATION_EXTRA_TIME_VALIDATION_COPY as VALIDATION } from "../constants/ReservationExtraTimeValidationCopy.constants";
import {
  EXTRA_TIME_AMOUNT_TEXT,
  EXTRA_TIME_CHARGED_INPUT,
  EXTRA_TIME_RESERVATION_ID,
} from "./ReservationExtraTime.constants";
import { renderReservationExtraTimeForm } from "./renderReservationExtraTimeForm";

vi.mock(
  "../actions/recordReservationExtraTimeAction",
  () => ({
    recordReservationExtraTimeAction: vi.fn(),
  })
);

const CHARGE_LABEL = COPY.OUTCOME_LABEL[OUTCOME.CHARGED];
const COURTESY_LABEL = COPY.OUTCOME_LABEL[OUTCOME.COURTESY];

describe("ReservationExtraTimeForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("offers the decision first, without the charge fields", () => {
    const page = renderReservationExtraTimeForm();

    expect(page.getRadio(CHARGE_LABEL)).not.toBeChecked();
    expect(page.getRadio(COURTESY_LABEL)).not.toBeChecked();
    expect(page.queryAmount()).toBeNull();
    expect(page.getSubmit()).toHaveTextContent(
      COPY.SUBMIT_UNDECIDED
    );
    expect(page.getBackLink()).toHaveAttribute(
      "href",
      PATHS.RESERVATIONS.DETAIL(EXTRA_TIME_RESERVATION_ID)
    );
  });

  it("asks for the decision when nothing is chosen", async () => {
    const page = renderReservationExtraTimeForm();

    await page.submit();

    expect(
      page.queryText(VALIDATION.OUTCOME_REQUIRED)
    ).not.toBeNull();
    expect(
      recordReservationExtraTimeAction
    ).not.toHaveBeenCalled();
  });

  it("shows the currency, amount and payment method for a charge", async () => {
    const page = renderReservationExtraTimeForm();

    await page.choose(CHARGE_LABEL);

    expect(
      page.getRadio(CURRENCY_NAME_COPY.USD)
    ).toBeChecked();
    expect(page.getAmount()).toHaveAccessibleName(
      new RegExp(COPY.AMOUNT_LABEL[CURRENCY_CODE.USD])
    );
    expect(
      page.getRadio(
        PAYMENT_CHOICE_COPY[PAYMENT_CHOICE.SINPE]
      )
    ).toBeInTheDocument();
    expect(page.getSubmit()).toHaveTextContent(
      COPY.SUBMIT[OUTCOME.CHARGED]
    );
  });

  it("names the amount in the selected currency", async () => {
    const page = renderReservationExtraTimeForm();
    await page.choose(CHARGE_LABEL);

    await page.choose(CURRENCY_NAME_COPY.CRC);

    expect(page.getAmount()).toHaveAccessibleName(
      new RegExp(COPY.AMOUNT_LABEL[CURRENCY_CODE.CRC])
    );
  });

  it("asks for the amount and the method of a charge", async () => {
    const page = renderReservationExtraTimeForm();
    await page.choose(CHARGE_LABEL);

    await page.submit();

    expect(
      page.queryText(VALIDATION.AMOUNT_REQUIRED)
    ).not.toBeNull();
    expect(
      page.queryText(VALIDATION.CHOICE_REQUIRED)
    ).not.toBeNull();
  });

  it("asks which method when Otro is chosen", async () => {
    const page = renderReservationExtraTimeForm();
    await page.choose(CHARGE_LABEL);

    await page.choose(
      PAYMENT_CHOICE_COPY[PAYMENT_CHOICE.OTHER]
    );

    expect(page.queryOtherMethod()).not.toBeNull();
  });

  it("hides the charge fields again for a courtesy", async () => {
    const page = renderReservationExtraTimeForm();
    await page.choose(CHARGE_LABEL);

    await page.choose(COURTESY_LABEL);

    expect(page.queryAmount()).toBeNull();
    expect(page.getSubmit()).toHaveTextContent(
      COPY.SUBMIT[OUTCOME.COURTESY]
    );
  });

  it("sends a complete charge", async () => {
    vi.mocked(
      recordReservationExtraTimeAction
    ).mockResolvedValue({
      errors: {},
      formError: FEEDBACK.ALREADY_RESOLVED,
      ok: false,
    });
    const page = renderReservationExtraTimeForm();
    await page.choose(CHARGE_LABEL);
    await page.typeAmount(EXTRA_TIME_AMOUNT_TEXT);
    await page.choose(
      PAYMENT_CHOICE_COPY[PAYMENT_CHOICE.CASH]
    );

    await page.submit();

    expect(
      recordReservationExtraTimeAction
    ).toHaveBeenCalledWith(EXTRA_TIME_CHARGED_INPUT);
    await expect(page.findAlertText()).resolves.toBe(
      FEEDBACK.ALREADY_RESOLVED
    );
  });
});
