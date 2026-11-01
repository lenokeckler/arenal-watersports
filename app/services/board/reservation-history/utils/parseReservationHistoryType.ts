import { RESERVATION_TYPE } from "@/app/constants";
import type {
  NullableRef,
  NullableUndefined,
  ReservationType,
} from "@/app/types";
import { readFirstSearchParam } from "./readFirstSearchParam";

export const parseReservationHistoryType = (
  rawParam: NullableUndefined<string | string[]>
): NullableRef<ReservationType> => {
  const candidate = readFirstSearchParam(rawParam);

  return (
    Object.values(RESERVATION_TYPE).find(
      (reservationType) => reservationType === candidate
    ) ?? null
  );
};
