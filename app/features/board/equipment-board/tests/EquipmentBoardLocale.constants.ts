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

export const FREE_PERCENT_BOUNDARY_CASES = {
  HALF_ROUNDS_UP: { freeCount: 1, totalCount: 8 },
  INFINITE_FREE: {
    freeCount: Number.POSITIVE_INFINITY,
    totalCount: 5,
  },
  NEGATIVE_TOTAL: { freeCount: 1, totalCount: -4 },
  NONE_FREE: { freeCount: 0, totalCount: 5 },
  NOT_A_NUMBER_FREE: {
    freeCount: Number.NaN,
    totalCount: 5,
  },
  NOT_A_NUMBER_TOTAL: {
    freeCount: 1,
    totalCount: Number.NaN,
  },
} as const;

export const FREE_PERCENT_BOUNDARY_EXPECTED = {
  EMPTY: 0,
  HALF_ROUNDS_UP: 13,
} as const;
