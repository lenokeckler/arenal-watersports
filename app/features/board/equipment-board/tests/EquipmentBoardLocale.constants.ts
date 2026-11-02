export const SPANISH_CATEGORY_NAME = {
  ACCENTED_FIRST: "Árbol",
  ENYE: "Ñandú",
  N_PLAIN: "Nube",
  O_PLAIN: "Ola",
  SECOND: "Bote",
} as const;

export const SPANISH_CATEGORY_ORDER = [
  SPANISH_CATEGORY_NAME.ACCENTED_FIRST,
  SPANISH_CATEGORY_NAME.SECOND,
  SPANISH_CATEGORY_NAME.N_PLAIN,
  SPANISH_CATEGORY_NAME.ENYE,
  SPANISH_CATEGORY_NAME.O_PLAIN,
] as const;

export const SPANISH_GROUP_NAME = {
  ACCENT_LOWER: "pá",
  ACCENT_UPPER: "PÁ",
  ENYE_LOWER: "ñandú",
  ENYE_UPPER: "ÑANDÚ",
  PADDED: "Kayak ",
  PLAIN: "pa",
  UNPADDED: "kayak",
} as const;

export const OCCUPANCY_BOUNDARY_CASES = {
  HALF_ROUNDS_UP: { inUse: 1, total: 8 },
  NEGATIVE_TOTAL: { inUse: 1, total: -4 },
  NOT_A_NUMBER_IN_USE: { inUse: Number.NaN, total: 5 },
  NOT_A_NUMBER_TOTAL: { inUse: 1, total: Number.NaN },
  ZERO_IN_USE: { inUse: 0, total: 5 },
} as const;

export const OCCUPANCY_BOUNDARY_EXPECTED = {
  EMPTY: 0,
  HALF_ROUNDS_UP: 13,
} as const;
