import type { ReservationCalendarEquipment } from "../models/ReservationCalendarEquipment.interface";

export const DESCRIBED_CATEGORY_EQUIPMENT: ReservationCalendarEquipment =
  {
    categoryId: "equipment-category",
    categoryName: "Kayak",
    quantity: 2,
    unitCode: null,
  };

export const DESCRIBED_EQUIPMENT_LABEL = {
  CATEGORY: "2 × Kayak",
  UNIT: "Kayak K-07",
  UNIT_CODE: "K-07",
} as const;
