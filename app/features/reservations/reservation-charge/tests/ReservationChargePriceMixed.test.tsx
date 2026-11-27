import { describe, expect, it, vi } from "vitest";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_FIELD_ID as FIELD_ID } from "../constants/ReservationChargeUi.constants";
import {
  EDITED_AMOUNT_TEXT,
  USD_PROPOSAL_TEXT,
} from "./ReservationChargeForm.constants";
import { renderReservationChargeView } from "./renderReservationChargeView";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

const FIRST_LABEL = COPY.AMOUNT_LABEL.USD;
const SECOND_LABEL = COPY.AMOUNT_LABEL.CRC;

describe("ReservationChargePrice mixed mode", () => {
  it("shows an empty second field named after the other currency", async () => {
    const page = renderReservationChargeView();

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);

    expect(page.getAmountByLabel(SECOND_LABEL)).toHaveValue(
      ""
    );
    expect(page.getAmountByLabel(FIRST_LABEL)).toHaveValue(
      USD_PROPOSAL_TEXT
    );
  });

  it("hides the currency group while mixed and brings it back after removing", async () => {
    const page = renderReservationChargeView();

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);
    expect(page.queryCurrencyRadios()).toHaveLength(0);

    await page.clickToggle(COPY.REMOVE_CURRENCY.CRC);
    expect(page.getCurrencyRadios()).toHaveLength(2);
  });

  it("keeps the first value and drops the second after remove", async () => {
    const page = renderReservationChargeView();

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);
    await page.typeAmountByLabel(
      SECOND_LABEL,
      EDITED_AMOUNT_TEXT
    );
    await page.clickToggle(COPY.REMOVE_CURRENCY.CRC);

    expect(
      page.queryAmountByLabel(SECOND_LABEL)
    ).toBeNull();
    expect(page.getAmountByLabel(FIRST_LABEL)).toHaveValue(
      USD_PROPOSAL_TEXT
    );
  });

  it("moves focus to the second field on add and back to the button on remove", async () => {
    const page = renderReservationChargeView();

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);
    expect(
      page.getAmountByLabel(SECOND_LABEL)
    ).toHaveFocus();

    await page.clickToggle(COPY.REMOVE_CURRENCY.CRC);
    expect(
      page.getToggle(COPY.ADD_CURRENCY.CRC)
    ).toHaveFocus();
  });

  it("describes the second field with its helper and the mixed note", async () => {
    const page = renderReservationChargeView();

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);

    expect(
      page.getAmountByLabel(SECOND_LABEL)
    ).toHaveAttribute(
      "aria-describedby",
      `${FIELD_ID.SECOND_AMOUNT_HELPER} ${FIELD_ID.MIXED_HELPER}`
    );
    expect(
      page.queryText(COPY.MIXED_SECOND_HELPER)
    ).not.toBeNull();
  });
});
