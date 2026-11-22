import { describe, expect, it } from "vitest";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { buildCategoryStatusNotes } from "../utils/buildCategoryStatusNotes";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

const READY_CATEGORY = {
  ...DEFAULT_CATEGORY_LIST_ITEM,
  hasImage: true,
  isReservable: true,
};

describe("buildCategoryStatusNotes", () => {
  it("returns no note for an active, reservable category with an image", () => {
    expect(
      buildCategoryStatusNotes(READY_CATEGORY)
    ).toEqual([]);
  });

  it("returns only the inactive note for an inactive category", () => {
    const category = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      hasImage: false,
      isReservable: false,
      status: CATEGORY_STATUS.INACTIVE,
    };

    expect(buildCategoryStatusNotes(category)).toEqual([
      CATEGORY_CATALOG_COPY.STATUS_NOTE_INACTIVE,
    ]);
  });

  it("returns the not reservable note for an active category that cannot be reserved", () => {
    const category = {
      ...READY_CATEGORY,
      isReservable: false,
    };

    expect(buildCategoryStatusNotes(category)).toEqual([
      CATEGORY_CATALOG_COPY.STATUS_NOTE_NOT_RESERVABLE,
    ]);
  });

  it("returns the no image note for a reservable category without an image", () => {
    const category = { ...READY_CATEGORY, hasImage: false };

    expect(buildCategoryStatusNotes(category)).toEqual([
      CATEGORY_CATALOG_COPY.STATUS_NOTE_NO_IMAGE,
    ]);
  });
});
