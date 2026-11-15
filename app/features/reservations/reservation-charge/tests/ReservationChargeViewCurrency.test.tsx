import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CURRENCY_CODE,
  CURRENCY_NAME_COPY,
} from "@/app/constants";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION } from "../constants/ReservationChargeValidationCopy.constants";
import { EXPECTED_SCHEDULED } from "./ReservationCharge.constants";
import {
  CRC_ENTERED_AMOUNT_TEXT,
  CRC_ONLY_CHARGE,
  CRC_ONLY_PROPOSAL_TEXT,
  EDITED_METHOD_TEXT,
  EMPTY_CHARGE,
  MIXED_CHARGE,
  MIXED_USD_PROPOSAL_TEXT,
} from "./ReservationChargeForm.constants";
import { CRC_RECORDED } from "./ReservationChargeRecordedParts.constants";
import { renderReservationChargeView } from "./renderReservationChargeView";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

describe("ReservationChargeView charge in either currency", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("starts on colones with the proposal when only colones has one", () => {
    const page =
      renderReservationChargeView(CRC_ONLY_CHARGE);

    expect(
      page.getCurrency(CURRENCY_NAME_COPY.CRC)
    ).toBeChecked();
    expect(page.getAmount()).toHaveValue(
      CRC_ONLY_PROPOSAL_TEXT
    );
    expect(
      page.getCurrency(CURRENCY_NAME_COPY.USD)
    ).not.toBeChecked();
  });

  it("starts on dollars with an empty amount when nothing is proposed", () => {
    const page = renderReservationChargeView(EMPTY_CHARGE);

    expect(
      page.getCurrency(CURRENCY_NAME_COPY.USD)
    ).toBeChecked();
    expect(page.getAmount()).toHaveValue("");
  });

  it("restores the dollar proposal when switching back without typing", async () => {
    const page = renderReservationChargeView(MIXED_CHARGE);

    await page.selectCurrency(CURRENCY_NAME_COPY.CRC);
    await page.selectCurrency(CURRENCY_NAME_COPY.USD);

    expect(page.getAmount()).toHaveValue(
      MIXED_USD_PROPOSAL_TEXT
    );
  });

  it("keeps the amount typed in colones when switching back to dollars", async () => {
    const page = renderReservationChargeView(MIXED_CHARGE);

    await page.selectCurrency(CURRENCY_NAME_COPY.CRC);
    await page.typeAmount(CRC_ENTERED_AMOUNT_TEXT);
    await page.selectCurrency(CURRENCY_NAME_COPY.USD);

    expect(page.getAmount()).toHaveValue(
      CRC_ENTERED_AMOUNT_TEXT
    );
  });

  it("requires an amount in colones when the catalog has no colones proposal", async () => {
    const page = renderReservationChargeView(MIXED_CHARGE);

    await page.selectCurrency(CURRENCY_NAME_COPY.CRC);
    await page.typePaymentMethod(EDITED_METHOD_TEXT);
    await page.submit();

    expect(
      page.queryText(VALIDATION.AMOUNT_REQUIRED)
    ).not.toBeNull();
    expect(page.getAmount()).toHaveFocus();
    expect(
      recordReservationChargeAction
    ).not.toHaveBeenCalled();
  });

  it("sends the colones amount with the colones currency and shows it in the receipt", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      ok: true,
      recorded: CRC_RECORDED,
    });
    const page = renderReservationChargeView(MIXED_CHARGE);

    await page.selectCurrency(CURRENCY_NAME_COPY.CRC);
    await page.typeAmount(CRC_ENTERED_AMOUNT_TEXT);
    await page.typePaymentMethod(EDITED_METHOD_TEXT);
    await page.submit();

    expect(
      recordReservationChargeAction
    ).toHaveBeenCalledWith({
      amountText: CRC_ENTERED_AMOUNT_TEXT,
      currency: CURRENCY_CODE.CRC,
      paymentMethod: EDITED_METHOD_TEXT,
      reservationId: EXPECTED_SCHEDULED.id,
      secondAmountText: null,
    });
    expect(await page.findStatusText()).toBe(
      COPY.SUCCESS(EXPECTED_SCHEDULED.code)
    );
    expect(
      await page.findText(CURRENCY_NAME_COPY.CRC)
    ).toBeInTheDocument();
  });

  it("resolves the second field to dollars after choosing colones and hides the group", async () => {
    const page = renderReservationChargeView(MIXED_CHARGE);

    await page.selectCurrency(CURRENCY_NAME_COPY.CRC);
    await page.clickToggle(COPY.ADD_CURRENCY.USD);

    expect(page.queryCurrencyRadios()).toHaveLength(0);
    expect(
      page.getAmountByLabel(COPY.AMOUNT_LABEL.USD)
    ).toHaveValue("");
    expect(
      page.getAmountByLabel(COPY.AMOUNT_LABEL.CRC)
    ).toBeInTheDocument();
  });
});
