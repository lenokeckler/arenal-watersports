import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";

const combo: ReservationPredefinedCombo = {
  audience: "national",
  currency: "CRC",
  id: "combo-persisted",
  items: [
    {
      categoryId: "category-guide",
      categoryName: "Lancha",
      isGuideOnly: true,
      quantity: 1,
    },
  ],
  name: "Combo de tour",
  packagePrice: 25000,
};

const comboWithoutGuide: ReservationPredefinedCombo = {
  ...combo,
  id: "combo-without-guide",
  items: combo.items.map((item) => ({
    ...item,
    isGuideOnly: false,
  })),
  name: "Combo de alquiler",
};

export const PREDEFINED_COMBO_FORM_TEST = {
  ID: "combo-persisted",
  INVALID_ID: "unknown-combo",
  COMBO: combo,
  COMBO_WITHOUT_GUIDE: comboWithoutGuide,
} as const;
