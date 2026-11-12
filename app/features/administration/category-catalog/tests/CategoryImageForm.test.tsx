import { render, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS, STATUS } from "@/app/constants";
import CategoryImageForm from "../CategoryImageForm";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import type { CategoryImage } from "../models/CategoryImage.interface";
import {
  buildImageFile,
  UNSUPPORTED_OBJECT_TYPE,
} from "./CategoryImage.constants";
import { createCategoryImageFormPage } from "./CategoryImageForm.page";
import {
  EMPTY_CATEGORY_IMAGE,
  PICKED_PREVIEW_URL,
  SAVED_CATEGORY_IMAGE,
} from "./CategoryImageScreen.constants";

const mockPush = vi.fn();
const mockRefresh = vi.fn();
const mockShowToast = vi.fn();
const mockSaveCategoryImage = vi.fn();
const mockRemoveCategoryImage = vi.fn();

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

vi.mock("../utils/removeCategoryImage", () => ({
  removeCategoryImage: (categoryId: string) =>
    mockRemoveCategoryImage(categoryId),
}));

const COMPLETED_OUTCOME = {
  hasLeftoverObject: false,
  message: CATEGORY_IMAGE_COPY.SAVE_SUCCESS_TOAST,
  status: STATUS.SUCCESS,
};

const renderForm = (image: CategoryImage) => {
  render(<CategoryImageForm image={image} />);
  return createCategoryImageFormPage();
};

describe("CategoryImageForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    Object.assign(URL, {
      createObjectURL: () => PICKED_PREVIEW_URL,
      revokeObjectURL: vi.fn(),
    });
    mockSaveCategoryImage.mockResolvedValue(
      COMPLETED_OUTCOME
    );
    mockRemoveCategoryImage.mockResolvedValue(
      COMPLETED_OUTCOME
    );
  });

  it("shows the no-image state with only choose and back", () => {
    const imageFormPage = renderForm(EMPTY_CATEGORY_IMAGE);

    expect(imageFormPage.getHeading()).toBeInTheDocument();
    expect(
      imageFormPage.queryEmptyPreview()
    ).toBeInTheDocument();
    expect(imageFormPage.getSaveButton()).toBeNull();
    expect(imageFormPage.getRemoveButton()).toBeNull();
    expect(imageFormPage.getBackButton()).toBeEnabled();
  });

  it("shows the current image with remove available", () => {
    const imageFormPage = renderForm(SAVED_CATEGORY_IMAGE);

    expect(
      imageFormPage.queryPreviewImage(
        CATEGORY_IMAGE_COPY.PREVIEW_ALT_SAVED
      )
    ).toBeInTheDocument();
    expect(imageFormPage.getRemoveButton()).toBeEnabled();
    expect(imageFormPage.getSaveButton()).toBeNull();
  });

  it("previews a chosen image and offers to save it", async () => {
    const imageFormPage = renderForm(EMPTY_CATEGORY_IMAGE);

    await imageFormPage.chooseFile(buildImageFile());

    await waitFor(() =>
      expect(
        imageFormPage.queryPreviewImage(
          CATEGORY_IMAGE_COPY.PREVIEW_ALT_PICKED
        )
      ).toBeInTheDocument()
    );
    expect(imageFormPage.getSaveButton()).toBeEnabled();
  });

  it("shows the error and no save button for a file that is not an image", async () => {
    const imageFormPage = renderForm(EMPTY_CATEGORY_IMAGE);

    await imageFormPage.chooseFile(
      buildImageFile({ type: UNSUPPORTED_OBJECT_TYPE })
    );

    expect(imageFormPage.queryAlert()).toHaveTextContent(
      CATEGORY_IMAGE_COPY.FILE_UNSUPPORTED_TYPE_ERROR
    );
    expect(imageFormPage.getSaveButton()).toBeNull();
  });

  it("saves the chosen image and refreshes the screen", async () => {
    const imageFormPage = renderForm(EMPTY_CATEGORY_IMAGE);

    await imageFormPage.chooseFile(buildImageFile());
    await imageFormPage.save();

    await waitFor(() =>
      expect(mockRefresh).toHaveBeenCalledOnce()
    );
    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      CATEGORY_IMAGE_COPY.SAVE_SUCCESS_TOAST
    );
  });

  it("asks before removing and removes only after confirming", async () => {
    const imageFormPage = renderForm(SAVED_CATEGORY_IMAGE);

    await imageFormPage.startRemoval();

    expect(
      imageFormPage.queryText(
        CATEGORY_IMAGE_COPY.REMOVE_CONFIRM_MESSAGE
      )
    ).toBeInTheDocument();
    expect(mockRemoveCategoryImage).not.toHaveBeenCalled();

    await imageFormPage.confirmRemoval();

    await waitFor(() =>
      expect(mockRemoveCategoryImage).toHaveBeenCalledOnce()
    );
    expect(mockRefresh).toHaveBeenCalledOnce();
  });

  it("goes back to the category list", async () => {
    const imageFormPage = renderForm(EMPTY_CATEGORY_IMAGE);

    await imageFormPage.goBack();

    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });
});
