import { notFound } from "next/navigation";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationPostponementLayout from "../components/ReservationPostponementLayout";
import ReservationPostponementSummary from "../components/ReservationPostponementSummary";
import ReservationPostponementUnavailable from "../components/ReservationPostponementUnavailable";
import ReservationPostponement from "../ReservationPostponement";
import { getReservationPostponement } from "../services/getReservationPostponement";
import {
  EXPECTED_CLOSED,
  EXPECTED_SCHEDULED,
  NEXT_NOT_FOUND,
  NEXT_REDIRECT,
  POSTPONEMENT_RESERVATION_ID,
} from "./ReservationPostponement.constants";

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

  it("shows the unavailable state with the status when it cannot be postponed", async () => {
    vi.mocked(getReservationPostponement).mockResolvedValue(
      EXPECTED_CLOSED
    );

    const element = await renderEntry();

    expect(element.type).toBe(
      ReservationPostponementUnavailable
    );
    expect(element.props.status).toBe(
      EXPECTED_CLOSED.status
    );
  });

  it("shows the reservation summary inside the layout when it can be postponed", async () => {
    vi.mocked(getReservationPostponement).mockResolvedValue(
      EXPECTED_SCHEDULED
    );

    const element = await renderEntry();

    expect(element.type).toBe(
      ReservationPostponementLayout
    );
    expect(element.props.children.type).toBe(
      ReservationPostponementSummary
    );
    expect(element.props.children.props.postponement).toBe(
      EXPECTED_SCHEDULED
    );
  });
});
