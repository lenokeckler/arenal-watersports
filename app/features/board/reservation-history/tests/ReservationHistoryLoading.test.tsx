import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import ReservationHistoryLoading from "../components/ReservationHistoryLoading";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { RESERVATION_HISTORY_SKELETON_ROW_COUNT } from "../constants/ReservationHistoryState.constants";
import { createReservationHistoryPage } from "./ReservationHistory.page";
import {
  ARIA_BUSY_ATTRIBUTE,
  ARIA_BUSY_VALUE,
} from "./ReservationHistoryStates.constants";

describe("ReservationHistoryLoading", () => {
  it("marks its own main as busy and announces the loading state", () => {
    render(<ReservationHistoryLoading />);
    const page = createReservationHistoryPage();

    expect(page.getMain()).toHaveAttribute(
      ARIA_BUSY_ATTRIBUTE,
      ARIA_BUSY_VALUE
    );
    expect(page.getStatus()).toHaveTextContent(
      RESERVATION_HISTORY_COPY.LOADING_ANNOUNCEMENT
    );
  });

  it("keeps the heading and renders the skeleton rows", () => {
    render(<ReservationHistoryLoading />);
    const page = createReservationHistoryPage();

    expect(
      page.getText(RESERVATION_HISTORY_COPY.PAGE_TITLE)
    ).toBeInTheDocument();
    expect(page.getAllItems()).toHaveLength(
      RESERVATION_HISTORY_SKELETON_ROW_COUNT
    );
  });
});
