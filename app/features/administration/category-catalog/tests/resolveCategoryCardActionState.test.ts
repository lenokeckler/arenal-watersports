import { describe, expect, it } from "vitest";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { resolveCategoryCardActionState } from "../utils/resolveCategoryCardActionState";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

describe("resolveCategoryCardActionState", () => {
  it("returns DELETE for an active category with no records", () => {
    const category = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      hasRecords: false,
    };

    expect(
      resolveCategoryCardActionState(category, false)
    ).toBe(CATEGORY_CARD_ACTION_STATE.DELETE);
  });

  it("returns MARK_INACTIVE for an active category with records", () => {
    const category = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      hasRecords: true,
    };

    expect(
      resolveCategoryCardActionState(category, false)
    ).toBe(CATEGORY_CARD_ACTION_STATE.MARK_INACTIVE);
  });

  it("returns REACTIVATE for an inactive category regardless of records", () => {
    const category = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      hasRecords: true,
      status: CATEGORY_STATUS.INACTIVE,
    };

    expect(
      resolveCategoryCardActionState(category, false)
    ).toBe(CATEGORY_CARD_ACTION_STATE.REACTIVATE);
  });

  it("returns CONFIRM_DELETE for an active card being confirmed", () => {
    const category = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      hasRecords: false,
    };

    expect(
      resolveCategoryCardActionState(category, true)
    ).toBe(CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE);
  });

  it("returns REACTIVATE for an inactive card even while it is marked as being confirmed", () => {
    const category = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      hasRecords: false,
      status: CATEGORY_STATUS.INACTIVE,
    };

    expect(
      resolveCategoryCardActionState(category, true)
    ).toBe(CATEGORY_CARD_ACTION_STATE.REACTIVATE);
  });

  it("returns MARK_INACTIVE for an active card with records being confirmed, since categories with records never reach the DELETE state that starts a confirm", () => {
    const category = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      hasRecords: true,
    };

    expect(
      resolveCategoryCardActionState(category, true)
    ).toBe(CATEGORY_CARD_ACTION_STATE.MARK_INACTIVE);
  });
});
