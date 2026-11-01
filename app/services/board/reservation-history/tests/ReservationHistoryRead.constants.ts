import {
  HISTORY_CANCELLED_RECORD_ROW,
  HISTORY_EMPTY_FILTERS,
  HISTORY_LIST_ROW,
  HISTORY_REQUESTED_PAGE_INDEX,
} from "./ReservationHistory.constants";

export const HISTORY_READ_QUERY = {
  filters: HISTORY_EMPTY_FILTERS,
  hasInvertedDateRange: false,
  pageIndex: HISTORY_REQUESTED_PAGE_INDEX,
} as const;

export const HISTORY_READ_INVERTED_QUERY = {
  ...HISTORY_READ_QUERY,
  hasInvertedDateRange: true,
} as const;

export const HISTORY_READ_LIST_RESPONSE = {
  data: [HISTORY_LIST_ROW],
  error: null,
};

export const HISTORY_READ_EMPTY_RESPONSE = {
  data: [],
  error: null,
};

export const HISTORY_READ_RECORD_RESPONSE = {
  data: [HISTORY_CANCELLED_RECORD_ROW],
  error: null,
};

export const HISTORY_READ_MALFORMED_ID =
  "not-a-reservation-id";

export const HISTORY_READ_CATEGORY_ROWS = [
  {
    id: "c1a7d3f0-1b2c-4d5e-8f90-a1b2c3d4e5f6",
    name: "Kayak",
  },
  {
    id: "d2b8e4a1-2c3d-4e6f-9a01-b2c3d4e5f607",
    name: "Tabla",
  },
];

export const HISTORY_READ_CATEGORY_RESPONSE = {
  data: HISTORY_READ_CATEGORY_ROWS,
  error: null,
};

export const HISTORY_READ_DATABASE_ERROR = {
  code: "42501",
  details: "",
  hint: "",
  message: "permission denied",
  name: "PostgrestError",
} as const;

export const HISTORY_READ_ERROR_RESPONSE = {
  data: null,
  error: HISTORY_READ_DATABASE_ERROR,
};

export const HISTORY_READ_CATEGORY_FILTER_METHODS = [
  "eq",
  "neq",
  "in",
  "filter",
] as const;

export const HISTORY_READ_SUPABASE_ERROR_NAME =
  "SupabaseQueryError";

export const HISTORY_READ_ACCESS_REFUSED = new Error(
  "access refused"
);

export const HISTORY_READ_UPPERCASE_ID =
  HISTORY_CANCELLED_RECORD_ROW.id.toUpperCase();

export const HISTORY_READ_REJECTED_IDS = [
  "",
  "0f6b1c1e-62f1-4e71-8d4d-2f3c7a9e5b1",
  "0f6b1c1e-62f1-4e71-8d4d-2f3c7a9e5b100",
  "0f6b1c1e-62f1-4e71-8d4d-2f3c7a9e5bzz",
  "0f6b1c1e62f14e718d4d2f3c7a9e5b10",
  "{0f6b1c1e-62f1-4e71-8d4d-2f3c7a9e5b10}",
  " 0f6b1c1e-62f1-4e71-8d4d-2f3c7a9e5b10",
  "0f6b1c1e-62f1-4e71-8d4d-2f3c7a9e5b10\n",
] as const;
