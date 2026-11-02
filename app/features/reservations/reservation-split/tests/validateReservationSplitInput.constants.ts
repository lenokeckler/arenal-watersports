import { RESERVATION_SPLIT_FEEDBACK_COPY } from "../constants/ReservationSplitFeedbackCopy.constants";
import type { ReservationSplitDepartureErrors } from "../models/ReservationSplitDepartureErrors.interface";
import type { ReservationSplitDepartureInput } from "../models/ReservationSplitDepartureInput.interface";
import { VALID_DEPARTURE_INPUT } from "./ReservationSplit.constants";

export const DEPARTURE_ERROR_CASES: [
  string,
  Partial<ReservationSplitDepartureInput>,
  ReservationSplitDepartureErrors,
][] = [
  [
    "zero people",
    { peopleCount: 0 },
    {
      peopleCount:
        RESERVATION_SPLIT_FEEDBACK_COPY.PEOPLE_MIN,
    },
  ],
  [
    "fractional people",
    { peopleCount: 1.5 },
    {
      peopleCount:
        RESERVATION_SPLIT_FEEDBACK_COPY.PEOPLE_MIN,
    },
  ],
  [
    "empty time",
    { time: "" },
    { time: RESERVATION_SPLIT_FEEDBACK_COPY.TIME_REQUIRED },
  ],
  [
    "hour out of range",
    { time: "24:00" },
    { time: RESERVATION_SPLIT_FEEDBACK_COPY.TIME_INVALID },
  ],
  [
    "minute out of range",
    { time: "10:60" },
    { time: RESERVATION_SPLIT_FEEDBACK_COPY.TIME_INVALID },
  ],
  [
    "time with seconds",
    { time: "10:30:00" },
    { time: RESERVATION_SPLIT_FEEDBACK_COPY.TIME_INVALID },
  ],
  [
    "no equipment",
    { items: [] },
    {
      items: RESERVATION_SPLIT_FEEDBACK_COPY.EQUIPMENT_MIN,
    },
  ],
  [
    "a negative quantity",
    {
      items: [
        { ...VALID_DEPARTURE_INPUT.items[0], quantity: -1 },
      ],
    },
    {
      items: RESERVATION_SPLIT_FEEDBACK_COPY.EQUIPMENT_MIN,
    },
  ],
  [
    "a repeated item",
    {
      items: [
        VALID_DEPARTURE_INPUT.items[0],
        VALID_DEPARTURE_INPUT.items[0],
      ],
    },
    {
      items:
        RESERVATION_SPLIT_FEEDBACK_COPY.EQUIPMENT_DUPLICATE,
    },
  ],
  [
    "zero quantity",
    {
      items: [
        { ...VALID_DEPARTURE_INPUT.items[0], quantity: 0 },
      ],
    },
    {
      items: RESERVATION_SPLIT_FEEDBACK_COPY.EQUIPMENT_MIN,
    },
  ],
];

export const VALID_TIME_CASES = ["00:00", "09:05", "23:59"];
