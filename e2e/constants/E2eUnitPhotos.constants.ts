export const E2E_UNIT_PHOTOS_SCREENSHOT_BASENAME = {
  MANAGER: "27-unit-photos-manager",
  VIEW: "26-unit-photos",
} as const;

export const E2E_UNIT_PHOTOS = {
  BUCKET: "unit-condition-photos",
  GENERAL_MANAGER_MARK: "encargado_general",
  MIME_TYPE: "image/png",
  PHOTO_BASE64:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg==",
  PHOTO_NAME: "unit-photo.png",
  PHOTO_PATH_SEPARATOR: "/",
  TABLE_MARKS: "worker_marks",
  TABLE_PHOTOS: "unit_condition_photos",
  UNKNOWN_UNIT_ID: "99999999-9999-4999-8999-999999999999",
} as const;

export const E2E_UNIT_PHOTOS_ERROR = {
  OPERATION_ADD: "add the E2E unit photo",
  OPERATION_GRANT_MARK:
    "grant the E2E general manager mark",
  OPERATION_READ: "read the E2E unit photos",
  OPERATION_REMOVE_MARK:
    "remove the E2E general manager mark",
  OPERATION_REMOVE_PHOTOS: "remove the E2E unit photos",
} as const;
