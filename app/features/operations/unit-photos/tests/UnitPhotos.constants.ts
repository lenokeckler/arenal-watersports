import type { UnitPhotosData } from "../models/UnitPhotosData.interface";

export const PHOTO_UNIT_ID =
  "eeeeeeee-0000-0000-0000-000000000001";

export const PHOTO_URL =
  "https://storage.test/unit-condition-photos/right_side?token=abc";

export const PHOTOS_DATA: UnitPhotosData = {
  canManage: false,
  slots: [
    { angle: "right_side", url: PHOTO_URL },
    { angle: "left_side", url: null },
    { angle: "front", url: null },
    { angle: "bottom", url: null },
  ],
  unit: {
    categoryName: "Jet ski",
    code: "JS-1",
    id: PHOTO_UNIT_ID,
    impactCount: 3,
  },
};
