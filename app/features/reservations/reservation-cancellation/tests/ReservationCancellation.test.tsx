import { render, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { notFound } from "next/navigation";
import { PATHS, RESERVATION_STATUS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationCancellation from "../ReservationCancellation";
import { cancelReservationAction } from "../actions/cancelReservationAction";
import { RESERVATION_CANCELLATION_FORM_COPY as FORM } from "../constants/ReservationCancellationFormCopy.constants";
import { RESERVATION_CANCELLATION_UI_COPY as COPY } from "../constants/ReservationCancellationUiCopy.constants";
import { RESERVATION_CANCELLATION_UNAVAILABLE_COPY as UNAVAILABLE } from "../constants/ReservationCancellationUnavailableCopy.constants";
import { getReservationCancellation } from "../services/getReservationCancellation";
import {
  CANCELLATION_ACCESS_REDIRECT,
  CANCELLATION_REASON,
  CANCELLATION_RESERVATION_ID,
  EXPECTED_SCHEDULED,
} from "./ReservationCancellation.constants";
import { createReservationCancellationPage } from "./ReservationCancellation.page";
import { createReservationCancellationViewPage } from "./ReservationCancellationView.page";

const NEXT_NOT_FOUND = "NEXT_NOT_FOUND";
const EXPECTED_DATE_TIME =
  "lunes, 2 de noviembre de 2026, 14:30";
const EXPECTED_EQUIPMENT = [
  "Kayak doblex 3",
  "Lancha BENNINGTON",
];

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error(NEXT_NOT_FOUND);
  }),
}));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/getReservationCancellation", () => ({
  getReservationCancellation: vi.fn(),
}));
vi.mock("../actions/cancelReservationAction", () => ({
  cancelReservationAction: vi.fn(),
}));

const renderEntry = () =>
  ReservationCancellation({
    reservationId: CANCELLATION_RESERVATION_ID,
  });

describe("ReservationCancellation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      assertReservationCalendarAccess
    ).mockResolvedValue(undefined);
  });

  it("checks reservations access before reading", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(CANCELLATION_ACCESS_REDIRECT);

    await expect(renderEntry()).rejects.toBe(
      CANCELLATION_ACCESS_REDIRECT
    );
    expect(
      getReservationCancellation
    ).not.toHaveBeenCalled();
  });

  it("answers not found for an unknown reservation", async () => {
    vi.mocked(getReservationCancellation).mockResolvedValue(
      null
    );

    await expect(renderEntry()).rejects.toThrow(
      NEXT_NOT_FOUND
    );
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("shows the reservation to cancel under the title", async () => {
    vi.mocked(getReservationCancellation).mockResolvedValue(
      EXPECTED_SCHEDULED
    );

    render(await renderEntry());
    const page = createReservationCancellationPage();

    expect(page.getHeading(COPY.TITLE)).toBeInTheDocument();
    expect(
      page.queryText(EXPECTED_SCHEDULED.code)
    ).not.toBeNull();
    expect(
      page.queryText(EXPECTED_SCHEDULED.customerName)
    ).not.toBeNull();
    expect(
      page.queryText(EXPECTED_DATE_TIME)
    ).not.toBeNull();
    expect(page.getListItemTexts()).toEqual(
      EXPECTED_EQUIPMENT
    );
    expect(page.getCalendarLinkTargets()).toEqual([
      PATHS.RESERVATIONS.CALENDAR,
    ]);
    expect(page.queryStatus()).toBeNull();
  });

  it("keeps the confirmation when the action refresh renders the cancelled reservation", async () => {
    vi.mocked(getReservationCancellation).mockResolvedValue(
      EXPECTED_SCHEDULED
    );
    vi.mocked(cancelReservationAction).mockResolvedValue({
      ok: true,
      reservationId: EXPECTED_SCHEDULED.id,
    });
    const { rerender } = render(await renderEntry());
    const page = createReservationCancellationViewPage();

    await page.typeReason(CANCELLATION_REASON);
    await page.submit();
    await waitFor(() =>
      expect(page.getStatusText()).toBe(
        FORM.SUCCESS(EXPECTED_SCHEDULED.code)
      )
    );
    vi.mocked(getReservationCancellation).mockResolvedValue(
      {
        ...EXPECTED_SCHEDULED,
        isCancellable: false,
        status: RESERVATION_STATUS.CANCELLED,
      }
    );
    rerender(await renderEntry());

    expect(page.getStatusText()).toBe(
      FORM.SUCCESS(EXPECTED_SCHEDULED.code)
    );
    expect(
      page.queryText(
        UNAVAILABLE.BODY[RESERVATION_STATUS.CANCELLED]
      )
    ).toBeNull();
  });
});
