import { RESERVATION_SPLIT_FIELD_ID } from "../constants/ReservationSplitUi.constants";
import type { ReservationSplitDepartureErrors } from "../models/ReservationSplitDepartureErrors.interface";
import type { ReservationSplitDraft } from "../models/ReservationSplitDraft.interface";

const CONTROL_PREFIX_BY_FIELD: Record<
  keyof ReservationSplitDepartureErrors,
  string
> = {
  time: RESERVATION_SPLIT_FIELD_ID.TIME_PREFIX,
  peopleCount: RESERVATION_SPLIT_FIELD_ID.PEOPLE_PREFIX,
  items: RESERVATION_SPLIT_FIELD_ID.ITEMS_PREFIX,
};

export const resolveReservationSplitInvalidControlId = (
  departures: ReservationSplitDepartureErrors[],
  drafts: ReservationSplitDraft[]
): string | undefined => {
  for (const [index, errors] of departures.entries()) {
    const field = (
      Object.keys(
        CONTROL_PREFIX_BY_FIELD
      ) as (keyof ReservationSplitDepartureErrors)[]
    ).find((name) => errors[name]);
    if (field && drafts[index]) {
      return `${CONTROL_PREFIX_BY_FIELD[field]}${drafts[index].key}`;
    }
  }
  return undefined;
};
