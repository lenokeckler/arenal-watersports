export const CATEGORY_IMAGE_MIME_TYPE = {
  JPEG: "image/jpeg",
  PNG: "image/png",
  WEBP: "image/webp",
} as const;

export type CategoryImageMimeType =
  (typeof CATEGORY_IMAGE_MIME_TYPE)[keyof typeof CATEGORY_IMAGE_MIME_TYPE];

export const CATEGORY_IMAGE = {
  BUCKET: "category-images",
  EXTENSION_BY_MIME: {
    [CATEGORY_IMAGE_MIME_TYPE.JPEG]: "jpg",
    [CATEGORY_IMAGE_MIME_TYPE.PNG]: "png",
    [CATEGORY_IMAGE_MIME_TYPE.WEBP]: "webp",
  },
  EXTENSION_SEPARATOR: ".",
  HTTPS_URL_PROTOCOL: "https:",
  LOCAL_HOSTNAMES: ["localhost", "127.0.0.1"],
  MAX_FILE_SIZE_BYTES: 5_242_880,
  MIME_TYPES: [
    CATEGORY_IMAGE_MIME_TYPE.JPEG,
    CATEGORY_IMAGE_MIME_TYPE.PNG,
    CATEGORY_IMAGE_MIME_TYPE.WEBP,
  ],
  PATH_SEPARATOR: "/",
  PUBLIC_OBJECT_PATH: "/storage/v1/object/public",
  REMOTE_PATH_WILDCARD: "**",
} as const;

export const CATEGORY_IMAGE_FILE_ISSUE = {
  EMPTY: "empty",
  TOO_LARGE: "too_large",
  UNSUPPORTED_TYPE: "unsupported_type",
} as const;

export type CategoryImageFileIssue =
  (typeof CATEGORY_IMAGE_FILE_ISSUE)[keyof typeof CATEGORY_IMAGE_FILE_ISSUE];

export const CATEGORY_IMAGE_REMOTE_PROTOCOL = {
  HTTP: "http",
  HTTPS: "https",
} as const;
