import type { ReservationSplitDraft } from "../models/ReservationSplitDraft.interface";
import type { ReservationSplitDraftsState } from "../models/ReservationSplitDraftsState.interface";
import type { ReservationSplitRemainder } from "../models/ReservationSplitRemainder.interface";
import {
  QUANTITY_ITEM_ROW,
  UNIT_ITEM_ROW,
} from "./ReservationSplit.constants";

export const QUANTITY_ID = QUANTITY_ITEM_ROW.id;
export const UNIT_ID = UNIT_ITEM_ROW.id;
export const FIRST_DRAFT_KEY = "1";

export const EMPTY_DRAFT: ReservationSplitDraft = {
  key: FIRST_DRAFT_KEY,
  peopleCount: 1,
  quantities: { [QUANTITY_ID]: 0 },
  time: "",
};

export const FILLED_DRAFT: ReservationSplitDraft = {
  ...EMPTY_DRAFT,
  peopleCount: 2,
  quantities: { [QUANTITY_ID]: 3 },
  time: "15:00",
};

export const UNTOUCHED_STATE: ReservationSplitDraftsState =
  {
    drafts: [EMPTY_DRAFT],
    unitAssignments: { [UNIT_ID]: null },
  };

export const FILLED_STATE: ReservationSplitDraftsState = {
  ...UNTOUCHED_STATE,
  drafts: [FILLED_DRAFT],
};

export const UNIT_MOVED_STATE: ReservationSplitDraftsState =
  {
    ...UNTOUCHED_STATE,
    unitAssignments: { [UNIT_ID]: FIRST_DRAFT_KEY },
  };

export const REMAINDER_CASES = [
  [
    "an untouched draft",
    UNTOUCHED_STATE,
    {
      items: { [QUANTITY_ID]: 4, [UNIT_ID]: 1 },
      peopleCount: 5,
      pieces: 5,
    },
  ],
  [
    "people and pieces taken",
    FILLED_STATE,
    {
      items: { [QUANTITY_ID]: 1, [UNIT_ID]: 1 },
      peopleCount: 4,
      pieces: 2,
    },
  ],
  [
    "a unit moved to a departure",
    UNIT_MOVED_STATE,
    {
      items: { [QUANTITY_ID]: 4, [UNIT_ID]: 0 },
      peopleCount: 5,
      pieces: 4,
    },
  ],
] as const;

export const CAN_ADD_CASES: [
  string,
  ReservationSplitRemainder,
  boolean,
][] = [
  [
    "people and pieces to spare",
    { items: {}, peopleCount: 2, pieces: 2 },
    true,
  ],
  [
    "a single person left",
    { items: {}, peopleCount: 1, pieces: 5 },
    false,
  ],
  [
    "a single piece left",
    { items: {}, peopleCount: 5, pieces: 1 },
    false,
  ],
];
