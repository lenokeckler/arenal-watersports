import type { ReservationDetailExtra } from "../models/ReservationDetailExtra.interface";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";

const mapExtraItem = (
  item: ReservationDetailReservationSource["reservation_items"][number]
): ReservationDetailExtra[] =>
  item.extra_id === null || item.extra === null
    ? []
    : [
        {
          categoryName: item.category?.name ?? null,
          name: item.extra.name,
          quantity: item.quantity,
        },
      ];

export const mapReservationDetailExtras = (
  source: ReservationDetailReservationSource
): ReservationDetailExtra[] =>
  source.reservation_items.flatMap(mapExtraItem);
