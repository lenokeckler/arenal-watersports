import { beforeEach, describe, expect, it } from "vitest";
import { CATEGORY_IMAGE } from "@/app/constants";
import { discardCategoryImageObject } from "../services/discardCategoryImageObject";
import { removeCategoryImageObject } from "../services/removeCategoryImageObject";
import {
  CURRENT_IMAGE_PATH,
  STORAGE_ERROR,
} from "./CategoryImage.constants";
import {
  FAKE_STORAGE_HOST,
  mockStorageFrom,
  mockStorageRemove,
  resetStorageMocks,
} from "./CategoryImageStorage.harness";

const options = {
  imagePath: CURRENT_IMAGE_PATH,
  supabase: FAKE_STORAGE_HOST,
};

describe("removeCategoryImageObject", () => {
  beforeEach(resetStorageMocks);

  it("removes the object from the category image bucket", async () => {
    mockStorageRemove.mockResolvedValue({
      data: [],
      error: null,
    });

    const wasRemoved =
      await removeCategoryImageObject(options);

    expect(mockStorageFrom).toHaveBeenCalledWith(
      CATEGORY_IMAGE.BUCKET
    );
    expect(mockStorageRemove).toHaveBeenCalledWith([
      CURRENT_IMAGE_PATH,
    ]);
    expect(wasRemoved).toBe(true);
  });

  it("reports false instead of throwing when storage refuses the removal", async () => {
    mockStorageRemove.mockResolvedValue({
      data: null,
      error: STORAGE_ERROR,
    });

    expect(await removeCategoryImageObject(options)).toBe(
      false
    );
  });
});

describe("discardCategoryImageObject", () => {
  beforeEach(resetStorageMocks);

  it("does nothing and leaves nothing behind when there is no previous image", async () => {
    const hasLeftoverObject =
      await discardCategoryImageObject({
        ...options,
        imagePath: null,
      });

    expect(hasLeftoverObject).toBe(false);
    expect(mockStorageRemove).not.toHaveBeenCalled();
  });

  it("reports no leftover when the object was removed", async () => {
    mockStorageRemove.mockResolvedValue({
      data: [],
      error: null,
    });

    expect(await discardCategoryImageObject(options)).toBe(
      false
    );
  });

  it("reports a leftover when the removal fails", async () => {
    mockStorageRemove.mockResolvedValue({
      data: null,
      error: STORAGE_ERROR,
    });

    expect(await discardCategoryImageObject(options)).toBe(
      true
    );
  });
});
