import {
  VALID_DEPARTURE_INPUT,
  VALID_SPLIT_INPUT,
} from "./ReservationSplit.constants";

const NOT_A_UUID = "not-a-uuid";

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
          items: [
            {
              itemId: VALID_DEPARTURE_INPUT.items[0].itemId,
              quantity: "1",
            },
          ],
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
  [
    "a reservation id that is not a uuid",
    { ...VALID_SPLIT_INPUT, reservationId: NOT_A_UUID },
  ],
  [
    "an item id that is not a uuid",
    {
      ...VALID_SPLIT_INPUT,
      departures: [
        {
          ...VALID_DEPARTURE_INPUT,
          items: [{ itemId: NOT_A_UUID, quantity: 1 }],
        },
      ],
    },
  ],
];
