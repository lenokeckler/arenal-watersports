import {
  INVENTORY_COUNT_QUANTITY_FIELD_KEY,
  type InventoryCountQuantityFieldKey,
} from "./InventoryCountHistory.constants";

export const INVENTORY_COUNT_HISTORY_COPY = {
  BACK: "Volver al historial",
  CARD_SUMMARY: (categories: number, units: number) =>
    `${categories} ${categories === 1 ? "categoría" : "categorías"}, ${units} ${units === 1 ? "unidad" : "unidades"}`,
  CATEGORY_SUMMARY: (differences: number) =>
    differences === 0
      ? "Todo coincide"
      : `${differences} ${differences === 1 ? "diferencia" : "diferencias"}`,
  CHANGED: "Cambió",
  CONTENT_HEADING: "Todo lo contado",
  SYSTEM_HAD: (status: string) => `Sistema: ${status}`,
  SYSTEM_HAD_QUANTITY: (system: number) =>
    `Sistema: ${system}`,
  COUNTED_BY: "Levantado por",
  DETAIL_EMPTY_DIFFERENCES:
    "Todo coincidía con lo que el sistema tenía registrado.",
  DETAIL_NOT_FOUND:
    "Ese conteo no existe o ya pasó más de un año.",
  DIFFERENCES_HEADING: "Diferencias con el sistema",
  EMPTY: "Todavía no hay conteos del último año.",
  ERROR_LOAD:
    "No se pudieron cargar los conteos. Intente de nuevo.",
  HEADING: "Historial de conteos",
  INTRO:
    "Los conteos del último año, con su fecha, quién los levantó y cuánto faltaba o sobraba.",
  NEW_COUNT: "Levantar conteo",
  PAGINATION_LABEL: "Paginación del historial de conteos",
  NO_DIFFERENCES: "Sin diferencias",
  NOTES: "Notas",
  NO_NOTES: "Sin notas",
  DETAIL_HEADING: "Conteo del",
  DIFFERENCES: (count: number) =>
    count === 0
      ? "Sin diferencias"
      : count === 1
        ? "1 diferencia"
        : `${count} diferencias`,
  UNIT_DIFFERENCE: (
    code: string,
    categoryName: string,
    systemStatus: string,
    countedStatus: string
  ) =>
    `${code} (${categoryName}): el sistema tenía ${systemStatus} y se contó ${countedStatus}.`,
  QUANTITY_DIFFERENCE: (
    label: string,
    system: number,
    counted: number
  ) => {
    const difference = counted - system;
    const verdict =
      difference < 0
        ? `faltan ${-difference}`
        : `sobran ${difference}`;

    return `${label}: el sistema tenía ${system}, se contó ${counted} (${verdict}).`;
  },
} as const;

export const INVENTORY_COUNT_HISTORY_STATUS_COPY: Record<
  string,
  string
> = {
  available: "Disponible",
  damaged: "Dañada",
  decommissioned: "Dada de baja",
  in_maintenance: "En mantenimiento",
  in_repair: "En reparación",
};

export const INVENTORY_COUNT_HISTORY_QUANTITY_LABEL: Record<
  InventoryCountQuantityFieldKey,
  string
> = {
  [INVENTORY_COUNT_QUANTITY_FIELD_KEY.AVAILABLE]:
    "Disponibles",
  [INVENTORY_COUNT_QUANTITY_FIELD_KEY.DAMAGED]: "Dañadas",
  [INVENTORY_COUNT_QUANTITY_FIELD_KEY.IN_REPAIR]:
    "En reparación",
};
