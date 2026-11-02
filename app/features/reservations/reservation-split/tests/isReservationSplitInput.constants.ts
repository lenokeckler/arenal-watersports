import {
  VALID_DEPARTURE_INPUT,
  VALID_SPLIT_INPUT,
} from "./ReservationSplit.constants";

export const MALFORMED_INPUT_CASES: [string, unknown][] = [
  ["null", null],
  ["a string", "split"],
  [
    "a missing token",
    { ...VALID_SPLIT_INPUT, expectedUpdatedAt: undefined },
  ],
  [
    "a numeric reservation id",
    { ...VALID_SPLIT_INPUT, reservationId: 7 },
  ],
  [
    "departures that are not an array",
    { ...VALID_SPLIT_INPUT, departures: {} },
  ],
  [
    "a text people count",
    {
      ...VALID_SPLIT_INPUT,
      departures: [
        { ...VALID_DEPARTURE_INPUT, peopleCount: "2" },
      ],
    },
  ],
  [
    "a text quantity",
    {
      ...VALID_SPLIT_INPUT,
      departures: [
        {
          ...VALID_DEPARTURE_INPUT,
          items: [{ itemId: "a", quantity: "1" }],
        },
      ],
    },
  ],
  [
    "an item without id",
    {
      ...VALID_SPLIT_INPUT,
      departures: [
        {
          ...VALID_DEPARTURE_INPUT,
          items: [{ quantity: 1 }],
        },
      ],
    },
  ],
];
