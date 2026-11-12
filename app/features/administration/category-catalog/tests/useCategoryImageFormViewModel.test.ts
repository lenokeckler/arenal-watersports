import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS, STATUS } from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { CATEGORY_IMAGE_FORM_STATE } from "../constants/CategoryImageFormState.constants";
import { useCategoryImageFormViewModel } from "../hooks/useCategoryImageFormViewModel";
import type { CategoryImage } from "../models/CategoryImage.interface";
import {
  buildImageFile,
  IMAGE_CATEGORY_ID,
  UNSUPPORTED_OBJECT_TYPE,
} from "./CategoryImage.constants";
import {
  EMPTY_CATEGORY_IMAGE,
  PICKED_PREVIEW_URL,
  SAVED_CATEGORY_IMAGE,
  SAVED_IMAGE_URL,
} from "./CategoryImageScreen.constants";

const mockPush = vi.fn();
const mockRefresh = vi.fn();
const mockShowToast = vi.fn();
const mockSaveCategoryImage = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../utils/saveCategoryImage", () => ({
  saveCategoryImage: (options: object) =>
    mockSaveCategoryImage(options),
}));

const renderViewModel = (image: CategoryImage) =>
  renderHook(() =>
    useCategoryImageFormViewModel({ image })
  );

describe("useCategoryImageFormViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    Object.assign(URL, {
      createObjectURL: () => PICKED_PREVIEW_URL,
      revokeObjectURL: vi.fn(),
    });
    mockSaveCategoryImage.mockResolvedValue({
      hasLeftoverObject: false,
      message: CATEGORY_IMAGE_COPY.SAVE_SUCCESS_TOAST,
      status: STATUS.SUCCESS,
    });
  });

  it("starts empty without an image", () => {
    const { result } = renderViewModel(
      EMPTY_CATEGORY_IMAGE
    );

    expect(result.current.formState).toBe(
      CATEGORY_IMAGE_FORM_STATE.EMPTY
    );
    expect(result.current.previewUrl).toBeNull();
  });

  it("starts saved and previews the stored image", () => {
    const { result } = renderViewModel(
      SAVED_CATEGORY_IMAGE
    );

    expect(result.current.formState).toBe(
      CATEGORY_IMAGE_FORM_STATE.SAVED
    );
    expect(result.current.previewUrl).toBe(SAVED_IMAGE_URL);
  });

  it("previews a picked file over the stored image", async () => {
    const { result } = renderViewModel(
      SAVED_CATEGORY_IMAGE
    );

    act(() => result.current.onPickFile(buildImageFile()));

    expect(result.current.formState).toBe(
      CATEGORY_IMAGE_FORM_STATE.PICKED
    );
    await waitFor(() =>
      expect(result.current.previewUrl).toBe(
        PICKED_PREVIEW_URL
      )
    );
    expect(result.current.errorMessage).toBeNull();
  });

  it("rejects a file that is not an image and keeps no pick", () => {
    const { result } = renderViewModel(
      EMPTY_CATEGORY_IMAGE
    );

    act(() =>
      result.current.onPickFile(
        buildImageFile({ type: UNSUPPORTED_OBJECT_TYPE })
      )
    );

    expect(result.current.errorMessage).toBe(
      CATEGORY_IMAGE_COPY.FILE_UNSUPPORTED_TYPE_ERROR
    );
    expect(result.current.formState).toBe(
      CATEGORY_IMAGE_FORM_STATE.EMPTY
    );
  });

  it("saves the picked file, clears it and refreshes the server data", async () => {
    const { result } = renderViewModel(
      EMPTY_CATEGORY_IMAGE
    );

    act(() => result.current.onPickFile(buildImageFile()));
    await act(() => result.current.onSave());

    expect(mockSaveCategoryImage).toHaveBeenCalledOnce();
    expect(
      mockSaveCategoryImage.mock.calls[0][0]
    ).toMatchObject({
      categoryId: IMAGE_CATEGORY_ID,
    });
    expect(mockRefresh).toHaveBeenCalledOnce();
    expect(result.current.formState).toBe(
      CATEGORY_IMAGE_FORM_STATE.EMPTY
    );
  });

  it("does nothing on save without a picked file", async () => {
    const { result } = renderViewModel(
      SAVED_CATEGORY_IMAGE
    );

    await act(() => result.current.onSave());

    expect(mockSaveCategoryImage).not.toHaveBeenCalled();
  });

  it("goes back to the category list", () => {
    const { result } = renderViewModel(
      EMPTY_CATEGORY_IMAGE
    );

    act(() => result.current.onBack());

    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });
});
