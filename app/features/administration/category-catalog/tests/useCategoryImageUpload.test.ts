import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { useCategoryImageUpload } from "../hooks/useCategoryImageUpload";
import type { CategoryImageSaveOutcome } from "../models/CategoryImageSaveOutcome.interface";
import {
  buildImageFile,
  IMAGE_CATEGORY_ID,
} from "./CategoryImage.constants";

const mockShowToast = vi.fn();
const mockSaveCategoryImage = vi.fn();
const mockOnSaved = vi.fn();

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../utils/saveCategoryImage", () => ({
  saveCategoryImage: (options: object) =>
    mockSaveCategoryImage(options),
}));

const SAVED_OUTCOME: CategoryImageSaveOutcome = {
  hasLeftoverObject: false,
  message: CATEGORY_IMAGE_COPY.SAVE_SUCCESS_TOAST,
  status: STATUS.SUCCESS,
};

const FAILED_OUTCOME: CategoryImageSaveOutcome = {
  hasLeftoverObject: false,
  message: CATEGORY_IMAGE_COPY.UPLOAD_ERROR,
  status: STATUS.ERROR,
};

const FILE = buildImageFile();

const renderUpload = () =>
  renderHook(() =>
    useCategoryImageUpload({ onSaved: mockOnSaved })
  );

describe("useCategoryImageUpload", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockSaveCategoryImage.mockResolvedValue(SAVED_OUTCOME);
  });

  it("saves, toasts the success and notifies the screen", async () => {
    const { result } = renderUpload();

    let wasSaved = false;
    await act(async () => {
      wasSaved = await result.current.upload(
        IMAGE_CATEGORY_ID,
        FILE
      );
    });

    expect(wasSaved).toBe(true);
    expect(mockSaveCategoryImage).toHaveBeenCalledWith({
      categoryId: IMAGE_CATEGORY_ID,
      file: FILE,
    });
    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      CATEGORY_IMAGE_COPY.SAVE_SUCCESS_TOAST
    );
    expect(mockOnSaved).toHaveBeenCalledOnce();
  });

  it("toasts the error and keeps the screen as it was", async () => {
    mockSaveCategoryImage.mockResolvedValue(FAILED_OUTCOME);
    const { result } = renderUpload();

    let wasSaved = true;
    await act(async () => {
      wasSaved = await result.current.upload(
        IMAGE_CATEGORY_ID,
        FILE
      );
    });

    expect(wasSaved).toBe(false);
    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.ERROR,
      CATEGORY_IMAGE_COPY.UPLOAD_ERROR
    );
    expect(mockOnSaved).not.toHaveBeenCalled();
  });

  it("warns when the previous object could not be deleted", async () => {
    mockSaveCategoryImage.mockResolvedValue({
      ...SAVED_OUTCOME,
      hasLeftoverObject: true,
    });
    const { result } = renderUpload();

    await act(async () => {
      await result.current.upload(IMAGE_CATEGORY_ID, FILE);
    });

    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.WARNING,
      CATEGORY_IMAGE_COPY.LEFTOVER_OBJECT_WARNING_TOAST
    );
  });

  it("ignores a second upload while the first is in flight", async () => {
    const { result } = renderUpload();

    await act(async () => {
      await Promise.all([
        result.current.upload(IMAGE_CATEGORY_ID, FILE),
        result.current.upload(IMAGE_CATEGORY_ID, FILE),
      ]);
    });

    expect(mockSaveCategoryImage).toHaveBeenCalledOnce();
  });
});
