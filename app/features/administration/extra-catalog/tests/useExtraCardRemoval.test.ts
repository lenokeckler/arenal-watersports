import {
  deleteOrDeactivateMock,
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
import { EXTRA_REMOVAL_OUTCOME } from "../constants/ExtraRemovalOutcome.constants";
import { EXTRA_REMOVAL_OUTCOME_COPY } from "../constants/ExtraRemovalOutcomeCopy.constants";
import { useExtraCardRemoval } from "../hooks/useExtraCardRemoval";
import { FAKE_EXTRA_ID } from "./Extra.constants";
import {
  DEACTIVATED_REMOVAL_RESULT,
  DELETED_REMOVAL_RESULT,
  FAILED_REMOVAL_RESULT,
  FAKE_REMOVAL_ERROR_MESSAGE,
} from "./ExtraCardActions.constants";

describe("useExtraCardRemoval", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderRemoval = () =>
    renderHook(() => useExtraCardRemoval(vi.fn()));

  const confirm = (
    result: ReturnType<typeof renderRemoval>["result"]
  ) =>
    act(() =>
      result.current.onConfirmRemovalClick(FAKE_EXTRA_ID)()
    );

  it("asks for confirmation on the card that tapped Eliminar", () => {
    const { result } = renderRemoval();

    act(() =>
      result.current.onRemoveClick(FAKE_EXTRA_ID)()
    );

    expect(result.current.confirmingExtraId).toBe(
      FAKE_EXTRA_ID
    );
  });

  it("returns to the plain card when the confirmation is cancelled", () => {
    const { result } = renderRemoval();
    act(() =>
      result.current.onRemoveClick(FAKE_EXTRA_ID)()
    );

    act(() => result.current.onCancelClick());

    expect(result.current.confirmingExtraId).toBeNull();
    expect(deleteOrDeactivateMock).not.toHaveBeenCalled();
  });

  it("toasts the deleted copy and refreshes when the extra was deleted", async () => {
    deleteOrDeactivateMock.mockResolvedValue(
      DELETED_REMOVAL_RESULT
    );
    const { result } = renderRemoval();

    await confirm(result);

    expect(deleteOrDeactivateMock).toHaveBeenCalledWith(
      FAKE_EXTRA_ID
    );
    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      EXTRA_REMOVAL_OUTCOME_COPY[
        EXTRA_REMOVAL_OUTCOME.DELETED
      ]
    );
    expect(refreshMock).toHaveBeenCalledOnce();
  });

  it("toasts the deactivated copy, which differs from the deleted one", async () => {
    deleteOrDeactivateMock.mockResolvedValue(
      DEACTIVATED_REMOVAL_RESULT
    );
    const { result } = renderRemoval();

    await confirm(result);

    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      EXTRA_REMOVAL_OUTCOME_COPY[
        EXTRA_REMOVAL_OUTCOME.DEACTIVATED
      ]
    );
    expect(
      EXTRA_REMOVAL_OUTCOME_COPY[
        EXTRA_REMOVAL_OUTCOME.DEACTIVATED
      ]
    ).not.toBe(
      EXTRA_REMOVAL_OUTCOME_COPY[
        EXTRA_REMOVAL_OUTCOME.DELETED
      ]
    );
  });

  it("toasts the action message and still refreshes when the removal fails", async () => {
    deleteOrDeactivateMock.mockResolvedValue(
      FAILED_REMOVAL_RESULT
    );
    const { result } = renderRemoval();

    await confirm(result);

    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.ERROR,
      FAKE_REMOVAL_ERROR_MESSAGE
    );
    expect(refreshMock).toHaveBeenCalledOnce();
  });

  it("leaves the confirmation once settled", async () => {
    deleteOrDeactivateMock.mockResolvedValue(
      FAILED_REMOVAL_RESULT
    );
    const { result } = renderRemoval();
    act(() =>
      result.current.onRemoveClick(FAKE_EXTRA_ID)()
    );

    await confirm(result);

    expect(result.current.confirmingExtraId).toBeNull();
  });
});
