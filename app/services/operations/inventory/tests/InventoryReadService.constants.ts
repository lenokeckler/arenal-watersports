import {
  INVENTORY_TRACKING_MODE,
  INVENTORY_UNIT_STATUS,
  PAGINATION,
} from "@/app/constants";
import type {
  InventorySummaryDatabaseRow,
  InventoryUnitDatabaseRow,
} from "../models/InventoryReadModels.interface";

export const INVENTORY_SERVICE_USER = {
  id: "11111111-0000-0000-0000-000000000001",
};

export const INVENTORY_SERVICE_UNIT_CATEGORY_ID =
  "aaaaaaaa-0000-0000-0000-000000000001";
export const INVENTORY_SERVICE_QUANTITY_CATEGORY_ID =
  "aaaaaaaa-0000-0000-0000-000000000002";

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

export const INVENTORY_SERVICE_REDIRECT_SIGNAL =
  "Inventory test redirect signal.";

export const INVENTORY_SERVICE_POSTGREST_ERROR = {
  code: "42501",
  details: "",
  hint: "",
  message: "permission denied",
};
