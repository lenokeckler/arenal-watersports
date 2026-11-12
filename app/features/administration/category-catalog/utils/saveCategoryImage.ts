import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import type { CategoryImageSaveOutcome } from "../models/CategoryImageSaveOutcome.interface";
import type { UploadCategoryImageObjectOptions } from "../models/UploadCategoryImageObjectOptions.interface";
import { uploadCategoryImageObject } from "../services/uploadCategoryImageObject";
import { buildCategoryImageFailure } from "./buildCategoryImageOutcome";
import { compressCategoryImageForUpload } from "./compressCategoryImageForUpload";
import { linkUploadedCategoryImage } from "./linkUploadedCategoryImage";

const uploadAndLink = async ({
  categoryId,
  file,
}: UploadCategoryImageObjectOptions): Promise<CategoryImageSaveOutcome> => {
  const compressed =
    await compressCategoryImageForUpload(file);
  if (!compressed) {
    return buildCategoryImageFailure(
      CATEGORY_IMAGE_COPY.COMPRESS_ERROR
    );
  }

  const uploaded = await uploadCategoryImageObject({
    categoryId,
    file: compressed,
  });
  if ("message" in uploaded) {
    return buildCategoryImageFailure(uploaded.message);
  }

  return linkUploadedCategoryImage({
    categoryId,
    imagePath: uploaded.imagePath,
  });
};

export const saveCategoryImage = async (
  options: UploadCategoryImageObjectOptions
): Promise<CategoryImageSaveOutcome> => {
  if (!navigator.onLine) {
    return buildCategoryImageFailure(
      CATEGORY_IMAGE_COPY.OFFLINE_ERROR
    );
  }

  try {
    return await uploadAndLink(options);
  } catch {
    return buildCategoryImageFailure(
      CATEGORY_IMAGE_COPY.UPLOAD_ERROR
    );
  }
};
