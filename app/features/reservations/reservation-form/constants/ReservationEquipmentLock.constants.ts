export const RESERVATION_EQUIPMENT_LOCK = {
  COMBO: "combo",
  MULTIPLE_ITEMS: "multiple_items",
  NONE: "none",
} as const;

export type ReservationEquipmentLock =
  (typeof RESERVATION_EQUIPMENT_LOCK)[keyof typeof RESERVATION_EQUIPMENT_LOCK];
