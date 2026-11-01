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
import ReservationHistoryError from "../components/ReservationHistoryError";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { createReservationHistoryPage } from "./ReservationHistory.page";
import { RAW_ERROR_TEXT } from "./ReservationHistoryStates.constants";

const mockRefresh = vi.fn();
const mockReset = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}));

describe("ReservationHistoryError", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockReset.mockClear();
  });

  it("announces the failure in Spanish without raw error text", () => {
    render(<ReservationHistoryError reset={mockReset} />);
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
    render(<ReservationHistoryError reset={mockReset} />);
    const page = createReservationHistoryPage();

    fireEvent.click(page.getRetryButton());

    expect(mockRefresh).toHaveBeenCalledTimes(1);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
