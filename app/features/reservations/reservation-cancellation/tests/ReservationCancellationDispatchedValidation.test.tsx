import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { cancelReservationAction } from "../actions/cancelReservationAction";
import { RESERVATION_CANCELLATION_CAUSE } from "../constants/ReservationCancellationCause.constants";
import { RESERVATION_CANCELLATION_CAUSE_COPY } from "../constants/ReservationCancellationCauseCopy.constants";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationCancellationFeedbackCopy.constants";
import { CANCELLATION_REASON } from "./ReservationCancellation.constants";
import { renderReservationCancellationView as renderView } from "./renderReservationCancellationView";

vi.mock("../actions/cancelReservationAction", () => ({
  cancelReservationAction: vi.fn(),
}));

const WEATHER_OPTION =
  RESERVATION_CANCELLATION_CAUSE_COPY[
    RESERVATION_CANCELLATION_CAUSE.WEATHER
  ];
const TRIP_PROBLEM_OPTION =
  RESERVATION_CANCELLATION_CAUSE_COPY[
    RESERVATION_CANCELLATION_CAUSE.TRIP_PROBLEM
  ];

describe("ReservationCancellationView dispatched validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("asks for the cause and the reason together, focuses the cause and sends nothing", async () => {
    const page = renderView();

    await page.submit();

    expect(
      page.queryText(FEEDBACK.CAUSE_REQUIRED)
    ).not.toBeNull();
    expect(
      page.queryText(FEEDBACK.REASON_REQUIRED)
    ).not.toBeNull();
    expect(
      page.getCause(WEATHER_OPTION.label)
    ).toHaveFocus();
    expect(cancelReservationAction).not.toHaveBeenCalled();
  });

  it("asks only for the reason when the cause is chosen", async () => {
    const page = renderView();

    await page.selectCause(TRIP_PROBLEM_OPTION.label);
    await page.submit();

    expect(
      page.queryText(FEEDBACK.CAUSE_REQUIRED)
    ).toBeNull();
    expect(
      page.queryText(FEEDBACK.REASON_REQUIRED)
    ).not.toBeNull();
    expect(page.getReason()).toHaveFocus();
    expect(cancelReservationAction).not.toHaveBeenCalled();
  });

  it("asks only for the cause when the reason is written", async () => {
    const page = renderView();

    await page.typeReason(CANCELLATION_REASON);
    await page.submit();

    expect(
      page.queryText(FEEDBACK.CAUSE_REQUIRED)
    ).not.toBeNull();
    expect(
      page.queryText(FEEDBACK.REASON_REQUIRED)
    ).toBeNull();
    expect(cancelReservationAction).not.toHaveBeenCalled();
  });

  it("clears the cause error once a cause is chosen", async () => {
    const page = renderView();

    await page.submit();
    await page.selectCause(WEATHER_OPTION.label);

    expect(
      page.queryText(FEEDBACK.CAUSE_REQUIRED)
    ).toBeNull();
  });
});
