import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_PAYMENT_CHOICE_ORDER } from "../constants/ReservationChargePaymentChoice.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION } from "../constants/ReservationChargeValidationCopy.constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import {
  ARROW_DOWN_KEY,
  CARD_LABEL,
  OTHER_LABEL,
  OTHER_METHOD_TEXT,
  PAYPAL_LABEL,
  TOO_LONG_METHOD_TEXT,
} from "./ReservationChargePaymentMethod.constants";
import { renderReservationChargeView } from "./renderReservationChargeView";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

describe("ReservationChargeView payment method", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("starts with nothing chosen and the Otro field hidden", () => {
    const page = renderReservationChargeView();

    expect(page.getPaymentChoices()).toHaveLength(
      RESERVATION_CHARGE_PAYMENT_CHOICE_ORDER.length
    );
    expect(
      page
        .getPaymentChoices()
        .some(({ checked }) => checked)
    ).toBe(false);
    expect(page.queryOtherMethod()).toBeNull();
  });

  it("shows the helper and no alert before anything is submitted", () => {
    const page = renderReservationChargeView();

    expect(
      page.queryText(COPY.METHOD_HELPER)
    ).not.toBeNull();
    expect(page.queryAlert()).toBeNull();
  });

  it("announces the choice error and links it with the helper to the group", async () => {
    const page = renderReservationChargeView();

    await page.submit();

    expect(page.getAlert()).toHaveTextContent(
      VALIDATION.CHOICE_REQUIRED
    );
    expect(
      page.getPaymentGroup()
    ).toHaveAccessibleDescription(
      `${VALIDATION.CHOICE_REQUIRED} ${COPY.METHOD_HELPER}`
    );
  });

  it("asks for a choice and focuses the first chip when none is chosen", async () => {
    const page = renderReservationChargeView();

    await page.submit();

    expect(
      page.queryText(VALIDATION.CHOICE_REQUIRED)
    ).not.toBeNull();
    expect(page.getPaymentChoices()[0]).toHaveFocus();
    expect(
      recordReservationChargeAction
    ).not.toHaveBeenCalled();
  });

  it("clears the choice error once a chip is chosen", async () => {
    const page = renderReservationChargeView();
    await page.submit();

    await page.selectPaymentMethod(CARD_LABEL);

    expect(
      page.queryText(VALIDATION.CHOICE_REQUIRED)
    ).toBeNull();
  });

  it("asks for the Otro text and focuses its field when it is empty", async () => {
    const page = renderReservationChargeView();

    await page.selectPaymentMethod(OTHER_LABEL);
    await page.submit();

    expect(
      page.queryText(VALIDATION.OTHER_REQUIRED)
    ).not.toBeNull();
    expect(page.getOtherMethod()).toHaveFocus();
  });

  it("refuses an Otro text over the limit", async () => {
    const page = renderReservationChargeView();

    await page.selectPaymentMethod(OTHER_LABEL);
    await page.typeOtherMethod(TOO_LONG_METHOD_TEXT);
    await page.submit();

    expect(
      page.queryText(VALIDATION.METHOD_TOO_LONG)
    ).not.toBeNull();
    expect(
      recordReservationChargeAction
    ).not.toHaveBeenCalled();
  });

  it("restores the Otro text after leaving and coming back", async () => {
    const page = renderReservationChargeView();

    await page.selectPaymentMethod(OTHER_LABEL);
    await page.typeOtherMethod(OTHER_METHOD_TEXT);
    await page.selectPaymentMethod(CARD_LABEL);
    expect(page.queryOtherMethod()).toBeNull();
    await page.selectPaymentMethod(OTHER_LABEL);

    expect(page.getOtherMethod()).toHaveValue(
      OTHER_METHOD_TEXT
    );
  });

  it("does not block a chosen method because of leftover invalid Otro text", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockReturnValue(new Promise(() => undefined));
    const page = renderReservationChargeView();

    await page.selectPaymentMethod(OTHER_LABEL);
    await page.typeOtherMethod(TOO_LONG_METHOD_TEXT);
    await page.selectPaymentMethod(CARD_LABEL);
    await page.submit();

    expect(
      recordReservationChargeAction
    ).toHaveBeenCalledOnce();
  });

  it("moves the choice with the arrow keys inside the group", async () => {
    const page = renderReservationChargeView();

    await page.selectPaymentMethod(CARD_LABEL);
    await page.pressKey(ARROW_DOWN_KEY);

    expect(
      page.getPaymentChoice(PAYPAL_LABEL)
    ).toBeChecked();
  });

  it("disables every chip and the Otro field while recording", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockReturnValue(new Promise(() => undefined));
    const page = renderReservationChargeView();

    await page.selectPaymentMethod(OTHER_LABEL);
    await page.typeOtherMethod(OTHER_METHOD_TEXT);
    await page.submit();

    expect(page.getOtherMethod()).toBeDisabled();
    page
      .getPaymentChoices()
      .forEach((chip) => expect(chip).toBeDisabled());
  });
});
