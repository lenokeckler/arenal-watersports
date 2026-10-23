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
      dispatchId: item.dispatch_id,
      fuelIn: item.fuel_in,
      fuelOut: item.fuel_out,
      quantity: item.quantity,
      unitCode: item.unit?.code ?? null,
      usageIn: item.usage_in,
      usageOut: item.usage_out,
    },
  ];
};

export const mapReservationDetailEquipment = (
  source: ReservationDetailReservationSource
): ReservationDetailEquipment[] =>
  source.reservation_items.flatMap(mapEquipmentItem);
