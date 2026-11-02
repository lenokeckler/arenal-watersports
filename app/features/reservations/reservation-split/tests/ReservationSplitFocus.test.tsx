import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import ReservationSplitView from "../ReservationSplitView";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import { EXPECTED_SPLIT } from "./ReservationSplit.constants";

vi.mock("../actions/splitReservationAction", () => ({
  splitReservationAction: vi.fn(),
}));

const FIRST_DEPARTURE_NUMBER = 2;
const FIRST_DEPARTURE_INDEX = 0;
const ADDED_DEPARTURE_NUMBER = 3;

const getHeading = (departureNumber: number) =>
  screen.getByRole(ARIA_ROLE.HEADING, {
    name: RESERVATION_SPLIT_UI_COPY.DEPARTURE_HEADING(
      departureNumber
    ),
  });

const addDeparture = () =>
  userEvent.click(
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: RESERVATION_SPLIT_UI_COPY.ADD_DEPARTURE,
    })
  );

describe("ReservationSplitView focus and announcements", () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it("focuses the new departure and announces it after adding", async () => {
    render(<ReservationSplitView split={EXPECTED_SPLIT} />);

    await addDeparture();

    expect(
      getHeading(ADDED_DEPARTURE_NUMBER)
    ).toHaveFocus();
    expect(
      screen.getByRole(ARIA_ROLE.STATUS)
    ).toHaveTextContent(
      RESERVATION_SPLIT_UI_COPY.ANNOUNCE_ADDED(
        ADDED_DEPARTURE_NUMBER
      )
    );
  });

  it("focuses the previous departure and announces it after removing", async () => {
    render(<ReservationSplitView split={EXPECTED_SPLIT} />);
    await addDeparture();

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_SPLIT_UI_COPY.REMOVE_DEPARTURE_ARIA(
          ADDED_DEPARTURE_NUMBER
        ),
      })
    );

    expect(
      getHeading(FIRST_DEPARTURE_NUMBER)
    ).toHaveFocus();
    expect(
      screen.getByRole(ARIA_ROLE.STATUS)
    ).toHaveTextContent(
      RESERVATION_SPLIT_UI_COPY.ANNOUNCE_REMOVED(
        ADDED_DEPARTURE_NUMBER
      )
    );
  });

  it("focuses the first invalid control and not the alert when the form is incomplete", async () => {
    render(<ReservationSplitView split={EXPECTED_SPLIT} />);

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_SPLIT_UI_COPY.SUBMIT,
      })
    );

    expect(
      screen.getAllByLabelText(
        new RegExp(
          RESERVATION_SPLIT_UI_COPY.LABEL_START_TIME
        )
      )[FIRST_DEPARTURE_INDEX]
    ).toHaveFocus();
    expect(
      screen.queryByRole(ARIA_ROLE.ALERT)
    ).not.toBeInTheDocument();
  });
});
