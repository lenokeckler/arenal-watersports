import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ReservationDetailMoneyMovementsToggle from "../components/ReservationDetailMoneyMovementsToggle";
import { RESERVATION_DETAIL_MOVEMENTS_COPY } from "../constants/ReservationDetailMovementsCopy.constants";
import { createReservationDetailMoneyMovementsTogglePage } from "./ReservationDetailMoneyMovementsToggle.page";
import { RESERVATION_DETAIL_MOVEMENTS_TOGGLE_TEST as TEST } from "./ReservationDetailMoneyMovementsToggleTest.constants";

const renderToggle = (): void => {
  render(
    <ReservationDetailMoneyMovementsToggle
      panelId={TEST.PANEL_ID}
    >
      <p>{TEST.CHILD_TEXT}</p>
    </ReservationDetailMoneyMovementsToggle>
  );
};

describe("ReservationDetailMoneyMovementsToggle", () => {
  it("starts folded with the list out of the document", (): void => {
    renderToggle();
    const page =
      createReservationDetailMoneyMovementsTogglePage();

    expect(page.queryChild()).toBeNull();
    expect(page.getToggle()).toHaveAttribute(
      TEST.ARIA_EXPANDED,
      TEST.EXPANDED_FALSE
    );
    expect(page.getToggle()).not.toHaveAttribute(
      TEST.ARIA_CONTROLS
    );
    expect(page.getToggle()).toHaveTextContent(
      RESERVATION_DETAIL_MOVEMENTS_COPY.MOVEMENTS_SHOW
    );
  });

  it("opens the list and points the button at its panel", async (): Promise<void> => {
    const user = userEvent.setup();
    renderToggle();
    const page =
      createReservationDetailMoneyMovementsTogglePage();

    await page.clickToggle(user);

    expect(page.queryChild()).toBeVisible();
    expect(page.getToggle()).toHaveAttribute(
      TEST.ARIA_EXPANDED,
      TEST.EXPANDED_TRUE
    );
    expect(page.getToggle()).toHaveAttribute(
      TEST.ARIA_CONTROLS,
      TEST.PANEL_ID
    );
    expect(page.getPanel()).toContainElement(
      page.queryChild()
    );
    expect(page.getToggle()).toHaveTextContent(
      RESERVATION_DETAIL_MOVEMENTS_COPY.MOVEMENTS_HIDE
    );
  });

  it("folds again on a second click", async (): Promise<void> => {
    const user = userEvent.setup();
    renderToggle();
    const page =
      createReservationDetailMoneyMovementsTogglePage();

    await page.clickToggle(user);
    await page.clickToggle(user);

    expect(page.queryChild()).toBeNull();
    expect(page.getToggle()).toHaveAttribute(
      TEST.ARIA_EXPANDED,
      TEST.EXPANDED_FALSE
    );
    expect(page.getToggle()).toHaveTextContent(
      RESERVATION_DETAIL_MOVEMENTS_COPY.MOVEMENTS_SHOW
    );
  });

  it.each([["{Enter}"], [" "]])(
    "toggles the list from the keyboard with %j",
    async (key: string): Promise<void> => {
      const user = userEvent.setup();
      renderToggle();
      const page =
        createReservationDetailMoneyMovementsTogglePage();

      await user.tab();
      await user.keyboard(key);

      expect(page.getToggle()).toHaveFocus();
      expect(page.queryChild()).toBeVisible();

      await user.keyboard(key);

      expect(page.queryChild()).toBeNull();
    }
  );
});
