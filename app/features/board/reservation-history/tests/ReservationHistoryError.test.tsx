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
  within,
} from "@testing-library/react";
import ReservationHistoryRouteError from "@/app/(system)/history/error";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { createReservationHistoryPage } from "./ReservationHistory.page";
import { RAW_ERROR_TEXT } from "./ReservationHistoryStates.constants";

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
});
