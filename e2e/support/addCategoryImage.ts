import { randomUUID } from "node:crypto";
import {
  CATEGORY_IMAGE,
  CATEGORY_IMAGE_MIME_TYPE,
} from "@/app/constants";
import { buildCategoryImagePath } from "@/app/utils/category-image/buildCategoryImagePath";
import {
  E2E_CATEGORY_IMAGE,
  E2E_CATEGORY_IMAGE_ERROR,
} from "../constants/E2eCategoryImage.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";
import { findCategoryId } from "./categoryFixtures";

export const addCategoryImage = async (
  categoryName: string
): Promise<void> => {
  const supabase = createServiceRoleClient();
  const categoryId = await findCategoryId(categoryName);
  const imagePath = buildCategoryImagePath({
    categoryId,
    mimeType: CATEGORY_IMAGE_MIME_TYPE.PNG,
    objectId: randomUUID(),
  });
  const upload = await supabase.storage
    .from(CATEGORY_IMAGE.BUCKET)
    .upload(
      imagePath,
      Buffer.from(E2E_CATEGORY_IMAGE.PNG_BASE64, "base64"),
      {
        contentType: CATEGORY_IMAGE_MIME_TYPE.PNG,
      }
    );

  if (upload.error) {
    return failE2eOperation(
      E2E_CATEGORY_IMAGE_ERROR.OPERATION_ADD,
      upload.error.message
    );
  }

  const link = await supabase
    .from(E2E_CATEGORY_IMAGE.CATEGORY_TABLE)
    .update({
      [E2E_CATEGORY_IMAGE.CATEGORY_COLUMN]: imagePath,
    })
    .eq(E2E_CATEGORY_IMAGE.ID_COLUMN, categoryId);

  if (link.error) {
    return failE2eOperation(
      E2E_CATEGORY_IMAGE_ERROR.OPERATION_ADD,
      link.error.message
    );
  }

  return undefined;
};
