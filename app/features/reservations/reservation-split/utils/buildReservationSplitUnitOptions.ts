import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitDraft } from "../models/ReservationSplitDraft.interface";
import type { ReservationSplitUnitOption } from "../models/ReservationSplitUnitOption.interface";

export const buildReservationSplitUnitOptions = (
  originalTime: string,
  drafts: ReservationSplitDraft[]
): ReservationSplitUnitOption[] => [
  {
    key: null,
    label:
      RESERVATION_SPLIT_UI_COPY.UNIT_OPTION_ORIGINAL(
        originalTime
      ),
  },
  ...drafts.map((draft, index) => ({
    key: draft.key,
    label: RESERVATION_SPLIT_UI_COPY.UNIT_OPTION_DEPARTURE(
      index +
        RESERVATION_SPLIT_DRAFT.FIRST_NEW_DEPARTURE_NUMBER,
      draft.time ||
        RESERVATION_SPLIT_UI_COPY.UNIT_OPTION_NO_TIME
    ),
  })),
];
