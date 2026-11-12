import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CATEGORY_IMAGE,
  CATEGORY_IMAGE_MIME_TYPE,
} from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { uploadCategoryImageObject } from "../services/uploadCategoryImageObject";
import {
  buildImageFile,
  EXPECTED_UPLOAD_PATH,
  IMAGE_CATEGORY_ID,
  OBJECT_SIZE_ABOVE_MAX_BYTES,
  STORAGE_ERROR,
  UNSUPPORTED_OBJECT_TYPE,
  UPLOAD_OBJECT_ID,
} from "./CategoryImage.constants";
import {
  FAKE_STORAGE_HOST,
  mockStorageFrom,
  mockStorageUpload,
  resetStorageMocks,
} from "./CategoryImageStorage.harness";

vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: () => FAKE_STORAGE_HOST,
}));

describe("uploadCategoryImageObject", () => {
  beforeEach(() => {
    resetStorageMocks();
    vi.spyOn(crypto, "randomUUID").mockReturnValue(
      UPLOAD_OBJECT_ID
    );
  });

  it("uploads the file under its category without overwriting anything", async () => {
    mockStorageUpload.mockResolvedValue({
      data: {},
      error: null,
    });
    const file = buildImageFile();

    const result = await uploadCategoryImageObject({
      categoryId: IMAGE_CATEGORY_ID,
      file,
    });

    expect(mockStorageFrom).toHaveBeenCalledWith(
      CATEGORY_IMAGE.BUCKET
    );
    expect(mockStorageUpload).toHaveBeenCalledWith(
      EXPECTED_UPLOAD_PATH,
      file,
      {
        contentType: CATEGORY_IMAGE_MIME_TYPE.PNG,
        upsert: false,
      }
    );
    expect(result).toEqual({
      imagePath: EXPECTED_UPLOAD_PATH,
    });
  });

  it("returns the upload error message when storage refuses the file", async () => {
    mockStorageUpload.mockResolvedValue({
      data: null,
      error: STORAGE_ERROR,
    });

    expect(
      await uploadCategoryImageObject({
        categoryId: IMAGE_CATEGORY_ID,
        file: buildImageFile(),
      })
    ).toEqual({
      message: CATEGORY_IMAGE_COPY.UPLOAD_ERROR,
    });
  });

  it.each([
    [{ size: 0 }, CATEGORY_IMAGE_COPY.FILE_EMPTY_ERROR],
    [
      { size: OBJECT_SIZE_ABOVE_MAX_BYTES },
      CATEGORY_IMAGE_COPY.FILE_TOO_LARGE_ERROR,
    ],
    [
      { type: UNSUPPORTED_OBJECT_TYPE },
      CATEGORY_IMAGE_COPY.FILE_UNSUPPORTED_TYPE_ERROR,
    ],
  ])(
    "rejects the invalid file %j before reaching storage",
    async (overrides, message) => {
      const result = await uploadCategoryImageObject({
        categoryId: IMAGE_CATEGORY_ID,
        file: buildImageFile(overrides),
      });

      expect(result).toEqual({ message });
      expect(mockStorageUpload).not.toHaveBeenCalled();
    }
  );
});
