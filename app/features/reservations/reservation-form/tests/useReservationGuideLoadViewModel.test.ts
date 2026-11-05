import { act, renderHook } from "@testing-library/react";
import { unstable_rethrow } from "next/navigation";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationGuidesAction } from "../actions/getReservationGuidesAction";
import {
  EMPTY_RESERVATION_GUIDE_LOAD_RESULT,
  RESERVATION_GUIDE_LOAD_RESULT_KIND,
} from "../constants/ReservationGuideLoad.constants";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import { useReservationGuideLoadViewModel } from "../hooks/useReservationGuideLoadViewModel";

vi.mock("next/navigation", () => ({
  unstable_rethrow: vi.fn(),
}));

vi.mock("../actions/getReservationGuidesAction", () => ({
  getReservationGuidesAction: vi.fn(),
}));

describe("useReservationGuideLoadViewModel", () => {
  afterEach(() => {
    Reflect.deleteProperty(window, "reportError");
  });

  beforeEach(() => {
    vi.resetAllMocks();
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

  it("recovers from an action error and clears its loading state", async () => {
    const actionError = new Error(
      RESERVATION_GUIDE_ASSIGNMENT_TEST.RETRY_ERROR_MESSAGE
    );
    const reportError = vi.fn();
    Object.defineProperty(window, "reportError", {
      configurable: true,
      value: reportError,
    });
    vi.mocked(getReservationGuidesAction).mockRejectedValue(
      actionError
    );
    const { result } = renderHook(() =>
      useReservationGuideLoadViewModel(
        EMPTY_RESERVATION_GUIDE_LOAD_RESULT
      )
    );

    await act(async () => {
      await result.current.retry();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.result).toEqual({
      code: actionError.name,
      kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.FAILURE,
    });
    expect(reportError).toHaveBeenCalledWith(actionError);
  });
});
