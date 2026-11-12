import {
  reactivateMock,
  refreshMock,
  showToastMock,
} from "./extraCardActions.harness";
import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { useExtraCardReactivation } from "../hooks/useExtraCardReactivation";
import { FAKE_EXTRA_ID } from "./Extra.constants";
import {
  FAILED_REACTIVATION_RESULT,
  FAKE_REMOVAL_ERROR_MESSAGE,
  SUCCESSFUL_REACTIVATION_RESULT,
} from "./ExtraCardActions.constants";

describe("useExtraCardReactivation", () => {
  const setPendingExtraId = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const reactivate = async (): Promise<void> => {
    const { result } = renderHook(() =>
      useExtraCardReactivation(setPendingExtraId)
    );
    await act(() =>
      result.current.onReactivateClick(FAKE_EXTRA_ID)()
    );
  };

  it("reactivates the extra, toasts the success and refreshes", async () => {
    reactivateMock.mockResolvedValue(
      SUCCESSFUL_REACTIVATION_RESULT
    );

    await reactivate();

    expect(reactivateMock).toHaveBeenCalledWith(
      FAKE_EXTRA_ID
    );
    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      EXTRA_CATALOG_COPY.REACTIVATE_SUCCESS_TOAST
    );
    expect(refreshMock).toHaveBeenCalledOnce();
  });

  it("toasts the action message and still refreshes when reactivation fails", async () => {
    reactivateMock.mockResolvedValue(
      FAILED_REACTIVATION_RESULT
    );

    await reactivate();

    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.ERROR,
      FAKE_REMOVAL_ERROR_MESSAGE
    );
    expect(refreshMock).toHaveBeenCalledOnce();
  });

  it("toasts the reactivation error when the action throws", async () => {
    reactivateMock.mockRejectedValue(new Error());

    await reactivate();

    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.ERROR,
      EXTRA_CATALOG_COPY.REACTIVATE_GENERIC_ERROR
    );
  });

  it("marks the card pending while it runs and clears it after", async () => {
    reactivateMock.mockResolvedValue(
      SUCCESSFUL_REACTIVATION_RESULT
    );

    await reactivate();

    expect(setPendingExtraId).toHaveBeenCalledTimes(2);
  });
});
