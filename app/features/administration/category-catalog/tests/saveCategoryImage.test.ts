import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { saveCategoryImage } from "../utils/saveCategoryImage";
import {
  buildImageFile,
  IMAGE_CATEGORY_ID,
  NEW_IMAGE_PATH,
  OBJECT_SIZE_BYTES,
} from "./CategoryImage.constants";
import {
  ACTION_ERROR_MESSAGE,
  BROWSER_SUPABASE_CLIENT,
  SET_ERROR_RESULT,
  SET_LEFTOVER_RESULT,
  SET_SUCCESS_RESULT,
  UPLOAD_FAILURE,
  UPLOADED_IMAGE,
} from "./CategoryImageScreen.constants";

const mockCompress = vi.fn();
const mockUpload = vi.fn();
const mockSetAction = vi.fn();
const mockDiscard = vi.fn();

vi.mock(
  "@/app/utils/category-image/compressCategoryImage",
  () => ({
    compressCategoryImage: (file: File) =>
      mockCompress(file),
  })
);
vi.mock("../services/uploadCategoryImageObject", () => ({
  uploadCategoryImageObject: (options: object) =>
    mockUpload(options),
}));
vi.mock("../services/setCategoryImageAction", () => ({
  setCategoryImageAction: (input: object) =>
    mockSetAction(input),
}));
vi.mock("../services/discardCategoryImageObject", () => ({
  discardCategoryImageObject: (options: object) =>
    mockDiscard(options),
}));
vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: () =>
    BROWSER_SUPABASE_CLIENT,
}));

const PICKED_FILE = buildImageFile();
const COMPRESSED_FILE = buildImageFile({
  size: OBJECT_SIZE_BYTES / 2,
});
const SAVE_OPTIONS = {
  categoryId: IMAGE_CATEGORY_ID,
  file: PICKED_FILE,
};
const DISCARD_OPTIONS = {
  imagePath: NEW_IMAGE_PATH,
  supabase: BROWSER_SUPABASE_CLIENT,
};

describe("saveCategoryImage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockCompress.mockResolvedValue(COMPRESSED_FILE);
    mockUpload.mockResolvedValue(UPLOADED_IMAGE);
    mockSetAction.mockResolvedValue(SET_SUCCESS_RESULT);
    mockDiscard.mockResolvedValue(false);
  });

  afterEach(() => vi.restoreAllMocks());

  it("compresses, uploads the compressed file and links it", async () => {
    const outcome = await saveCategoryImage(SAVE_OPTIONS);

    expect(mockUpload).toHaveBeenCalledWith({
      categoryId: IMAGE_CATEGORY_ID,
      file: COMPRESSED_FILE,
    });
    expect(mockSetAction).toHaveBeenCalledWith({
      categoryId: IMAGE_CATEGORY_ID,
      imagePath: NEW_IMAGE_PATH,
    });
    expect(outcome).toEqual({
      hasLeftoverObject: false,
      message: CATEGORY_IMAGE_COPY.SAVE_SUCCESS_TOAST,
      status: STATUS.SUCCESS,
    });
    expect(mockDiscard).not.toHaveBeenCalled();
  });

  it("reports a leftover object when the old image could not be deleted", async () => {
    mockSetAction.mockResolvedValue(SET_LEFTOVER_RESULT);

    const outcome = await saveCategoryImage(SAVE_OPTIONS);

    expect(outcome.status).toBe(STATUS.SUCCESS);
    expect(outcome.hasLeftoverObject).toBe(true);
  });

  it("does not touch the network while offline", async () => {
    vi.spyOn(
      window.navigator,
      "onLine",
      "get"
    ).mockReturnValue(false);

    const outcome = await saveCategoryImage(SAVE_OPTIONS);

    expect(outcome.message).toBe(
      CATEGORY_IMAGE_COPY.OFFLINE_ERROR
    );
    expect(outcome.status).toBe(STATUS.ERROR);
    expect(mockCompress).not.toHaveBeenCalled();
    expect(mockUpload).not.toHaveBeenCalled();
  });

  it("fails without uploading when the image cannot be compressed", async () => {
    mockCompress.mockRejectedValue(new Error("decode"));

    const outcome = await saveCategoryImage(SAVE_OPTIONS);

    expect(outcome.message).toBe(
      CATEGORY_IMAGE_COPY.COMPRESS_ERROR
    );
    expect(mockUpload).not.toHaveBeenCalled();
  });

  it("returns the upload message and never calls the action when the upload fails", async () => {
    mockUpload.mockResolvedValue(UPLOAD_FAILURE);

    const outcome = await saveCategoryImage(SAVE_OPTIONS);

    expect(outcome.message).toBe(UPLOAD_FAILURE.message);
    expect(outcome.status).toBe(STATUS.ERROR);
    expect(mockSetAction).not.toHaveBeenCalled();
    expect(mockDiscard).not.toHaveBeenCalled();
  });

  it("discards the new object when the action refuses it", async () => {
    mockSetAction.mockResolvedValue(SET_ERROR_RESULT);

    const outcome = await saveCategoryImage(SAVE_OPTIONS);

    expect(outcome.message).toBe(ACTION_ERROR_MESSAGE);
    expect(mockDiscard).toHaveBeenCalledWith(
      DISCARD_OPTIONS
    );
  });

  it("discards the new object when the action cannot be reached", async () => {
    mockSetAction.mockRejectedValue(new Error("network"));

    const outcome = await saveCategoryImage(SAVE_OPTIONS);

    expect(outcome.message).toBe(
      CATEGORY_IMAGE_COPY.UPLOAD_ERROR
    );
    expect(mockDiscard).toHaveBeenCalledWith(
      DISCARD_OPTIONS
    );
  });

  it("turns an unexpected upload exception into the upload error", async () => {
    mockUpload.mockRejectedValue(new Error("boom"));

    const outcome = await saveCategoryImage(SAVE_OPTIONS);

    expect(outcome.message).toBe(
      CATEGORY_IMAGE_COPY.UPLOAD_ERROR
    );
    expect(outcome.status).toBe(STATUS.ERROR);
  });
});
