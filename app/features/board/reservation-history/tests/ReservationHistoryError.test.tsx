import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import ReservationHistoryDetailRouteError from "@/app/(system)/history/[reservationId]/error";
import ReservationHistoryRouteError from "@/app/(system)/history/error";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { createReservationHistoryPage } from "./ReservationHistory.page";
import {
  HREF_ATTRIBUTE,
  RAW_ERROR_TEXT,
} from "./ReservationHistoryStates.constants";

const mockRefresh = vi.fn();
const mockReset = vi.fn();
const ROUTE_PROPS = {
  error: new Error(RAW_ERROR_TEXT),
  reset: mockReset,
};

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}));

describe("ReservationHistoryError", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockReset.mockClear();
  });

  it("announces the failure in Spanish without raw error text", () => {
    render(
      <ReservationHistoryRouteError {...ROUTE_PROPS} />
    );
    const page = createReservationHistoryPage();
    const alert = within(page.getAlert());

    expect(
      alert.getByText(RESERVATION_HISTORY_COPY.ERROR_TITLE)
    ).toBeInTheDocument();
    expect(
      alert.getByText(RESERVATION_HISTORY_COPY.ERROR_BODY)
    ).toBeInTheDocument();
    expect(page.getMain().textContent).not.toContain(
      RAW_ERROR_TEXT
    );
  });

  it("refreshes the route and resets the boundary on retry", () => {
    render(
      <ReservationHistoryRouteError {...ROUTE_PROPS} />
    );
    const page = createReservationHistoryPage();

    fireEvent.click(page.getRetryButton());

    expect(mockRefresh).toHaveBeenCalledTimes(1);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("names the record failure and offers the way back to the list", () => {
    render(
      <ReservationHistoryDetailRouteError
        {...ROUTE_PROPS}
      />
    );
    const page = createReservationHistoryPage();

    expect(
      within(page.getAlert()).getByText(
        RESERVATION_HISTORY_COPY.DETAIL_ERROR_TITLE
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole(ARIA_ROLE.LINK, {
        name: RESERVATION_HISTORY_COPY.BACK_TO_HISTORY,
      })
    ).toHaveAttribute(HREF_ATTRIBUTE, PATHS.HISTORY.ROOT);
  });
});
