import { render } from "@testing-library/react";
import { notFound } from "next/navigation";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { RESERVATION_POSTPONEMENT_UI_COPY } from "../constants/ReservationPostponementUiCopy.constants";
import { RESERVATION_POSTPONEMENT_UNAVAILABLE_STATUS_BODY } from "../constants/ReservationPostponementUnavailableCopy.constants";
import ReservationPostponement from "../ReservationPostponement";
import { getReservationPostponement } from "../services/getReservationPostponement";
import {
  EXPECTED_CLOSED,
  EXPECTED_SCHEDULED,
  NEXT_NOT_FOUND,
  NEXT_REDIRECT,
  POSTPONEMENT_RESERVATION_ID,
} from "./ReservationPostponement.constants";
import { createReservationPostponementPage } from "./ReservationPostponement.page";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error(NEXT_NOT_FOUND);
  }),
}));

vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);

vi.mock("../services/getReservationPostponement", () => ({
  getReservationPostponement: vi.fn(),
}));

const renderEntry = () =>
  ReservationPostponement({
    reservationId: POSTPONEMENT_RESERVATION_ID,
  });

describe("ReservationPostponement", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      assertReservationCalendarAccess
    ).mockResolvedValue();
  });

  it("checks access before reading the reservation", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(new Error(NEXT_REDIRECT));

    await expect(renderEntry()).rejects.toThrow();
    expect(
      getReservationPostponement
    ).not.toHaveBeenCalled();
  });

  it("shows not found when the reservation does not exist", async () => {
    vi.mocked(getReservationPostponement).mockResolvedValue(
      null
    );

    await expect(renderEntry()).rejects.toThrow();
    expect(notFound).toHaveBeenCalledOnce();
  });

  it("shows the unavailable state with the reason when it cannot be postponed", async () => {
    vi.mocked(getReservationPostponement).mockResolvedValue(
      EXPECTED_CLOSED
    );

    render(await renderEntry());
    const page = createReservationPostponementPage();

    expect(page.getStatusText()).toContain(
      RESERVATION_POSTPONEMENT_UNAVAILABLE_STATUS_BODY.closed
    );
    expect(page.queryText(EXPECTED_CLOSED.code)).toBeNull();
  });

  it("shows the reservation summary under the title when it can be postponed", async () => {
    vi.mocked(getReservationPostponement).mockResolvedValue(
      EXPECTED_SCHEDULED
    );

    render(await renderEntry());
    const page = createReservationPostponementPage();

    expect(
      page.getText(RESERVATION_POSTPONEMENT_UI_COPY.TITLE)
    ).toBeInTheDocument();
    expect(
      page.getText(EXPECTED_SCHEDULED.code)
    ).toBeInTheDocument();
    expect(page.queryStatus()).toBeNull();
  });
});
