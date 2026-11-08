import { describe, expect, it, vi } from "vitest";
import { EXTRA_CARD_ACTION_STATE } from "../constants/ExtraCardActionState.constants";
import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import { buildExtraCardViewModel } from "../utils/buildExtraCardViewModel";
import { resolveExtraEditPath } from "../utils/resolveExtraEditPath";
import { DEFAULT_EXTRA } from "./Extra.constants";
import { buildExtraCardActionsViewModel } from "./ExtraCardActions.constants";
import { buildExtra } from "./ExtraList.constants";

describe("buildExtraCardViewModel", () => {
  it("carries the extra and points the edit link at its edit path", () => {
    const card = buildExtraCardViewModel(
      DEFAULT_EXTRA,
      buildExtraCardActionsViewModel()
    );

    expect(card).toMatchObject({
      editHref: resolveExtraEditPath(DEFAULT_EXTRA.id),
      id: DEFAULT_EXTRA.id,
      name: DEFAULT_EXTRA.name,
      status: DEFAULT_EXTRA.status,
    });
  });

  it("offers removal on an active extra that is not being confirmed", () => {
    const card = buildExtraCardViewModel(
      DEFAULT_EXTRA,
      buildExtraCardActionsViewModel()
    );

    expect(card.actionState).toBe(
      EXTRA_CARD_ACTION_STATE.REMOVE
    );
    expect(card.isActionLoading).toBe(false);
  });

  it("asks for confirmation only on the extra being confirmed", () => {
    const cardActions = buildExtraCardActionsViewModel({
      confirmingExtraId: DEFAULT_EXTRA.id,
    });

    expect(
      buildExtraCardViewModel(DEFAULT_EXTRA, cardActions)
        .actionState
    ).toBe(EXTRA_CARD_ACTION_STATE.CONFIRM_REMOVAL);
    expect(
      buildExtraCardViewModel(
        buildExtra({ id: "other-extra-id" }),
        cardActions
      ).actionState
    ).toBe(EXTRA_CARD_ACTION_STATE.REMOVE);
  });

  it("offers reactivation on an inactive extra", () => {
    const card = buildExtraCardViewModel(
      buildExtra({ status: EXTRA_STATUS.INACTIVE }),
      buildExtraCardActionsViewModel()
    );

    expect(card.actionState).toBe(
      EXTRA_CARD_ACTION_STATE.REACTIVATE
    );
  });

  it("marks only the pending extra as loading", () => {
    const cardActions = buildExtraCardActionsViewModel({
      pendingExtraIds: [DEFAULT_EXTRA.id],
    });

    expect(
      buildExtraCardViewModel(DEFAULT_EXTRA, cardActions)
        .isActionLoading
    ).toBe(true);
    expect(
      buildExtraCardViewModel(
        buildExtra({ id: "other-extra-id" }),
        cardActions
      ).isActionLoading
    ).toBe(false);
  });

  it("binds each click handler to the extra id", () => {
    const confirmRemoval = vi.fn();
    const remove = vi.fn();
    const reactivate = vi.fn();
    const onConfirmRemovalClick = vi
      .fn()
      .mockReturnValue(confirmRemoval);
    const onRemoveClick = vi.fn().mockReturnValue(remove);
    const onReactivateClick = vi
      .fn()
      .mockReturnValue(reactivate);

    const card = buildExtraCardViewModel(
      DEFAULT_EXTRA,
      buildExtraCardActionsViewModel({
        onConfirmRemovalClick,
        onReactivateClick,
        onRemoveClick,
      })
    );

    expect(onConfirmRemovalClick).toHaveBeenCalledWith(
      DEFAULT_EXTRA.id
    );
    expect(onRemoveClick).toHaveBeenCalledWith(
      DEFAULT_EXTRA.id
    );
    expect(onReactivateClick).toHaveBeenCalledWith(
      DEFAULT_EXTRA.id
    );
    expect(card.onConfirmRemovalClick).toBe(confirmRemoval);
    expect(card.onRemoveClick).toBe(remove);
    expect(card.onReactivateClick).toBe(reactivate);
  });
});
