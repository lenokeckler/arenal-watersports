import {
  UNIT_EFFECTIVE_STATUS,
  type UnitEffectiveStatus,
} from "./UnitStatus.constants";

export const UNIT_STATUS_LABEL: Record<
  UnitEffectiveStatus,
  string
> = {
  [UNIT_EFFECTIVE_STATUS.AVAILABLE]: "Disponible",
  [UNIT_EFFECTIVE_STATUS.DAMAGED]: "Dañada",
  [UNIT_EFFECTIVE_STATUS.DECOMMISSIONED]: "Dada de baja",
  [UNIT_EFFECTIVE_STATUS.IN_MAINTENANCE]:
    "En mantenimiento",
  [UNIT_EFFECTIVE_STATUS.IN_REPAIR]: "En reparación",
  [UNIT_EFFECTIVE_STATUS.OCCUPIED]: "Ocupada",
};
