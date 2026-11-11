import type { ReservationDetailExtra } from "../models/ReservationDetailExtra.interface";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";
import { RESERVATION_DETAIL_DATA_COPY } from "../constants/ReservationDetailDataCopy.constants";

const mapExtraItem = (
  item: ReservationDetailReservationSource["reservation_items"][number]
): ReservationDetailExtra[] =>
  item.extra_id === null
    ? []
    : [
        {
          categoryName: item.category?.name ?? null,
          name:
            item.extra?.name ??
            RESERVATION_DETAIL_DATA_COPY.MISSING_RELATED_NAME,
          quantity: item.quantity,
        },
      ];

export const mapReservationDetailExtras = (
  source: ReservationDetailReservationSource
): ReservationDetailExtra[] =>
  source.reservation_items.flatMap(mapExtraItem);
