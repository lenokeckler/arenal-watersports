import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { revalidatePath } from "next/cache";
import { PATHS, STRING } from "@/app/constants";
import { reportServerError } from "@/app/services/observability";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { resolveDepositAction } from "../actions/resolveDepositAction";
import { DEPOSIT_RESOLUTION_ERROR } from "../constants/DepositResolutionError.constants";
import { DEPOSIT_RESOLUTION_FEEDBACK_COPY as COPY } from "../constants/DepositResolutionFeedbackCopy.constants";
import { DEPOSIT_RESOLUTION_OPERATION } from "../constants/DepositResolutionOperation.constants";
import { DEPOSIT_RESOLUTION_VALIDATION_COPY as VALIDATION } from "../constants/DepositResolutionValidationCopy.constants";
import { recordDepositResolution } from "../services/recordDepositResolution";
import {
  PARTIAL_COMMAND,
  PARTIAL_INPUT,
  PARTIAL_RECORDED,
  RESOLUTION_ACCESS_REDIRECT,
  RESOLUTION_UNEXPECTED_ERROR,
} from "./DepositResolutionAction.constants";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("@/app/services/observability", () => ({
  reportServerError: vi.fn(),
}));
vi.mock("../services/recordDepositResolution", () => ({
  recordDepositResolution: vi.fn(),
}));

describe("resolveDepositAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("resolves and refreshes the pending list and the reports", async () => {
    vi.mocked(recordDepositResolution).mockResolvedValue(
      PARTIAL_RECORDED
    );

    await expect(
      resolveDepositAction(PARTIAL_INPUT)
    ).resolves.toEqual({
      ok: true,
      recorded: PARTIAL_RECORDED,
    });
    expect(
      assertReservationCalendarAccess
    ).toHaveBeenCalledOnce();
    expect(recordDepositResolution).toHaveBeenCalledWith(
      PARTIAL_COMMAND
    );
    expect(vi.mocked(revalidatePath).mock.calls).toEqual([
      [PATHS.RESERVATIONS.DEPOSITS],
      [PATHS.ADMINISTRATION.DEPOSITS],
      [PATHS.ADMINISTRATION.INCOME],
    ]);
  });

  it("refuses a malformed input before checking access", async () => {
    await expect(resolveDepositAction({})).resolves.toEqual(
      {
        ok: false,
        errors: {},
        formError: COPY.REQUEST_REJECTED,
      }
    );
    expect(
      assertReservationCalendarAccess
    ).not.toHaveBeenCalled();
  });

  it("returns the amount error without calling the database", async () => {
    await expect(
      resolveDepositAction({
        ...PARTIAL_INPUT,
        returnedText: STRING.Empty,
      })
    ).resolves.toEqual({
      ok: false,
      errors: { returned: VALIDATION.RETURNED_REQUIRED },
    });
    expect(recordDepositResolution).not.toHaveBeenCalled();
  });

  it("maps a database refusal without refreshing", async () => {
    vi.mocked(recordDepositResolution).mockRejectedValue(
      new Error(
        DEPOSIT_RESOLUTION_ERROR.MESSAGE.TRIP_NOT_CLOSED
      )
    );

    await expect(
      resolveDepositAction(PARTIAL_INPUT)
    ).resolves.toEqual({
      ok: false,
      errors: {},
      formError: COPY.TRIP_NOT_CLOSED,
    });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("rethrows an unexpected failure and lets the access redirect through", async () => {
    vi.mocked(recordDepositResolution).mockRejectedValue(
      RESOLUTION_UNEXPECTED_ERROR
    );
    await expect(
      resolveDepositAction(PARTIAL_INPUT)
    ).rejects.toThrow(RESOLUTION_UNEXPECTED_ERROR);

    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(RESOLUTION_ACCESS_REDIRECT);
    await expect(
      resolveDepositAction(PARTIAL_INPUT)
    ).rejects.toThrow(RESOLUTION_ACCESS_REDIRECT);
  });

  it("keeps the resolution when the refresh fails", async () => {
    vi.mocked(recordDepositResolution).mockResolvedValue(
      PARTIAL_RECORDED
    );
    vi.mocked(revalidatePath).mockImplementation(() => {
      throw RESOLUTION_UNEXPECTED_ERROR;
    });

    await expect(
      resolveDepositAction(PARTIAL_INPUT)
    ).resolves.toEqual({
      ok: true,
      recorded: PARTIAL_RECORDED,
    });
    expect(reportServerError).toHaveBeenCalledWith(
      DEPOSIT_RESOLUTION_OPERATION.REVALIDATE,
      RESOLUTION_UNEXPECTED_ERROR
    );
  });
});
