import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { splitReservationAction } from "../actions/splitReservationAction";
import { RESERVATION_SPLIT_ERROR } from "../constants/ReservationSplitError.constants";
import { RESERVATION_SPLIT_FEEDBACK_COPY } from "../constants/ReservationSplitFeedbackCopy.constants";
import { splitReservation } from "../services/splitReservation";
import {
  SPLIT_DEPARTURE_ID,
  VALID_DEPARTURE_INPUT,
  VALID_SPLIT_INPUT,
} from "./ReservationSplit.constants";
import { SPLIT_DEPARTURE_CODE } from "./splitReservation.constants";
import {
  SPLIT_ACCESS_REDIRECT,
  SPLIT_UNEXPECTED_ERROR,
} from "./splitReservationAction.constants";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/splitReservation", () => ({
  splitReservation: vi.fn(),
}));

describe("splitReservationAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the created departures and revalidates only the calendar", async () => {
    const departures = [
      {
        code: SPLIT_DEPARTURE_CODE,
        reservationId: SPLIT_DEPARTURE_ID,
      },
    ];
    vi.mocked(splitReservation).mockResolvedValue(
      departures
    );

    await expect(
      splitReservationAction(VALID_SPLIT_INPUT)
    ).resolves.toEqual({ ok: true, departures });
    expect(revalidatePath).toHaveBeenCalledTimes(1);
    expect(revalidatePath).toHaveBeenCalledWith(
      PATHS.RESERVATIONS.CALENDAR
    );
  });

  it("returns the submit error for a malformed input before checking access", async () => {
    await expect(
      splitReservationAction({})
    ).resolves.toEqual({
      ok: false,
      errors: { departures: [] },
      formError:
        RESERVATION_SPLIT_FEEDBACK_COPY.SUBMIT_ERROR,
    });
    expect(
      assertReservationCalendarAccess
    ).not.toHaveBeenCalled();
  });

  it("returns field errors without calling the service", async () => {
    const result = await splitReservationAction({
      ...VALID_SPLIT_INPUT,
      departures: [{ ...VALID_DEPARTURE_INPUT, time: "" }],
    });

    expect(result).toEqual({
      ok: false,
      errors: {
        departures: [
          {
            time: RESERVATION_SPLIT_FEEDBACK_COPY.TIME_REQUIRED,
          },
        ],
      },
    });
    expect(splitReservation).not.toHaveBeenCalled();
  });

  it.each(RESERVATION_SPLIT_ERROR.FORM_ERROR_LOOKUP)(
    "returns the form error of the refusal $message without revalidating",
    async ({ formError, message }) => {
      vi.mocked(splitReservation).mockRejectedValue(
        new Error(message)
      );

      await expect(
        splitReservationAction(VALID_SPLIT_INPUT)
      ).resolves.toEqual({
        ok: false,
        errors: { departures: [] },
        formError,
      });
      expect(revalidatePath).not.toHaveBeenCalled();
    }
  );

  it("rethrows an unexpected failure for server logging", async () => {
    vi.mocked(splitReservation).mockRejectedValue(
      SPLIT_UNEXPECTED_ERROR
    );

    await expect(
      splitReservationAction(VALID_SPLIT_INPUT)
    ).rejects.toBe(SPLIT_UNEXPECTED_ERROR);
  });

  it("lets an access redirect through without splitting", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(SPLIT_ACCESS_REDIRECT);

    await expect(
      splitReservationAction(VALID_SPLIT_INPUT)
    ).rejects.toBe(SPLIT_ACCESS_REDIRECT);
    expect(splitReservation).not.toHaveBeenCalled();
  });
});
