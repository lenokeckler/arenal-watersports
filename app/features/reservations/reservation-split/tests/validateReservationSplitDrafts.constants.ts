import { RESERVATION_SPLIT_FEEDBACK_COPY } from "../constants/ReservationSplitFeedbackCopy.constants";
import type { ReservationSplitDraftsState } from "../models/ReservationSplitDraftsState.interface";
import type { ReservationSplitErrors } from "../models/ReservationSplitErrors.interface";
import { EXPECTED_SPLIT } from "./ReservationSplit.constants";
import {
  FILLED_DRAFT,
  FILLED_STATE,
  FIRST_DRAFT_KEY,
  QUANTITY_ID,
  UNIT_ID,
  UNTOUCHED_STATE,
} from "./ReservationSplitDrafts.constants";

const TAKES_EVERYTHING_STATE: ReservationSplitDraftsState =
  {
    drafts: [
      {
        ...FILLED_DRAFT,
        quantities: { [QUANTITY_ID]: 4 },
      },
    ],
    unitAssignments: { [UNIT_ID]: FIRST_DRAFT_KEY },
  };

export const DRAFTS_ERROR_CASES: [
  string,
  ReservationSplitDraftsState,
  ReservationSplitErrors,
][] = [
  [
    "a draft without time or equipment",
    UNTOUCHED_STATE,
    {
      departures: [
        {
          items:
            RESERVATION_SPLIT_FEEDBACK_COPY.EQUIPMENT_MIN,
          time: RESERVATION_SPLIT_FEEDBACK_COPY.TIME_REQUIRED,
        },
      ],
    },
  ],
  [
    "an original left without equipment",
    TAKES_EVERYTHING_STATE,
    {
      departures: [{}],
      original:
        RESERVATION_SPLIT_FEEDBACK_COPY.ORIGINAL_EQUIPMENT_MIN,
    },
  ],
  [
    "an original left without people",
    {
      ...FILLED_STATE,
      drafts: [
        {
          ...FILLED_DRAFT,
          peopleCount: EXPECTED_SPLIT.peopleCount,
        },
      ],
    },
    {
      departures: [{}],
      original:
        RESERVATION_SPLIT_FEEDBACK_COPY.ORIGINAL_PEOPLE_MIN,
    },
  ],
];
