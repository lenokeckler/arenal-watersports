import { act, renderHook } from "@testing-library/react";
import { unstable_rethrow } from "next/navigation";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationGuidesAction } from "../actions/getReservationGuidesAction";
import { EMPTY_RESERVATION_GUIDE_LOAD_RESULT } from "../constants/ReservationGuideLoad.constants";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import { useReservationGuideLoadViewModel } from "../hooks/useReservationGuideLoadViewModel";

vi.mock("next/navigation", () => ({
  unstable_rethrow: vi.fn(),
}));

vi.mock("../actions/getReservationGuidesAction", () => ({
  getReservationGuidesAction: vi.fn(),
}));

describe("useReservationGuideLoadViewModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lets Next control-flow errors escape a retry", async () => {
    const controlFlowError = new Error(
      RESERVATION_GUIDE_ASSIGNMENT_TEST.RETRY_ERROR_MESSAGE
    );
    vi.mocked(getReservationGuidesAction).mockRejectedValue(
      controlFlowError
    );
    vi.mocked(unstable_rethrow).mockImplementation(
      (error: unknown) => {
        throw error;
      }
    );
    const { result } = renderHook(() =>
      useReservationGuideLoadViewModel(
        EMPTY_RESERVATION_GUIDE_LOAD_RESULT
      )
    );

    await act(async () => {
      await expect(result.current.retry()).rejects.toBe(
        controlFlowError
      );
    });
  });
});
