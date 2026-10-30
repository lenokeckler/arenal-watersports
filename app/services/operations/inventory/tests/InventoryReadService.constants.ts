import { PostgrestError } from "@supabase/supabase-js";
import {
  INVENTORY_TRACKING_MODE,
  INVENTORY_UNIT_STATUS,
  PAGINATION,
} from "@/app/constants";
import type {
  InventorySummaryDatabaseRow,
  InventoryUnitDatabaseRow,
} from "../models/InventoryReadModels.interface";
import { INVENTORY_RANGE_ERROR } from "../constants/InventoryRangeError.constants";

export const INVENTORY_SERVICE_USER = {
  id: "11111111-0000-0000-0000-000000000001",
};

export const INVENTORY_SERVICE_UNIT_CATEGORY_ID =
  "aaaaaaaa-0000-0000-0000-000000000001";
export const INVENTORY_SERVICE_QUANTITY_CATEGORY_ID =
  "aaaaaaaa-0000-0000-0000-000000000002";
export const INVENTORY_SERVICE_INVALID_CATEGORY_ID =
  "not-a-uuid";
export const INVENTORY_SERVICE_INVALID_PAGE_INDICES = [
  -1,
  1.5,
  Number.NaN,
  Number.POSITIVE_INFINITY,
  Number.MAX_VALUE,
] as const;
export const INVENTORY_SERVICE_NORMALIZED_PAGE_INDICES = [
  PAGINATION.DEFAULT_PAGE,
  PAGINATION.ONE_PAGE,
  PAGINATION.DEFAULT_PAGE,
  PAGINATION.DEFAULT_PAGE,
  PAGINATION.DEFAULT_PAGE,
] as const;
export const INVENTORY_SERVICE_OUT_OF_RANGE_PAGE_INDEX = 999;
export const INVENTORY_SERVICE_OUT_OF_RANGE_OPERATION =
  "read inventory test range";
export const INVENTORY_SERVICE_OUT_OF_RANGE_STATUS = 416;
export const INVENTORY_SERVICE_OUT_OF_RANGE_STATUS_TEXT =
  "Range Not Satisfiable";

export const INVENTORY_SERVICE_UNIT_SUMMARY_ROW: InventorySummaryDatabaseRow =
  {
    category_id: INVENTORY_SERVICE_UNIT_CATEGORY_ID,
    category_name: "Service jet ski",
    is_reservable: true,
    quantity_available: 2,
    quantity_damaged: 1,
    quantity_in_maintenance: 1,
    quantity_in_repair: 0,
    quantity_total: 4,
    tracking_mode: INVENTORY_TRACKING_MODE.BY_UNIT,
  };

export const INVENTORY_SERVICE_QUANTITY_SUMMARY_ROW: InventorySummaryDatabaseRow =
  {
    category_id: INVENTORY_SERVICE_QUANTITY_CATEGORY_ID,
    category_name: "Service life jacket",
    is_reservable: false,
    quantity_available: 10,
    quantity_damaged: 2,
    quantity_in_maintenance: 0,
    quantity_in_repair: 3,
    quantity_total: 15,
    tracking_mode: INVENTORY_TRACKING_MODE.BY_QUANTITY,
  };

export const INVENTORY_SERVICE_ACTIVE_UNITS: InventoryUnitDatabaseRow[] =
  [
    {
      id: "bbbbbbbb-0000-0000-0000-000000000001",
      code: "JET-01",
      effective_status: INVENTORY_UNIT_STATUS.AVAILABLE,
      recorded_status: INVENTORY_UNIT_STATUS.AVAILABLE,
    },
  ];

export const INVENTORY_SERVICE_SUMMARY_RESULT = {
  data: [INVENTORY_SERVICE_UNIT_SUMMARY_ROW],
  error: null,
  count: PAGINATION.DEFAULT_PAGE_SIZE + PAGINATION.ONE_PAGE,
};

export const INVENTORY_SERVICE_OUT_OF_RANGE_RESULT = {
  count: null,
  data: null,
  error: new PostgrestError({
    code: INVENTORY_RANGE_ERROR.OUT_OF_RANGE,
    details: "",
    hint: "",
    message: "Requested range not satisfiable",
  }),
  status: INVENTORY_SERVICE_OUT_OF_RANGE_STATUS,
  statusText: INVENTORY_SERVICE_OUT_OF_RANGE_STATUS_TEXT,
  success: false,
} as const;

export const INVENTORY_SERVICE_REDIRECT_SIGNAL =
  "Inventory test redirect signal.";

export const INVENTORY_SERVICE_POSTGREST_ERROR = {
  code: "42501",
  details: "",
  hint: "",
  message: "permission denied",
};
