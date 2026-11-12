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
import { useReservationGuideLoadViewModel } from "../hooks/useReservationGuideLoadViewModel";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";

vi.mock("next/navigation", () => ({
  unstable_rethrow: vi.fn(),
}));

vi.mock("../actions/getReservationGuidesAction", () => ({
  getReservationGuidesAction: vi.fn(),
}));

describe("useReservationGuideLoadViewModel", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("keeps a safe failure state after retry rejects", async () => {
    const reportError = vi.fn();
    vi.stubGlobal("reportError", reportError);
    const rejection = Object.assign(
      new Error(
        RESERVATION_GUIDE_ASSIGNMENT_TEST.RETRY_ERROR_MESSAGE
      ),
      {
        code: RESERVATION_GUIDE_ASSIGNMENT_TEST.LOAD_ERROR_CODE,
      }
    );
    let rejectRetry: (cause: unknown) => void = () => {
      throw new Error(
        RESERVATION_GUIDE_ASSIGNMENT_TEST.RETRY_ERROR_MESSAGE
      );
    };
    const retryResult = new Promise<never>(
      (_resolve, reject) => {
        rejectRetry = reject;
      }
    );
    vi.mocked(getReservationGuidesAction).mockReturnValue(
      retryResult
    );
    const initialResult = {
      code: RESERVATION_GUIDE_ASSIGNMENT_TEST.LOAD_ERROR_CODE,
      kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.FAILURE,
    } as const;
    const { result } = renderHook(() =>
      useReservationGuideLoadViewModel(initialResult)
    );

    let retry = Promise.resolve();
    act(() => {
      retry = result.current.retry();
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.result).toEqual(initialResult);

    await act(async () => {
      rejectRetry(rejection);
      await retry;
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.result).toEqual(initialResult);
    expect(reportError).toHaveBeenCalledOnce();
  });

  it("lets Next control-flow errors escape a retry", async () => {
    vi.stubGlobal("reportError", vi.fn());
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
    vi.stubGlobal("reportError", reportError);
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
