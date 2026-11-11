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
