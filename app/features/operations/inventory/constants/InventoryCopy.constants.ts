import {
  INVENTORY_UNIT_STATUS,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";

export const INVENTORY_COPY = {
  AVAILABLE: "Disponibles",
  BACK_TO_INVENTORY: "Volver al inventario",
  CATEGORIES: "Categorías",
  CATEGORY_EMPTY:
    "Esta categoría no tiene unidades activas.",
  DAMAGED: "Dañados",
  DESCRIPTION:
    "Consulte las categorías y el estado actual de los artículos.",
  IN_MAINTENANCE: "En mantenimiento",
  QUANTITY_ALERT: (
    available: number,
    minimum: number,
    missing: number
  ) =>
    `Hay ${available} y el mínimo es ${minimum}. Faltan ${missing} para llegar al mínimo.`,
  EXPIRY_ALERT: (
    expiryDate: string,
    daysToExpiry: number,
    isExpired: boolean,
    anticipationDays: number
  ) =>
    isExpired
      ? `Venció el ${expiryDate}. Hay que reponerlo.`
      : `Vence el ${expiryDate}, en ${daysToExpiry} ${daysToExpiry === 1 ? "día" : "días"}. Se avisa ${anticipationDays} días antes.`,
  EXPIRY_ALERTS_TITLE: "Avisos por vencimiento",
  QUANTITY_ALERTS_TITLE: "Avisos por cantidad mínima",
  COUNT_HISTORY: "Historial de conteos",
  NEW_COUNT: "Levantar conteo",
  IN_REPAIR: "En reparación",
  IN_USE: "En uso",
  INVENTORY_EMPTY:
    "No hay categorías de inventario para mostrar.",
  LOAD_ERROR_DESCRIPTION:
    "No se pudo cargar el inventario. Inténtelo de nuevo.",
  LOAD_ERROR_TITLE: "No se pudo cargar el inventario",
  NEXT_PAGE: "Siguiente",
  PAGE: "Página",
  PAGE_OF: "de",
  PAGINATION_LABEL: "Paginación del inventario",
  PREVIOUS_PAGE: "Anterior",
  QUANTITY_TRACKING: "Control por cantidad",
  RETRY: "Reintentar",
  TITLE: "Inventario",
  TOTAL: "Total",
  UNIT_TRACKING: "Control por unidad",
  UNITS: "Unidades",
  ADJUSTMENT_TITLE: "Ajustar inventario",
  ADJUSTMENT_DESCRIPTION:
    "Registre las cantidades actuales y el motivo del cambio.",
  MOVEMENT_HISTORY_TITLE: "Historial de ajustes",
  MOVEMENT_HISTORY_EMPTY:
    "Esta categoría todavía no tiene ajustes registrados.",
  MOVEMENT_DATE: "Fecha",
  MOVEMENT_REASON: "Motivo",
  MOVEMENT_AUTHOR: "Registrado por",
  MOVEMENT_AVAILABLE: "Disponibles",
  MOVEMENT_DAMAGED: "Dañados",
  MOVEMENT_REPAIR: "En reparación",
  ADJUSTMENT_REASON_LABEL: "Motivo del ajuste",
  ADJUSTMENT_REASON_REQUIRED:
    "Seleccione el motivo del ajuste.",
  ADJUSTMENT_REASON_PLACEHOLDER: "Seleccione un motivo",
  ADJUSTMENT_SUCCESS: "El ajuste quedó registrado.",
  ADJUSTMENT_SUBMIT: "Guardar ajuste",
  ADJUSTMENT_PENDING: "Guardando…",
  ADJUSTMENT_AVAILABLE: "Cantidad disponible",
  ADJUSTMENT_DAMAGED: "Cantidad dañada",
  ADJUSTMENT_REPAIR: "Cantidad en reparación",
  REASON_COUNT_CORRECTION: "Corrección de conteo",
  REASON_DISCARDED: "Botado",
  REASON_INITIAL_COUNT: "Conteo inicial",
  REASON_LOST: "Perdido",
} as const;

export const INVENTORY_UNIT_STATUS_COPY: Record<
  ActiveInventoryUnitStatus,
  string
> = {
  [INVENTORY_UNIT_STATUS.AVAILABLE]: "Disponible",
  [INVENTORY_UNIT_STATUS.DAMAGED]: "Dañada",
  [INVENTORY_UNIT_STATUS.IN_MAINTENANCE]:
    INVENTORY_COPY.IN_MAINTENANCE,
  [INVENTORY_UNIT_STATUS.IN_REPAIR]:
    INVENTORY_COPY.IN_REPAIR,
  [INVENTORY_UNIT_STATUS.OCCUPIED]: INVENTORY_COPY.IN_USE,
} as const;
