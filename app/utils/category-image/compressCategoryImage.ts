import { CATEGORY_IMAGE_COMPRESSION } from "@/app/constants";
import { browserCategoryImagePrimitives } from "./browserCategoryImagePrimitives";
import { buildCompressedCategoryImageName } from "./buildCompressedCategoryImageName";
import { CategoryImageCompressionError } from "./CategoryImageCompressionError";
import type { CategoryImageCompressionPrimitives } from "./models/CategoryImageCompressionPrimitives.interface";
import { scaleCategoryImageDimensions } from "./scaleCategoryImageDimensions";

export const compressCategoryImage = async (
  file: File,
  primitives: CategoryImageCompressionPrimitives = browserCategoryImagePrimitives
): Promise<File> => {
  const decoded = await primitives.decode(file);
  const dimensions = scaleCategoryImageDimensions(decoded);

  for (const mimeType of CATEGORY_IMAGE_COMPRESSION.PREFERRED_MIME_TYPES) {
    const blob = await primitives.encode({
      decoded,
      dimensions,
      mimeType,
      quality: CATEGORY_IMAGE_COMPRESSION.QUALITY,
    });

    if (blob && blob.type === mimeType) {
      return new File(
        [blob],
        buildCompressedCategoryImageName(
          file.name,
          mimeType
        ),
        { type: mimeType }
      );
    }
  }

  throw new CategoryImageCompressionError(
    CATEGORY_IMAGE_COMPRESSION.ENCODE_FAILED_MESSAGE
  );
};
