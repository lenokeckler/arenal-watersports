import { within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_UI_COPY as UI_COPY } from "../constants/ReservationChargeUiCopy.constants";
import {
  MIXED_CHARGE,
  USD_PROPOSAL_TEXT,
} from "./ReservationChargeForm.constants";
import { createReservationChargePage } from "./ReservationCharge.page";
import { createReservationChargeViewPage } from "./ReservationChargeView.page";
import { renderReservationChargeSummary } from "./renderReservationChargeSummary";

const renderSummary = (
  ...args: Parameters<typeof renderReservationChargeSummary>
) => {
  renderReservationChargeSummary(...args);
  return {
    ...createReservationChargePage(),
    ...createReservationChargeViewPage(),
  };
};

describe("ReservationChargePrice", () => {
  it("edits the agreed amount inside the summary region", () => {
    const page = renderSummary();
    const summary = page.getRegion(UI_COPY.SUMMARY_HEADING);

    expect(
      within(summary).getByRole(ARIA_ROLE.TEXTBOX, {
        name: new RegExp(COPY.AMOUNT_LABEL.USD),
      })
    ).toHaveValue(USD_PROPOSAL_TEXT);
    expect(page.getAmount()).toBe(
      within(summary).getByRole(ARIA_ROLE.TEXTBOX)
    );
  });

  it("offers the currency group when more than one currency is offered", () => {
    const page = renderSummary();

    expect(page.getCurrencyRadios()).toHaveLength(2);
  });

  it("omits the currency group when one currency is offered", () => {
    const page = renderSummary(MIXED_CHARGE);

    expect(page.queryCurrencyRadios()).toHaveLength(0);
    expect(page.getAmount()).toBeInTheDocument();
  });

  it("does not repeat the catalog proposal as static lines", () => {
    const page = renderSummary(MIXED_CHARGE);

    expect(
      page.queryText(UI_COPY.NO_PROPOSAL_LINE.CRC)
    ).toBeNull();
  });
});
