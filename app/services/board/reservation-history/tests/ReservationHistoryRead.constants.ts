import { PAGINATION } from "@/app/constants";
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

export const HISTORY_READ_EXPECTED_ARGUMENTS = {
  p_page_index: HISTORY_REQUESTED_PAGE_INDEX,
  p_page_size: PAGINATION.DEFAULT_PAGE_SIZE,
};

export const HISTORY_READ_EXPECTED_PAGE = {
  items: [
    {
      attendedByName: HISTORY_LIST_ROW.created_by_name,
      customerName: HISTORY_LIST_ROW.customer_name,
      equipmentNames: HISTORY_LIST_ROW.equipment_names,
      guideNames: HISTORY_LIST_ROW.guide_names,
      id: HISTORY_LIST_ROW.id,
      startsAt: HISTORY_LIST_ROW.starts_at,
      status: HISTORY_LIST_ROW.status,
    },
  ],
  pageCount: PAGINATION.ONE_PAGE,
  pageIndex: HISTORY_LIST_ROW.page_index,
  totalCount: HISTORY_LIST_ROW.total_count,
};

export const HISTORY_READ_EXPECTED_EMPTY_PAGE = {
  items: [],
  pageCount: PAGINATION.ONE_PAGE,
  pageIndex: PAGINATION.DEFAULT_PAGE,
  totalCount: PAGINATION.ZERO_RESULTS,
};

export const HISTORY_READ_EXPECTED_RECORD = {
  cancellationReason:
    HISTORY_CANCELLED_RECORD_ROW.cancellation_reason,
  createdBy: {
    at: HISTORY_CANCELLED_RECORD_ROW.created_at,
    name: HISTORY_CANCELLED_RECORD_ROW.created_by_name,
  },
  customerName: HISTORY_CANCELLED_RECORD_ROW.customer_name,
  equipmentNames:
    HISTORY_CANCELLED_RECORD_ROW.equipment_names,
  guideNames: HISTORY_CANCELLED_RECORD_ROW.guide_names,
  id: HISTORY_CANCELLED_RECORD_ROW.id,
  startsAt: HISTORY_CANCELLED_RECORD_ROW.starts_at,
  status: HISTORY_CANCELLED_RECORD_ROW.status,
  updatedBy: {
    at: HISTORY_CANCELLED_RECORD_ROW.updated_at,
    name: HISTORY_CANCELLED_RECORD_ROW.updated_by_name,
  },
};
