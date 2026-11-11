import { beforeEach, expect, it, vi } from "vitest";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import { loadReservationGuideDirectory } from "../services/loadReservationGuideDirectory";
import { RESERVATION_GUIDE_SELECTION_OPTIONS } from "./ReservationGuideSelection.constants";
import { RESERVATION_GUIDE_LOAD_TEST } from "./ReservationGuideLoad.constants";

const { unstableRethrow, recordFailure, getGuides } =
  vi.hoisted(() => ({
    unstableRethrow: vi.fn(),
    recordFailure: vi.fn(),
    getGuides: vi.fn(),
  }));

vi.mock("next/navigation", () => ({
  unstable_rethrow: unstableRethrow,
}));

vi.mock("../services/getReservationGuides", () => ({
  getReservationGuides: getGuides,
}));

vi.mock(
  "../utils/recordReservationGuideLoadFailure",
  () => ({
    recordReservationGuideLoadFailure: recordFailure,
  })
);

beforeEach(() => {
  vi.clearAllMocks();
});

it("returns the eligible guide directory", async () => {
  getGuides.mockResolvedValue(
    RESERVATION_GUIDE_SELECTION_OPTIONS
  );

  await expect(
    loadReservationGuideDirectory()
  ).resolves.toEqual({
    guides: RESERVATION_GUIDE_SELECTION_OPTIONS,
    kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
  });
});

it("records a safe result when the directory query fails", async () => {
  const error = Object.assign(
    new Error(RESERVATION_GUIDE_LOAD_TEST.FAILURE_MESSAGE),
    { code: RESERVATION_GUIDE_LOAD_TEST.FAILURE_CODE }
  );
  getGuides.mockRejectedValue(error);

  await expect(
    loadReservationGuideDirectory()
  ).resolves.toEqual({
    code: RESERVATION_GUIDE_LOAD_TEST.FAILURE_CODE,
    kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.FAILURE,
  });
  expect(recordFailure).toHaveBeenCalledWith(
    error,
    RESERVATION_GUIDE_LOAD_TEST.FAILURE_CODE
  );
});

it("rethrows Next control-flow errors", async () => {
  const controlFlowError = new Error(
    RESERVATION_GUIDE_LOAD_TEST.CONTROL_FLOW_MESSAGE
  );
  getGuides.mockRejectedValue(controlFlowError);
  unstableRethrow.mockImplementation(() => {
    throw controlFlowError;
  });

  await expect(
    loadReservationGuideDirectory()
  ).rejects.toThrow(
    RESERVATION_GUIDE_LOAD_TEST.CONTROL_FLOW_MESSAGE
  );
  expect(recordFailure).not.toHaveBeenCalled();
});
