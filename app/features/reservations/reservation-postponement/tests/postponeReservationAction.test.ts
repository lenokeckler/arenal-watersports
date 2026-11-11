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
import { postponeReservationAction } from "../actions/postponeReservationAction";
import { RESERVATION_POSTPONEMENT_ERROR } from "../constants/ReservationPostponementError.constants";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY as COPY } from "../constants/ReservationPostponementFeedbackCopy.constants";
import { postponeReservation } from "../services/postponeReservation";
import { POSTPONEMENT_RESERVATION_ID } from "./ReservationPostponement.constants";
import { VALID_POSTPONEMENT_INPUT } from "./ReservationPostponementInput.constants";
import {
  POSTPONEMENT_ACCESS_REDIRECT,
  POSTPONEMENT_UNEXPECTED_ERROR,
} from "./postponeReservationAction.constants";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/postponeReservation", () => ({
  postponeReservation: vi.fn(),
}));

describe("postponeReservationAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the postponed reservation and revalidates only the calendar", async () => {
    vi.mocked(postponeReservation).mockResolvedValue(
      POSTPONEMENT_RESERVATION_ID
    );

    await expect(
      postponeReservationAction(VALID_POSTPONEMENT_INPUT)
    ).resolves.toEqual({
      ok: true,
      reservationId: POSTPONEMENT_RESERVATION_ID,
    });
    expect(postponeReservation).toHaveBeenCalledWith(
      VALID_POSTPONEMENT_INPUT
    );
    expect(revalidatePath).toHaveBeenCalledTimes(1);
    expect(revalidatePath).toHaveBeenCalledWith(
      PATHS.RESERVATIONS.CALENDAR
    );
  });

  it("returns the submit error for a malformed input before checking access", async () => {
    await expect(
      postponeReservationAction({})
    ).resolves.toEqual({
      ok: false,
      errors: { readings: {} },
      formError: COPY.SUBMIT_ERROR,
    });
    expect(
      assertReservationCalendarAccess
    ).not.toHaveBeenCalled();
    expect(postponeReservation).not.toHaveBeenCalled();
  });

  it("returns field errors without calling the service", async () => {
    const result = await postponeReservationAction({
      ...VALID_POSTPONEMENT_INPUT,
      date: "",
    });

    expect(result).toMatchObject({
      ok: false,
      errors: { date: COPY.DATE_REQUIRED, readings: {} },
    });
    expect(postponeReservation).not.toHaveBeenCalled();
  });

  it("maps a database refusal to its message without revalidating", async () => {
    vi.mocked(postponeReservation).mockRejectedValue(
      new Error(
        RESERVATION_POSTPONEMENT_ERROR.MESSAGE.STALE
      )
    );

    await expect(
      postponeReservationAction(VALID_POSTPONEMENT_INPUT)
    ).resolves.toEqual({
      ok: false,
      errors: { readings: {} },
      formError: COPY.STALE,
    });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("maps the weather rule to the cause field", async () => {
    vi.mocked(postponeReservation).mockRejectedValue(
      new Error(
        RESERVATION_POSTPONEMENT_ERROR.MESSAGE.WEATHER_ONLY
      )
    );

    await expect(
      postponeReservationAction(VALID_POSTPONEMENT_INPUT)
    ).resolves.toEqual({
      ok: false,
      errors: {
        cause: COPY.CAUSE_WEATHER_ONLY,
        readings: {},
      },
    });
  });

  it("rethrows an unexpected failure for server logging", async () => {
    vi.mocked(postponeReservation).mockRejectedValue(
      POSTPONEMENT_UNEXPECTED_ERROR
    );

    await expect(
      postponeReservationAction(VALID_POSTPONEMENT_INPUT)
    ).rejects.toBe(POSTPONEMENT_UNEXPECTED_ERROR);
  });

  it("lets an access redirect through without postponing", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(POSTPONEMENT_ACCESS_REDIRECT);

    await expect(
      postponeReservationAction(VALID_POSTPONEMENT_INPUT)
    ).rejects.toBe(POSTPONEMENT_ACCESS_REDIRECT);
    expect(postponeReservation).not.toHaveBeenCalled();
  });
});
