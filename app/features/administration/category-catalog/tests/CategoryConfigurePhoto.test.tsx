import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import {
  buildCategoryConfiguration,
  DEFAULT_CATEGORY_CONFIGURATION,
} from "./CategoryConfiguration.constants";
import { createCategoryConfigureViewPage } from "./CategoryConfigureView.page";
import {
  buildImageFile,
  UNSUPPORTED_OBJECT_TYPE,
} from "./CategoryImage.constants";
import { PICKED_PREVIEW_URL } from "./CategoryImageScreen.constants";
import { renderCategoryConfigureView } from "./renderCategoryConfigureView";

const { BADGE_MISSING, PHOTO_EMPTY } =
  CATEGORY_CONFIGURE_COPY;
const { PHOTO_PICKED, SECTION_PHOTO } =
  CATEGORY_CONFIGURE_COPY;

const openPhotoSection = async () => {
  renderCategoryConfigureView(
    buildCategoryConfiguration({
      image: {
        ...DEFAULT_CATEGORY_CONFIGURATION.image,
        imagePath: null,
      },
    })
  );
  const page = createCategoryConfigureViewPage();
  await page.toggleSection(SECTION_PHOTO);

  return page;
};

describe("CategoryConfigurePhoto", () => {
  beforeEach(() => {
    Object.assign(URL, {
      createObjectURL: () => PICKED_PREVIEW_URL,
      revokeObjectURL: vi.fn(),
    });
  });

  it("shows the validation message and keeps the placeholder for a file that is not an image", async () => {
    const page = await openPhotoSection();

    await page.pickPhoto(
      buildImageFile({ type: UNSUPPORTED_OBJECT_TYPE })
    );

    expect(page.getAlert()).toHaveTextContent(
      CATEGORY_IMAGE_COPY.FILE_UNSUPPORTED_TYPE_ERROR
    );
    expect(page.getText(PHOTO_EMPTY)).toBeInTheDocument();
  });

  it("previews a picked photo and the section stops asking for one", async () => {
    const page = await openPhotoSection();
    const header = page.getSectionButton(SECTION_PHOTO);
    expect(header).toHaveTextContent(BADGE_MISSING);

    await page.pickPhoto(buildImageFile());

    await waitFor(() =>
      expect(
        page.getImage(
          CATEGORY_IMAGE_COPY.PREVIEW_ALT_PICKED
        )
      ).toBeInTheDocument()
    );
    expect(header).toHaveTextContent(PHOTO_PICKED);
    expect(header).not.toHaveTextContent(BADGE_MISSING);
  });
});
