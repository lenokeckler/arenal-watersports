import {
  CATEGORY_IMAGE,
  CATEGORY_IMAGE_MIME_TYPE,
} from "@/app/constants";
import type { CategoryImageRow } from "../models/CategoryImageRow.type";

export const IMAGE_CATEGORY_ID =
  "c1000001-0000-0000-0000-000000000001";

export const OTHER_IMAGE_CATEGORY_ID =
  "c1000001-0000-0000-0000-000000000002";

export const ADMIN_WORKER_ID = "fake-admin-worker-id";

export const CURRENT_IMAGE_PATH = `${IMAGE_CATEGORY_ID}/aaaaaaaa-0000-0000-0000-000000000001.webp`;

export const NEW_IMAGE_PATH = `${IMAGE_CATEGORY_ID}/aaaaaaaa-0000-0000-0000-000000000002.png`;

export const VALID_SET_INPUT = {
  categoryId: IMAGE_CATEGORY_ID,
  imagePath: NEW_IMAGE_PATH,
};

export const NON_RECORD_INPUTS: unknown[] = [
  undefined,
  null,
  "text",
  42,
  [VALID_SET_INPUT],
];

export const INVALID_SET_INPUTS: unknown[] = [
  {},
  { categoryId: IMAGE_CATEGORY_ID },
  { imagePath: NEW_IMAGE_PATH },
  { categoryId: "not-a-uuid", imagePath: NEW_IMAGE_PATH },
  { categoryId: 7, imagePath: NEW_IMAGE_PATH },
  {
    categoryId: OTHER_IMAGE_CATEGORY_ID,
    imagePath: NEW_IMAGE_PATH,
  },
  { categoryId: IMAGE_CATEGORY_ID, imagePath: 7 },
];

export const OBJECT_SIZE_BYTES = 2_048;

export const OBJECT_SIZE_ABOVE_MAX_BYTES =
  CATEGORY_IMAGE.MAX_FILE_SIZE_BYTES + 1;

export const UNSUPPORTED_OBJECT_TYPE = "image/gif";

export const VALID_OBJECT_INFO = {
  contentType: CATEGORY_IMAGE_MIME_TYPE.PNG,
  size: OBJECT_SIZE_BYTES,
};

export const buildCategoryImageRow = (
  overrides: Partial<CategoryImageRow> = {}
): CategoryImageRow => ({
  id: IMAGE_CATEGORY_ID,
  image_path: CURRENT_IMAGE_PATH,
  name: "Kayak doble",
  ...overrides,
});

export const STORAGE_ERROR = { message: "storage failure" };

export const FILE_NAME = "kayak.png";

export const UPLOAD_OBJECT_ID =
  "bbbbbbbb-0000-0000-0000-000000000001";

export const EXPECTED_UPLOAD_PATH = `${IMAGE_CATEGORY_ID}/${UPLOAD_OBJECT_ID}.png`;

export const buildImageFile = (
  overrides: { size?: number; type?: string } = {}
): File => {
  const {
    size = OBJECT_SIZE_BYTES,
    type = CATEGORY_IMAGE_MIME_TYPE.PNG,
  } = overrides;

  return new File([new Uint8Array(size)], FILE_NAME, {
    type,
  });
};
