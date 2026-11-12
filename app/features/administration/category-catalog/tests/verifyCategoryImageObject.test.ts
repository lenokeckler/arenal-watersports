import { beforeEach, describe, expect, it } from "vitest";
import {
  CATEGORY_IMAGE,
  CATEGORY_IMAGE_MIME_TYPE,
} from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { verifyCategoryImageObject } from "../services/verifyCategoryImageObject";
import {
  NEW_IMAGE_PATH,
  OBJECT_SIZE_ABOVE_MAX_BYTES,
  STORAGE_ERROR,
  UNSUPPORTED_OBJECT_TYPE,
  VALID_OBJECT_INFO,
} from "./CategoryImage.constants";
import {
  FAKE_STORAGE_HOST,
  mockStorageFrom,
  mockStorageInfo,
  mockStorageRemove,
  resetStorageMocks,
} from "./CategoryImageStorage.harness";

const options = {
  imagePath: NEW_IMAGE_PATH,
  supabase: FAKE_STORAGE_HOST,
};

describe("verifyCategoryImageObject", () => {
  beforeEach(() => {
    resetStorageMocks();
    mockStorageRemove.mockResolvedValue({
      data: [],
      error: null,
    });
  });

  it("accepts an object within the size and type limits without touching it", async () => {
    mockStorageInfo.mockResolvedValue({
      data: VALID_OBJECT_INFO,
      error: null,
    });

    expect(
      await verifyCategoryImageObject(options)
    ).toBeNull();
    expect(mockStorageFrom).toHaveBeenCalledWith(
      CATEGORY_IMAGE.BUCKET
    );
    expect(mockStorageInfo).toHaveBeenCalledWith(
      NEW_IMAGE_PATH
    );
    expect(mockStorageRemove).not.toHaveBeenCalled();
  });

  it("reports a missing object without trying to remove it", async () => {
    mockStorageInfo.mockResolvedValue({
      data: null,
      error: STORAGE_ERROR,
    });

    expect(await verifyCategoryImageObject(options)).toBe(
      CATEGORY_IMAGE_COPY.OBJECT_MISSING_ERROR
    );
    expect(mockStorageRemove).not.toHaveBeenCalled();
  });

  it.each([
    [
      "is too large",
      {
        contentType: CATEGORY_IMAGE_MIME_TYPE.PNG,
        size: OBJECT_SIZE_ABOVE_MAX_BYTES,
      },
    ],
    [
      "has an unsupported type",
      {
        ...VALID_OBJECT_INFO,
        contentType: UNSUPPORTED_OBJECT_TYPE,
      },
    ],
    ["has no metadata", {}],
  ])(
    "removes the object and reports it invalid when it %s",
    async (_case, info) => {
      mockStorageInfo.mockResolvedValue({
        data: info,
        error: null,
      });

      expect(await verifyCategoryImageObject(options)).toBe(
        CATEGORY_IMAGE_COPY.OBJECT_INVALID_ERROR
      );
      expect(mockStorageRemove).toHaveBeenCalledWith([
        NEW_IMAGE_PATH,
      ]);
    }
  );
});
