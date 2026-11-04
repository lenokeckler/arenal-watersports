import type { ReservationDetailEquipment } from "../models/ReservationDetailEquipment.interface";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";

const mapEquipmentItem = (
  item: ReservationDetailReservationSource["reservation_items"][number]
): ReservationDetailEquipment[] => {
  if (
    item.extra_id !== null ||
    (item.unit_id === null && item.category_id === null)
  ) {
    return [];
  }

  return [
    {
      categoryName:
        item.unit?.category?.name ??
        item.category?.name ??
        null,
      quantity: item.quantity,
      unitCode: item.unit?.code ?? null,
    },
  ];
};

export const mapReservationDetailEquipment = (
  source: ReservationDetailReservationSource
): ReservationDetailEquipment[] =>
  source.reservation_items.flatMap(mapEquipmentItem);
