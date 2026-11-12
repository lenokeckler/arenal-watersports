export const STOCK_CATALOG_COPY = {
  ADJUSTMENT_FAILED_ERROR:
    "No se pudo guardar el conteo. Intente de nuevo.",
  ADJUSTMENT_UNCHANGED_ERROR:
    "El conteo no cambió. Modifique alguna cantidad o la fecha de vencimiento.",
  ALREADY_COUNTED_ERROR:
    "Esta categoría ya tiene un conteo registrado. Use otro motivo para ajustarlo.",
  CATEGORY_NOT_BY_QUANTITY_ERROR:
    "Esta categoría se lleva por unidad y no tiene conteo por cantidad.",
  CATEGORY_NOT_FOUND_ERROR: "No se encontró la categoría.",
  EXPIRY_DATE_INVALID_ERROR:
    "Ingrese una fecha de vencimiento válida.",
  EXPIRY_NOT_APPLICABLE_ERROR:
    "Esta categoría no tiene aviso por vencimiento.",
  NOT_AUTHORIZED_ERROR:
    "Solo administración puede ajustar el conteo.",
  QUANTITY_INVALID_ERROR:
    "Las cantidades deben ser números enteros de cero en adelante.",
  REASON_INVALID_ERROR:
    "Elija un motivo válido para el ajuste.",
  REMOVAL_MUST_LOWER_TOTAL_ERROR:
    "Al botar o perder artículos, la cantidad total debe bajar.",
} as const;
