export const UNIT_PHOTOS_BUCKET = "unit-condition-photos";

export const UNIT_PHOTOS_SIGNED_URL_SECONDS = 3600;

export const UNIT_PHOTO_BASIC_ANGLES = [
  "right_side",
  "left_side",
  "front",
  "back",
] as const;

export const UNIT_PHOTO_ANGLES = [
  ...UNIT_PHOTO_BASIC_ANGLES,
  "bottom",
  "extra",
] as const;
