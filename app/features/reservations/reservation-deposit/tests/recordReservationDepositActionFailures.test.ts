import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { revalidatePath } from "next/cache";
import { reportServerError } from "@/app/services/observability";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { recordReservationDepositAction } from "../actions/recordReservationDepositAction";
import { RESERVATION_DEPOSIT_ERROR } from "../constants/ReservationDepositError.constants";
import { RESERVATION_DEPOSIT_FEEDBACK_COPY as COPY } from "../constants/ReservationDepositFeedbackCopy.constants";
import { RESERVATION_DEPOSIT_OPERATION } from "../constants/ReservationDepositOperation.constants";
import { recordReservationDeposit } from "../services/recordReservationDeposit";
import {
  DEPOSIT_ACCESS_REDIRECT,
  DEPOSIT_UNEXPECTED_ERROR,
  RECEIVED_RECORDED,
} from "./ReservationDepositAction.constants";
import { RECEIVED_DEPOSIT_INPUT } from "./ReservationDepositValues.constants";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("@/app/services/observability", () => ({
  reportServerError: vi.fn(),
}));
vi.mock("../services/recordReservationDeposit", () => ({
  recordReservationDeposit: vi.fn(),
}));

describe("recordReservationDepositAction failures", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("maps a database refusal without revalidating", async () => {
    vi.mocked(recordReservationDeposit).mockRejectedValue(
      new Error(
        RESERVATION_DEPOSIT_ERROR.MESSAGE.ALREADY_DECIDED
      )
    );

    await expect(
      recordReservationDepositAction(RECEIVED_DEPOSIT_INPUT)
    ).resolves.toEqual({
      ok: false,
      errors: {},
      formError: COPY.ALREADY_DECIDED,
    });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("rethrows an unexpected failure for server logging", async () => {
    vi.mocked(recordReservationDeposit).mockRejectedValue(
      DEPOSIT_UNEXPECTED_ERROR
    );

    await expect(
      recordReservationDepositAction(RECEIVED_DEPOSIT_INPUT)
    ).rejects.toThrow(DEPOSIT_UNEXPECTED_ERROR);
  });

  it("lets the access redirect through without recording", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(DEPOSIT_ACCESS_REDIRECT);

    await expect(
      recordReservationDepositAction(RECEIVED_DEPOSIT_INPUT)
    ).rejects.toThrow(DEPOSIT_ACCESS_REDIRECT);
    expect(recordReservationDeposit).not.toHaveBeenCalled();
  });

  it("keeps the recorded deposit when revalidation fails", async () => {
    vi.mocked(recordReservationDeposit).mockResolvedValue(
      RECEIVED_RECORDED
    );
    vi.mocked(revalidatePath).mockImplementation(() => {
      throw DEPOSIT_UNEXPECTED_ERROR;
    });

    await expect(
      recordReservationDepositAction(RECEIVED_DEPOSIT_INPUT)
    ).resolves.toEqual({
      ok: true,
      recorded: RECEIVED_RECORDED,
    });
    expect(reportServerError).toHaveBeenCalledWith(
      RESERVATION_DEPOSIT_OPERATION.REVALIDATE,
      DEPOSIT_UNEXPECTED_ERROR
    );
  });
});
