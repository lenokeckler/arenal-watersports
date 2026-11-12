import { INVENTORY_UNIT_STATUS } from "@/app/constants";

export const INVENTORY_UNIT_CONDITION_STATUSES = [
  INVENTORY_UNIT_STATUS.AVAILABLE,
  INVENTORY_UNIT_STATUS.DAMAGED,
  INVENTORY_UNIT_STATUS.IN_REPAIR,
] as const;

export type InventoryUnitConditionStatus =
  (typeof INVENTORY_UNIT_CONDITION_STATUSES)[number];

export const INVENTORY_UNIT_CONDITION_RESULT = {
  CHANGED: "changed",
  FAILED: "failed",
  INVALID_STATUS: "invalid_status",
  NO_CHANGE: "no_change",
  NOT_ALLOWED: "not_allowed",
  NOT_CHANGEABLE: "not_changeable",
  NOT_FOUND: "not_found",
  OCCUPIED: "occupied",
} as const;

export type InventoryUnitConditionResult =
  (typeof INVENTORY_UNIT_CONDITION_RESULT)[keyof typeof INVENTORY_UNIT_CONDITION_RESULT];

export const INVENTORY_UNIT_CONDITION_ACTION_LABEL: Record<
  InventoryUnitConditionStatus,
  string
> = {
  [INVENTORY_UNIT_STATUS.AVAILABLE]: "Marcar disponible",
  [INVENTORY_UNIT_STATUS.DAMAGED]: "Marcar dañada",
  [INVENTORY_UNIT_STATUS.IN_REPAIR]: "Marcar en reparación",
};

export const INVENTORY_UNIT_CONDITION_MESSAGE: Record<
  InventoryUnitConditionResult,
  string
> = {
  [INVENTORY_UNIT_CONDITION_RESULT.CHANGED]:
    "Se cambió el estado de la unidad.",
  [INVENTORY_UNIT_CONDITION_RESULT.FAILED]:
    "No se pudo cambiar el estado. Intente de nuevo.",
  [INVENTORY_UNIT_CONDITION_RESULT.INVALID_STATUS]:
    "Ese estado no se puede escoger aquí.",
  [INVENTORY_UNIT_CONDITION_RESULT.NO_CHANGE]:
    "La unidad ya tiene ese estado.",
  [INVENTORY_UNIT_CONDITION_RESULT.NOT_ALLOWED]:
    "Solo operaciones o administración cambian el estado de una unidad.",
  [INVENTORY_UNIT_CONDITION_RESULT.NOT_CHANGEABLE]:
    "Una unidad en mantenimiento o dada de baja no cambia de estado aquí.",
  [INVENTORY_UNIT_CONDITION_RESULT.NOT_FOUND]:
    "Esa unidad ya no existe.",
  [INVENTORY_UNIT_CONDITION_RESULT.OCCUPIED]:
    "La unidad está en una salida abierta. Cierre la salida primero.",
};
