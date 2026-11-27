import { describe, expect, it, vi } from "vitest";
import { CURRENCY_NAME_COPY } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_FIELD_ID as FIELD_ID } from "../constants/ReservationChargeUi.constants";
import { MIXED_CHARGE } from "./ReservationChargeForm.constants";
import { renderReservationChargeView } from "./renderReservationChargeView";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

describe("ReservationChargeSecondAmountToggle", () => {
  it("offers to add the other currency by default and starts collapsed", () => {
    const page = renderReservationChargeView();
    const toggle = page.getToggle(COPY.ADD_CURRENCY.CRC);

    expect(toggle).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    expect(toggle).toHaveAttribute(
      "aria-controls",
      FIELD_ID.PRICE_BLOCK
    );
    expect(toggle).toBeEnabled();
  });

  it("is rendered even when only one currency has a proposal", () => {
    const page = renderReservationChargeView(MIXED_CHARGE);

    expect(
      page.getToggle(COPY.ADD_CURRENCY.CRC)
    ).toBeInTheDocument();
  });

  it("targets the other currency of the selected one", async () => {
    const page = renderReservationChargeView();

    await page.selectCurrency(CURRENCY_NAME_COPY.CRC);

    expect(
      page.getToggle(COPY.ADD_CURRENCY.USD)
    ).toBeInTheDocument();
  });

  it("turns into the remove button once the second field is shown", async () => {
    const page = renderReservationChargeView();

    await page.clickToggle(COPY.ADD_CURRENCY.CRC);

    expect(
      page.getToggle(COPY.REMOVE_CURRENCY.CRC)
    ).toHaveAttribute("aria-expanded", "true");
  });
});
