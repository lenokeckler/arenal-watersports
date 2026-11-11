import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { EquipmentCategoryRow } from "../models/EquipmentCategoryRow.type";

export const FAKE_CATEGORY_ID = "fake-category-id";
const FAKE_WORKER_ID = "fake-worker-id";
const FAKE_TIMESTAMP = "2026-01-01T00:00:00.000Z";

export const DEFAULT_EQUIPMENT_CATEGORY_ROW: EquipmentCategoryRow =
  {
    alert_expiry_days: null,
    alert_min_quantity: null,
    can_be_damaged: false,
    consumes_fuel: false,
    created_at: FAKE_TIMESTAMP,
    created_by: FAKE_WORKER_ID,
    default_duration_minutes: null,
    deposit_crc: null,
    deposit_usd: null,
    group_name: "Kayaks",
    guide_only: false,
    has_condition_photos: false,
    has_motor: false,
    id: FAKE_CATEGORY_ID,
    is_reservable: true,
    name: "Kayak doble",
    status: CATEGORY_STATUS.ACTIVE,
    tracking_mode: CATEGORY_TRACKING_MODE.BY_UNIT,
    units_are_interchangeable: false,
    updated_at: FAKE_TIMESTAMP,
    updated_by: FAKE_WORKER_ID,
    usage_metric: null,
  };
