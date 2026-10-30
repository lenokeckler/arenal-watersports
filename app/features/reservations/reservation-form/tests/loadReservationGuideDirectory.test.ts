import { unstable_rethrow } from "next/navigation";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import { getReservationGuides } from "../services/getReservationGuides";
import { loadReservationGuideDirectory } from "../services/loadReservationGuideDirectory";
import { recordReservationGuideLoadFailure } from "../utils/recordReservationGuideLoadFailure";

vi.mock("next/navigation", () => ({
  unstable_rethrow: vi.fn(),
}));

vi.mock("../services/getReservationGuides", () => ({
  getReservationGuides: vi.fn(),
}));

vi.mock(
  "../utils/recordReservationGuideLoadFailure",
  () => ({
    recordReservationGuideLoadFailure: vi.fn(),
  })
);

describe("loadReservationGuideDirectory", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("keeps normal errors recoverable after checking Next control flow", async () => {
    const failure = Object.assign(
      new Error(
        RESERVATION_GUIDE_ASSIGNMENT_TEST.RETRY_ERROR_MESSAGE
      ),
      {
        code: RESERVATION_GUIDE_ASSIGNMENT_TEST.LOAD_ERROR_CODE,
      }
    );
    vi.mocked(getReservationGuides).mockRejectedValue(
      failure
    );

    await expect(
      loadReservationGuideDirectory()
    ).resolves.toEqual({
      code: RESERVATION_GUIDE_ASSIGNMENT_TEST.LOAD_ERROR_CODE,
      kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.FAILURE,
    });

    expect(unstable_rethrow).toHaveBeenCalledWith(failure);
    expect(
      recordReservationGuideLoadFailure
    ).toHaveBeenCalledWith(
      failure,
      RESERVATION_GUIDE_ASSIGNMENT_TEST.LOAD_ERROR_CODE
    );
  });

  it("rethrows Next control-flow errors before recording a failure", async () => {
    const controlFlowError = new Error(
      RESERVATION_GUIDE_ASSIGNMENT_TEST.RETRY_ERROR_MESSAGE
    );
    vi.mocked(getReservationGuides).mockRejectedValue(
      controlFlowError
    );
    vi.mocked(unstable_rethrow).mockImplementation(
      (error: unknown) => {
        throw error;
      }
    );

    await expect(
      loadReservationGuideDirectory()
    ).rejects.toBe(controlFlowError);
    expect(
      recordReservationGuideLoadFailure
    ).not.toHaveBeenCalled();
  });
});
