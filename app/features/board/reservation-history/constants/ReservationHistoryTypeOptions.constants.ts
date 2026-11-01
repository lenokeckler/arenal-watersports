import { RESERVATION_TYPE, STRING } from "@/app/constants";
import type { ReservationType } from "@/app/types";
import type { ReservationHistoryFilterOption } from "../models/ReservationHistoryFilterOption.interface";
import { RESERVATION_HISTORY_COPY } from "./ReservationHistoryCopy.constants";

export const RESERVATION_HISTORY_TYPE_LABEL = {
  [RESERVATION_TYPE.COMBO]: "Combo",
  [RESERVATION_TYPE.RENTAL]: "Renta",
  [RESERVATION_TYPE.TOUR]: "Tour",
} as const satisfies Record<ReservationType, string>;

export const RESERVATION_HISTORY_TYPE_ORDER = [
  RESERVATION_TYPE.RENTAL,
  RESERVATION_TYPE.TOUR,
  RESERVATION_TYPE.COMBO,
] as const satisfies readonly ReservationType[];

export const RESERVATION_HISTORY_ALL_OPTION: ReservationHistoryFilterOption =
  {
    key: STRING.Empty,
    label: RESERVATION_HISTORY_COPY.FILTER_ALL,
    value: STRING.Empty,
  };

export const RESERVATION_HISTORY_TYPE_OPTIONS: readonly ReservationHistoryFilterOption[] =
  [
    RESERVATION_HISTORY_ALL_OPTION,
    ...RESERVATION_HISTORY_TYPE_ORDER.map((type) => ({
      key: type,
      label: RESERVATION_HISTORY_TYPE_LABEL[type],
      value: type,
    })),
  ];
