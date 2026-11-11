export const UNIT_PHOTOS_BUCKET = "unit-condition-photos";

export const UNIT_PHOTOS_SIGNED_URL_SECONDS = 3600;

export const UNIT_PHOTO_ANGLES = [
  "right_side",
  "left_side",
  "front",
  "bottom",
] as const;

export const UNIT_PHOTOS_ERROR = {
  LOAD_PHOTOS: "load the condition photos of the unit",
  LOAD_UNIT: "load the unit of the condition photos",
  SIGN_PHOTOS: "sign the condition photo urls",
} as const;
