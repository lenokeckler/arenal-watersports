import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import {
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import ReservationSplitView from "../ReservationSplitView";
import { splitReservationAction as action } from "../actions/splitReservationAction";
import { RESERVATION_SPLIT_FEEDBACK_COPY as FB } from "../constants/ReservationSplitFeedbackCopy.constants";
import { RESERVATION_SPLIT_UI_COPY as COPY } from "../constants/ReservationSplitUiCopy.constants";
import * as c from "./ReservationSplit.constants";
import { createReservationSplitCardsPage } from "./ReservationSplitCards.page";

vi.mock("../actions/splitReservationAction", () => ({
  splitReservationAction: vi.fn(),
}));

const TIME = "16:00";
const FIRST_DEPARTURE = 2;
const SECOND_DEPARTURE = 3;
const click = (name: string) =>
  userEvent.click(
    screen.getByRole(ARIA_ROLE.BUTTON, { name })
  );
const getAlert = () => screen.getByRole(ARIA_ROLE.ALERT);

describe("ReservationSplitView alert and live region focus", () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it("moves focus to the alert again when a retry fails with the same message", async () => {
    vi.mocked(action).mockRejectedValue(new Error());
    render(
      <ReservationSplitView split={c.EXPECTED_SPLIT} />
    );
    createReservationSplitCardsPage().changeTime(0, TIME);
    await click(
      COPY.STEPPER_ADD_ARIA(
        c.SPLIT_CATEGORY.name,
        FIRST_DEPARTURE
      )
    );
    await click(COPY.SUBMIT);
    await screen.findByText(FB.NETWORK_ERROR);
    expect(getAlert()).toHaveFocus();
    await click(COPY.SUBMIT);

    expect(action).toHaveBeenCalledTimes(2);
    expect(getAlert()).toHaveFocus();
  });

  it("keeps focus still on first render, then focuses the added heading, under StrictMode", async () => {
    render(
      <StrictMode>
        <ReservationSplitView split={c.EXPECTED_SPLIT} />
      </StrictMode>
    );
    expect(document.body).toHaveFocus();
    await click(COPY.ADD_DEPARTURE);

    expect(
      screen.getByRole(ARIA_ROLE.HEADING, {
        name: COPY.DEPARTURE_HEADING(SECOND_DEPARTURE),
      })
    ).toHaveFocus();
    expect(
      screen.getAllByRole(ARIA_ROLE.STATUS)
    ).toHaveLength(1);
  });
});
