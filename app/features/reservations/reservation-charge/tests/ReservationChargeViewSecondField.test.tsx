import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CURRENCY_NAME_COPY } from "@/app/constants";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION } from "../constants/ReservationChargeValidationCopy.constants";
import {
  EDITED_AMOUNT_TEXT,
  EDITED_METHOD_TEXT,
  MIXED_CHARGE,
} from "./ReservationChargeForm.constants";
import { renderReservationChargeView } from "./renderReservationChargeView";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

const INVALID_AMOUNT_TEXT = "abc";
const FIRST_LABEL = COPY.AMOUNT_LABEL.USD;
const SECOND_LABEL = COPY.AMOUNT_LABEL.CRC;

describe("ReservationChargeView second field toggle", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("adds a dollars field when colones is the selected currency", async () => {
    const page = renderReservationChargeView();

    await page.selectCurrency(CURRENCY_NAME_COPY.CRC);
    await page.clickToggle(COPY.ADD_CURRENCY.USD);

    expect(
      page.getAmountByLabel(SECOND_LABEL)
    ).toBeInTheDocument();
    expect(page.getAmountByLabel(FIRST_LABEL)).toHaveValue(
      ""
    );
    expect(
      page.getToggle(COPY.REMOVE_CURRENCY.USD)
    ).toBeInTheDocument();
  });

  it("keeps the typed first value when the second field is added", async () => {
    const page = renderReservationChargeView();

    await page.clearAmount();
    await page.typeAmount(EDITED_AMOUNT_TEXT);
    await page.clickToggle(COPY.ADD_CURRENCY.CRC);

    expect(page.getAmountByLabel(FIRST_LABEL)).toHaveValue(
      EDITED_AMOUNT_TEXT
    );
  });

  it("adds the second field with Enter and removes it with Space", async () => {
    const page = renderReservationChargeView();
    const user = userEvent.setup();

    page.getToggle(COPY.ADD_CURRENCY.CRC).focus();
    await user.keyboard("{Enter}");
    expect(
      page.getAmountByLabel(SECOND_LABEL)
    ).toBeInTheDocument();

    page.getToggle(COPY.REMOVE_CURRENCY.CRC).focus();
    await user.keyboard(" ");
    expect(
      page.queryAmountByLabel(SECOND_LABEL)
    ).toBeNull();
  });

  it("is a plain button that never submits the form", async () => {
    const page = renderReservationChargeView();

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);
    await page.clickToggle(COPY.REMOVE_CURRENCY.CRC);

    expect(
      page.getToggle(COPY.ADD_CURRENCY.CRC)
    ).toHaveAttribute("type", "button");
    expect(
      recordReservationChargeAction
    ).not.toHaveBeenCalled();
  });

  it("ends collapsed after a double click on the toggle", async () => {
    const page = renderReservationChargeView();
    const user = userEvent.setup();

    await user.dblClick(
      page.getToggle(COPY.ADD_CURRENCY.CRC)
    );

    expect(
      page.queryAmountByLabel(SECOND_LABEL)
    ).toBeNull();
    expect(page.getCurrencyRadios()).toHaveLength(2);
  });

  it("shows the manual helper under a second field without a proposal", async () => {
    const page = renderReservationChargeView(MIXED_CHARGE);

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);

    expect(
      page.queryText(COPY.AMOUNT_HELPER_MANUAL)
    ).not.toBeNull();
  });

  it("flags an invalid second amount, focuses it and sends nothing", async () => {
    const page = renderReservationChargeView();

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);
    await page.typeAmountByLabel(
      SECOND_LABEL,
      INVALID_AMOUNT_TEXT
    );
    await page.typePaymentMethod(EDITED_METHOD_TEXT);
    await page.submit();

    expect(
      page.getAmountByLabel(SECOND_LABEL)
    ).toHaveFocus();
    expect(
      page.getAmountByLabel(SECOND_LABEL)
    ).toBeInvalid();
    expect(page.getAmountByLabel(FIRST_LABEL)).toBeValid();
    expect(
      recordReservationChargeAction
    ).not.toHaveBeenCalled();
  });

  it("clears the second error message after removing the field", async () => {
    const page = renderReservationChargeView();

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);
    await page.typePaymentMethod(EDITED_METHOD_TEXT);
    await page.submit();
    await page.clickToggle(COPY.REMOVE_CURRENCY.CRC);

    expect(
      page.queryText(VALIDATION.AMOUNT_REQUIRED)
    ).toBeNull();
  });

  it("disables the toggle and both fields while pending", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockReturnValue(new Promise(() => undefined));
    const page = renderReservationChargeView();

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);
    await page.typeAmountByLabel(
      SECOND_LABEL,
      EDITED_AMOUNT_TEXT
    );
    await page.typePaymentMethod(EDITED_METHOD_TEXT);
    await page.submit();

    expect(
      page.getAmountByLabel(FIRST_LABEL)
    ).toBeDisabled();
    expect(
      page.getAmountByLabel(SECOND_LABEL)
    ).toBeDisabled();
    expect(
      page.getToggle(COPY.REMOVE_CURRENCY.CRC)
    ).toBeDisabled();
  });
});
