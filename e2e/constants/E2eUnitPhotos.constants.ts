export const E2E_UNIT_PHOTOS_SCREENSHOT_BASENAME = {
  TEMPORARY_GUIDE: "27-unit-photos-temporary-guide",
  VIEW: "26-unit-photos",
} as const;

export const E2E_UNIT_PHOTOS = {
  BUCKET: "unit-condition-photos",
  GUIDE_LIFETIME_MS: 86_400_000,
  GUIDE_NATIONAL_ID: "1-0000-0166",
  MIME_TYPE: "image/png",
  PHOTO_BASE64:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg==",
  PHOTO_NAME: "unit-photo.png",
  PHOTO_PATH_SEPARATOR: "/",
  TABLE_PHOTOS: "unit_condition_photos",
  TABLE_WORKERS: "workers",
  UNKNOWN_UNIT_ID: "99999999-9999-4999-8999-999999999999",
} as const;

export const E2E_UNIT_PHOTOS_ERROR = {
  OPERATION_ADD: "add the E2E unit photo",
  OPERATION_READ: "read the E2E unit photos",
  OPERATION_SET_GUIDE:
    "change the E2E temporary guide flag",
  OPERATION_REMOVE_PHOTOS: "remove the E2E unit photos",
} as const;
