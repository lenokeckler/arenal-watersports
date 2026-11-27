import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION } from "../constants/ReservationChargeValidationCopy.constants";
import { EXPECTED_SCHEDULED } from "./ReservationCharge.constants";
import { CHARGE_RECORDED } from "./ReservationChargeAction.constants";
import { EDITED_METHOD_TEXT } from "./ReservationChargeForm.constants";
import { MIXED_RECORDED } from "./ReservationChargeRecordedParts.constants";
import { renderReservationChargeView } from "./renderReservationChargeView";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

const SECOND_LABEL = COPY.AMOUNT_LABEL.CRC;
const SECOND_AMOUNT_TEXT = "12000";

describe("ReservationChargeView mixed mode", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("sends both amounts and shows both parts in the receipt", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      ok: true,
      recorded: MIXED_RECORDED,
    });
    const page = renderReservationChargeView();

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);
    await page.typeAmountByLabel(
      SECOND_LABEL,
      SECOND_AMOUNT_TEXT
    );
    await page.selectPaymentMethod(EDITED_METHOD_TEXT);
    await page.submit();

    expect(await page.findStatusText()).toBe(
      COPY.SUCCESS(EXPECTED_SCHEDULED.code)
    );
    expect(
      recordReservationChargeAction
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        secondAmountText: SECOND_AMOUNT_TEXT,
      })
    );
    expect(
      await page.findText(COPY.LABEL_PART.CRC)
    ).toBeInTheDocument();
  });

  it("flags the empty second field, focuses it and sends nothing", async () => {
    const page = renderReservationChargeView();

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);
    await page.selectPaymentMethod(EDITED_METHOD_TEXT);
    await page.submit();

    expect(
      page.queryText(VALIDATION.AMOUNT_REQUIRED)
    ).not.toBeNull();
    expect(
      page.getAmountByLabel(SECOND_LABEL)
    ).toHaveFocus();
    expect(
      recordReservationChargeAction
    ).not.toHaveBeenCalled();
  });

  it("sends a single part again after removing the second field", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      ok: true,
      recorded: CHARGE_RECORDED,
    });
    const page = renderReservationChargeView();

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);
    await page.clickToggle(COPY.REMOVE_CURRENCY.CRC);
    await page.selectPaymentMethod(EDITED_METHOD_TEXT);
    await page.submit();

    await page.findStatusText();
    expect(
      recordReservationChargeAction
    ).toHaveBeenCalledWith(
      expect.objectContaining({ secondAmountText: null })
    );
  });
});
