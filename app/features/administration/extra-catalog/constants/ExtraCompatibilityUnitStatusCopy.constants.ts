import {
  INVENTORY_UNIT_STATUS,
  type InventoryUnitStatus,
} from "@/app/constants";

export const EXTRA_COMPATIBILITY_UNIT_STATUS_COPY: Record<
  InventoryUnitStatus,
  string
> = {
  [INVENTORY_UNIT_STATUS.AVAILABLE]: "Disponible",
  [INVENTORY_UNIT_STATUS.DAMAGED]: "Dañada",
  [INVENTORY_UNIT_STATUS.DECOMMISSIONED]: "Dada de baja",
  [INVENTORY_UNIT_STATUS.IN_MAINTENANCE]:
    "En mantenimiento",
  [INVENTORY_UNIT_STATUS.IN_REPAIR]: "En reparación",
  [INVENTORY_UNIT_STATUS.OCCUPIED]: "Ocupada",
};
