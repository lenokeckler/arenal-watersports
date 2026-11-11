import { VALID_POSTPONEMENT_INPUT } from "./ReservationPostponementInput.constants";

const NOT_A_UUID = "not-a-uuid";
const UNKNOWN_CAUSE = "fog";
const VALID_READING = VALID_POSTPONEMENT_INPUT.readings[0];

export const MALFORMED_INPUT_CASES: [string, unknown][] = [
  ["null", null],
  ["a string", "postpone"],
  [
    "a missing token",
    {
      ...VALID_POSTPONEMENT_INPUT,
      expectedUpdatedAt: undefined,
    },
  ],
  [
    "a numeric reservation id",
    { ...VALID_POSTPONEMENT_INPUT, reservationId: 7 },
  ],
  [
    "a reservation id that is not a uuid",
    {
      ...VALID_POSTPONEMENT_INPUT,
      reservationId: NOT_A_UUID,
    },
  ],
  [
    "an unknown cause",
    { ...VALID_POSTPONEMENT_INPUT, cause: UNKNOWN_CAUSE },
  ],
  [
    "a missing cause",
    { ...VALID_POSTPONEMENT_INPUT, cause: undefined },
  ],
  [
    "a numeric date",
    { ...VALID_POSTPONEMENT_INPUT, date: 20350414 },
  ],
  [
    "a numeric time",
    { ...VALID_POSTPONEMENT_INPUT, time: 930 },
  ],
  [
    "a missing reason",
    { ...VALID_POSTPONEMENT_INPUT, reason: undefined },
  ],
  [
    "readings that are not an array",
    { ...VALID_POSTPONEMENT_INPUT, readings: {} },
  ],
  [
    "a reading without item id",
    {
      ...VALID_POSTPONEMENT_INPUT,
      readings: [{ fuelIn: 1, usageIn: 1 }],
    },
  ],
  [
    "a reading item id that is not a uuid",
    {
      ...VALID_POSTPONEMENT_INPUT,
      readings: [{ ...VALID_READING, itemId: NOT_A_UUID }],
    },
  ],
  [
    "a reading without a fuel key",
    {
      ...VALID_POSTPONEMENT_INPUT,
      readings: [
        { itemId: VALID_READING.itemId, usageIn: 1 },
      ],
    },
  ],
  [
    "a reading without a usage key",
    {
      ...VALID_POSTPONEMENT_INPUT,
      readings: [
        { itemId: VALID_READING.itemId, fuelIn: 1 },
      ],
    },
  ],
  [
    "a null reading",
    { ...VALID_POSTPONEMENT_INPUT, readings: [null] },
  ],
  [
    "a missing date",
    { ...VALID_POSTPONEMENT_INPUT, date: undefined },
  ],
  [
    "a missing time",
    { ...VALID_POSTPONEMENT_INPUT, time: undefined },
  ],
  [
    "a missing reservation id",
    {
      ...VALID_POSTPONEMENT_INPUT,
      reservationId: undefined,
    },
  ],
  ["an array", [VALID_POSTPONEMENT_INPUT]],
  [
    "a text fuel reading",
    {
      ...VALID_POSTPONEMENT_INPUT,
      readings: [{ ...VALID_READING, fuelIn: "3" }],
    },
  ],
  [
    "a text usage reading",
    {
      ...VALID_POSTPONEMENT_INPUT,
      readings: [{ ...VALID_READING, usageIn: "1250" }],
    },
  ],
  [
    "a NaN fuel reading",
    {
      ...VALID_POSTPONEMENT_INPUT,
      readings: [{ ...VALID_READING, fuelIn: NaN }],
    },
  ],
  [
    "an infinite usage reading",
    {
      ...VALID_POSTPONEMENT_INPUT,
      readings: [{ ...VALID_READING, usageIn: Infinity }],
    },
  ],
  [
    "an empty token",
    { ...VALID_POSTPONEMENT_INPUT, expectedUpdatedAt: "" },
  ],
  [
    "a token that is not a timestamp",
    {
      ...VALID_POSTPONEMENT_INPUT,
      expectedUpdatedAt: "nope",
    },
  ],
];

export const UPPERCASE_RESERVATION_ID =
  VALID_POSTPONEMENT_INPUT.reservationId.toUpperCase();
export const UPPERCASE_ITEM_ID =
  VALID_READING.itemId.toUpperCase();
export const UNDECLARED_KEY = "isAdmin";
