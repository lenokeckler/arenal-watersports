import { refreshMock } from "./extraCardActions.harness";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { EXTRA_CARD_ACTION_STATE } from "../constants/ExtraCardActionState.constants";
import { EXTRA_LIST_VIEW_STATE } from "../constants/ExtraListViewState.constants";
import { useExtraListViewModel } from "../hooks/useExtraListViewModel";
import { DEFAULT_EXTRA } from "./Extra.constants";
import {
  buildExtra,
  SECOND_EXTRA_ID,
} from "./ExtraList.constants";

describe("useExtraListViewModel", () => {
  beforeEach(() => {
    refreshMock.mockClear();
  });

  it("builds one card per extra and reports the ready state", () => {
    const { result } = renderHook(() =>
      useExtraListViewModel({
        extras: [DEFAULT_EXTRA],
        fetchFailed: false,
      })
    );

    expect(result.current.cards).toHaveLength(1);
    expect(result.current.cards[0]).toMatchObject({
      actionState: EXTRA_CARD_ACTION_STATE.REMOVE,
      id: DEFAULT_EXTRA.id,
      isActionLoading: false,
    });
    expect(result.current.viewState).toBe(
      EXTRA_LIST_VIEW_STATE.READY
    );
  });

  it("refreshes the current route on retry", () => {
    const { result } = renderHook(() =>
      useExtraListViewModel({
        extras: [],
        fetchFailed: true,
      })
    );

    result.current.onRetry();

    expect(refreshMock).toHaveBeenCalledOnce();
  });

  it("switches only the tapped card to the removal confirmation", () => {
    const { result } = renderHook(() =>
      useExtraListViewModel({
        extras: [
          DEFAULT_EXTRA,
          buildExtra({ id: SECOND_EXTRA_ID }),
        ],
        fetchFailed: false,
      })
    );

    act(() => result.current.cards[0].onRemoveClick());

    expect(
      result.current.cards.map((card) => card.actionState)
    ).toEqual([
      EXTRA_CARD_ACTION_STATE.CONFIRM_REMOVAL,
      EXTRA_CARD_ACTION_STATE.REMOVE,
    ]);
  });
});
