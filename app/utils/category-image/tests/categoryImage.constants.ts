import {
  CATEGORY_IMAGE,
  CATEGORY_IMAGE_MIME_TYPE,
} from "@/app/constants";

export const CATEGORY_ID =
  "c1000001-0000-0000-0000-000000000001";

export const OTHER_CATEGORY_ID =
  "c1000001-0000-0000-0000-000000000002";

export const OBJECT_ID =
  "aaaaaaaa-0000-0000-0000-000000000001";

export const VALID_IMAGE_PATH = `${CATEGORY_ID}/${OBJECT_ID}.webp`;

export const NON_PATH_INPUTS: unknown[] = [
  undefined,
  null,
  42,
  {},
  [VALID_IMAGE_PATH],
];

export const INVALID_IMAGE_PATHS: string[] = [
  `${OTHER_CATEGORY_ID}/${OBJECT_ID}.webp`,
  `${CATEGORY_ID}/${OBJECT_ID}.gif`,
  `${CATEGORY_ID}/${OBJECT_ID}`,
  `${CATEGORY_ID}/not-a-uuid.webp`,
  `${CATEGORY_ID}/${OBJECT_ID}.webp.png`,
  `${CATEGORY_ID}/nested/${OBJECT_ID}.webp`,
  `${CATEGORY_ID}${OBJECT_ID}.webp`,
  `/${CATEGORY_ID}/${OBJECT_ID}.webp`,
];

export const EXPECTED_EXTENSION_BY_MIME = [
  [CATEGORY_IMAGE_MIME_TYPE.JPEG, "jpg"],
  [CATEGORY_IMAGE_MIME_TYPE.PNG, "png"],
  [CATEGORY_IMAGE_MIME_TYPE.WEBP, "webp"],
] as const;

export const FILE_SIZE_ABOVE_MAX_BYTES =
  CATEGORY_IMAGE.MAX_FILE_SIZE_BYTES + 1;

export const ALLOWED_FILE_SIZE_BYTES = 1_024;

export const UNSUPPORTED_MIME_TYPE = "image/gif";

export const LOCAL_SUPABASE_URL = "http://127.0.0.1:54321";

export const HOSTED_SUPABASE_URL =
  "https://abc.supabase.co";

export const UNPARSEABLE_SUPABASE_URL = "not a url";

export const EXPECTED_PUBLIC_PATHNAME =
  "/storage/v1/object/public/category-images/**";
