export const INVENTORY_STOCK_ADJUSTMENT_REASON = {
  COUNT_CORRECTION: "count_correction",
  DISCARDED: "discarded",
  INITIAL_COUNT: "initial_count",
  LOST: "lost",
} as const;

export type InventoryStockAdjustmentReason =
  (typeof INVENTORY_STOCK_ADJUSTMENT_REASON)[keyof typeof INVENTORY_STOCK_ADJUSTMENT_REASON];

export const INVENTORY_STOCK_ADJUSTMENT_STATUS = {
  ERROR: "error",
  SUCCESS: "success",
} as const;

export type InventoryStockAdjustmentStatus =
  (typeof INVENTORY_STOCK_ADJUSTMENT_STATUS)[keyof typeof INVENTORY_STOCK_ADJUSTMENT_STATUS];

export const INVENTORY_STOCK_ADJUSTMENT_COPY = {
  ADJUSTMENT_UNCHANGED_ERROR:
    "El ajuste no cambia las cantidades actuales.",
  ALREADY_COUNTED_ERROR:
    "La categorÃ­a ya tiene un conteo inicial registrado.",
  CATEGORY_NOT_BY_QUANTITY_ERROR:
    "Esta categorÃ­a se controla por unidad y no por cantidad.",
  CATEGORY_NOT_FOUND_ERROR:
    "No se encontrÃ³ la categorÃ­a.",
  EXPIRY_DATE_INVALID_ERROR:
    "Ingrese una fecha de vencimiento válida.",
  EXPIRY_NOT_APPLICABLE_ERROR:
    "Esta categorÃ­a no tiene aviso por vencimiento.",
  NOT_AUTHORIZED_ERROR:
    "No tiene permiso para ajustar el inventario en este modo.",
  QUANTITY_INVALID_ERROR:
    "Las cantidades deben ser nÃºmeros enteros de cero en adelante.",
  REASON_INVALID_ERROR:
    "Elija un motivo vÃ¡lido para el ajuste.",
  REMOVAL_MUST_LOWER_TOTAL_ERROR:
    "Al botar o perder artÃ­culos, la cantidad total debe bajar.",
  RESERVED_QUANTITY_ERROR:
    "La cantidad disponible no puede ser menor que las reservas comprometidas.",
  SAVE_FAILED_ERROR:
    "No se pudo guardar el ajuste. IntÃ©ntelo de nuevo.",
} as const;

export const INVENTORY_STOCK_ADJUSTMENT_DATABASE_ERROR = {
  ALREADY_COUNTED:
    "La categoria ya tiene un conteo registrado",
  CATEGORY_NOT_BY_QUANTITY:
    "Una categoria identificada por unidad no lleva conteo de stock",
  EXPIRY_NOT_APPLICABLE:
    "La categoria no tiene aviso por vencimiento",
  INVALID_QUANTITY:
    "Las cantidades no pueden ser negativas",
  INVALID_REASON: "Motivo de ajuste no valido",
  NO_CHANGE: "El ajuste no cambia nada",
  RESERVED_QUANTITY:
    "La cantidad disponible no puede quedar por debajo de las reservas comprometidas",
  TOTAL_MUST_DECREASE:
    "Botar o perder baja la cantidad total",
} as const;
