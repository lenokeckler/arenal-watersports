export const UNIT_PHOTOS_BUCKET = "unit-condition-photos";

export const UNIT_PHOTOS_SIGNED_URL_SECONDS = 3600;

export const UNIT_PHOTO_ANGLES = [
  "right_side",
  "left_side",
  "front",
  "bottom",
] as const;

export const UNIT_PHOTO_UPLOAD = {
  ACCEPT: "image/jpeg,image/png,image/webp",
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"],
  MAX_BYTES: 5_242_880,
  PATH_SEPARATOR: "/",
} as const;

export const UNIT_PHOTO_MANAGER_MARK = "encargado_general";

export const UNIT_PHOTOS_ERROR = {
  CHECK_MARK: "check the general manager mark",
  LOAD_PHOTOS: "load the condition photos of the unit",
  LOAD_UNIT: "load the unit of the condition photos",
  RECORD_PHOTO: "record the condition photo of the unit",
  SIGN_PHOTOS: "sign the condition photo urls",
  UPLOAD_PHOTO: "upload the condition photo of the unit",
} as const;
