import type { PhotoUnit } from "@/app/services/equipment/models/PhotoUnit.interface";
import type { PhotoUnitRow } from "@/app/services/equipment/models/PhotoUnitRow.interface";

export const LIST_PHOTO_ROW: PhotoUnitRow = {
  category: {
    id: "jet",
    image_path: null,
    name: "Jet Ski",
  },
  code: "JS-1",
  id: "unit",
  impact_count: 1,
  photos: [
    { angle: "bottom" },
    { angle: "front" },
    { angle: "right_side" },
  ],
};

const JET_COUNT = 14;

export const LIST_UNITS: PhotoUnit[] = [
  ...Array.from({ length: JET_COUNT }, (_, index) => ({
    basicCount: 1,
    categoryId: "jet",
    categoryName: "Jet Ski",
    code: `JS-${index}`,
    id: `jet-${index}`,
    imagePath: null,
    impactCount: 0,
  })),
  {
    basicCount: 0,
    categoryId: "kayak",
    categoryName: "Kayak",
    code: "KD-1",
    id: "kayak-1",
    imagePath: null,
    impactCount: 0,
  },
];

export const PHOTO_COVER = "/images/categories/jet-ski.jpg";
