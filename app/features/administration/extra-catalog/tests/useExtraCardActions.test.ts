import { deleteOrDeactivateMock } from "./extraCardActions.harness";
import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import type { ExtraRemovalResult } from "../models/ExtraRemovalResult.type";
import { useExtraCardActions } from "../hooks/useExtraCardActions";
import { createDeferred } from "./createDeferred";
import { FAKE_EXTRA_ID } from "./Extra.constants";
import { DELETED_REMOVAL_RESULT } from "./ExtraCardActions.constants";
import { settleDeferred } from "./settleDeferred";

const SECOND_EXTRA_ID = "second-extra-id";

describe("useExtraCardActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps a card loading while another card settles first", async () => {
    const first = createDeferred<ExtraRemovalResult>();
    const second = createDeferred<ExtraRemovalResult>();
    deleteOrDeactivateMock
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise);
    const { result } = renderHook(() =>
      useExtraCardActions()
    );

    act(() => {
      void result.current.onConfirmRemovalClick(
        FAKE_EXTRA_ID
      )();
      void result.current.onConfirmRemovalClick(
        SECOND_EXTRA_ID
      )();
    });

    expect(result.current.pendingExtraIds).toEqual([
      FAKE_EXTRA_ID,
      SECOND_EXTRA_ID,
    ]);

    await settleDeferred(second, DELETED_REMOVAL_RESULT);

    expect(result.current.pendingExtraIds).toEqual([
      FAKE_EXTRA_ID,
    ]);

    await settleDeferred(first, DELETED_REMOVAL_RESULT);

    expect(result.current.pendingExtraIds).toEqual([]);
  });
});
