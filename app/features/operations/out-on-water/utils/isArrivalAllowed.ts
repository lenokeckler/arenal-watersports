import { CLOSE_GROUP_ARRIVAL_TIME } from "../constants/CloseGroup.constants";

export const isArrivalAllowed = (
  arrival: Date,
  dispatchedAt: string,
  now: Date
): boolean =>
  arrival.getTime() >= new Date(dispatchedAt).getTime() &&
  arrival.getTime() <=
    now.getTime() + CLOSE_GROUP_ARRIVAL_TIME.TOLERANCE_MS;
