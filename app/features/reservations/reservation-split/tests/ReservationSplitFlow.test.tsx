import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
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
const OK = {
  ok: true,
  departures: c.SPLIT_CREATED_DEPARTURES,
} as const;
const click = (name: string) =>
  userEvent.click(screen.getByRole("button", { name }));

const fillAndSubmit = async () => {
  const cards = createReservationSplitCardsPage();
  cards.changeTime(0, TIME);
  await cards.increasePeople();
  await cards.increasePeople();
  const kayak = COPY.STEPPER_ADD_ARIA(
    c.SPLIT_CATEGORY.name,
    2
  );
  await click(kayak);
  await click(kayak);
  const unit = COPY.UNIT_OPTION_DEPARTURE(2, TIME);
  await userEvent.click(
    screen.getByRole("radio", { name: unit })
  );
  await click(COPY.SUBMIT);
};

describe("ReservationSplitView flow", () => {
  beforeEach(() => {
    vi.mocked(action).mockReset();
    render(
      <ReservationSplitView split={c.EXPECTED_SPLIT} />
    );
  });

  it("submits the exact payload and lists the new codes", async () => {
    vi.mocked(action).mockResolvedValue(OK);
    await fillAndSubmit();

    expect(action).toHaveBeenCalledWith({
      departures: [
        {
          items: [
            { itemId: c.QUANTITY_ITEM_ROW.id, quantity: 2 },
            { itemId: c.SPLIT_UNIT_ITEM.id, quantity: 1 },
          ],
          peopleCount: 3,
          time: TIME,
        },
      ],
      expectedUpdatedAt: c.SPLIT_UPDATED_AT,
      reservationId: c.SPLIT_RESERVATION_ID,
    });
    expect(
      screen.getByText("R-000125")
    ).toBeInTheDocument();
  });

  it("shows the network copy when the action throws and allows retry", async () => {
    vi.mocked(action)
      .mockRejectedValueOnce(new Error())
      .mockResolvedValue(OK);
    await fillAndSubmit();
    await screen.findByText(FB.NETWORK_ERROR);
    await click(COPY.SUBMIT);

    expect(action).toHaveBeenCalledTimes(2);
  });
});
