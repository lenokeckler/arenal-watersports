import { notFound } from "next/navigation";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationSplitUnavailable from "../components/ReservationSplitUnavailable";
import { RESERVATION_SPLIT_BLOCK } from "../constants/ReservationSplitBlock.constants";
import ReservationSplit from "../ReservationSplit";
import ReservationSplitView from "../ReservationSplitView";
import { getReservationSplit } from "../services/getReservationSplit";
import {
  EXPECTED_SPLIT,
  NEXT_NOT_FOUND,
  NEXT_REDIRECT,
  SPLIT_RESERVATION_ID,
} from "./ReservationSplit.constants";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error(NEXT_NOT_FOUND);
  }),
}));

vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);

vi.mock("../services/getReservationSplit", () => ({
  getReservationSplit: vi.fn(),
}));

const renderEntry = () =>
  ReservationSplit({ reservationId: SPLIT_RESERVATION_ID });

describe("ReservationSplit", () => {
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
    expect(getReservationSplit).not.toHaveBeenCalled();
  });

  it("shows not found when the reservation does not exist", async () => {
    vi.mocked(getReservationSplit).mockResolvedValue(null);

    await expect(renderEntry()).rejects.toThrow();
    expect(notFound).toHaveBeenCalledOnce();
  });

  it("shows the unavailable state with the reason when it cannot be split", async () => {
    vi.mocked(getReservationSplit).mockResolvedValue({
      ...EXPECTED_SPLIT,
      splitBlock: RESERVATION_SPLIT_BLOCK.NOT_SCHEDULED,
    });

    const element = await renderEntry();

    expect(element.type).toBe(ReservationSplitUnavailable);
    expect(element.props.reason).toBe(
      RESERVATION_SPLIT_BLOCK.NOT_SCHEDULED
    );
  });

  it("gives the split view the reservation when it can be split", async () => {
    vi.mocked(getReservationSplit).mockResolvedValue(
      EXPECTED_SPLIT
    );

    const element = await renderEntry();

    expect(element.type).toBe(ReservationSplitView);
    expect(element.props.split).toBe(EXPECTED_SPLIT);
  });
});
