import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import type {
  ActiveInventoryUnitDatabaseRow,
  InventoryUnitDatabaseRow,
} from "@/app/services/operations/inventory/models/InventoryReadModels.interface";
import type { InventoryUnit } from "../models/InventoryUnit.interface";

export const ACTIVE_INVENTORY_UNIT_ROWS: ActiveInventoryUnitDatabaseRow[] =
  [
    {
      id: "bbbbbbbb-0000-0000-0000-000000000001",
      code: "JET-01",
      effective_status: INVENTORY_UNIT_STATUS.AVAILABLE,
      recorded_status: INVENTORY_UNIT_STATUS.AVAILABLE,
    },
    {
      id: "bbbbbbbb-0000-0000-0000-000000000002",
      code: "JET-02",
      effective_status: INVENTORY_UNIT_STATUS.DAMAGED,
      recorded_status: INVENTORY_UNIT_STATUS.DAMAGED,
    },
    {
      id: "bbbbbbbb-0000-0000-0000-000000000003",
      code: "JET-03",
      effective_status: INVENTORY_UNIT_STATUS.IN_REPAIR,
      recorded_status: INVENTORY_UNIT_STATUS.IN_REPAIR,
    },
    {
      id: "bbbbbbbb-0000-0000-0000-000000000004",
      code: "JET-04",
      effective_status:
        INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
      recorded_status: INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
    },
    {
      id: "bbbbbbbb-0000-0000-0000-000000000005",
      code: "JET-05",
      effective_status: INVENTORY_UNIT_STATUS.OCCUPIED,
      recorded_status: INVENTORY_UNIT_STATUS.AVAILABLE,
    },
  ];

export const DECOMMISSIONED_INVENTORY_UNIT_ROW: InventoryUnitDatabaseRow =
  {
    id: "bbbbbbbb-0000-0000-0000-000000000006",
    code: "JET-06",
    effective_status: INVENTORY_UNIT_STATUS.DECOMMISSIONED,
    recorded_status: INVENTORY_UNIT_STATUS.DECOMMISSIONED,
  };

export const EXPECTED_MAPPED_INVENTORY_UNITS: InventoryUnit[] =
  [
    {
      id: "bbbbbbbb-0000-0000-0000-000000000001",
      code: "JET-01",
      status: INVENTORY_UNIT_STATUS.AVAILABLE,
    },
    {
      id: "bbbbbbbb-0000-0000-0000-000000000002",
      code: "JET-02",
      status: INVENTORY_UNIT_STATUS.DAMAGED,
    },
    {
      id: "bbbbbbbb-0000-0000-0000-000000000003",
      code: "JET-03",
      status: INVENTORY_UNIT_STATUS.IN_REPAIR,
    },
    {
      id: "bbbbbbbb-0000-0000-0000-000000000004",
      code: "JET-04",
      status: INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
    },
    {
      id: "bbbbbbbb-0000-0000-0000-000000000005",
      code: "JET-05",
      status: INVENTORY_UNIT_STATUS.OCCUPIED,
    },
  ];

export const INVALID_INVENTORY_UNIT_ROWS: InventoryUnitDatabaseRow[] =
  [
    { ...ACTIVE_INVENTORY_UNIT_ROWS[0], id: null },
    { ...ACTIVE_INVENTORY_UNIT_ROWS[0], code: null },
    {
      ...ACTIVE_INVENTORY_UNIT_ROWS[0],
      effective_status: null,
    },
    {
      ...ACTIVE_INVENTORY_UNIT_ROWS[0],
      effective_status: "unknown",
    },
  ];
