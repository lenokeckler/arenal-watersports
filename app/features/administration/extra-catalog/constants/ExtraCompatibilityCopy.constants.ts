export const EXTRA_COMPATIBILITY_COPY = {
  APPLIES_TO_ONE_UNIT: "Aplica a 1 unidad",
  APPLIES_TO_UNITS: (unitCount: number): string =>
    `Aplica a ${unitCount} unidades`,
  CATEGORY_NOT_FOUND_ERROR:
    "No se encontró la categoría. Es posible que otra persona la haya eliminado.",
  FORBIDDEN_ERROR:
    "No tiene permiso para definir las embarcaciones de un extra.",
  INVALID_SELECTION_ERROR:
    "La selección incluye una embarcación que no pertenece a esta categoría.",
  NOT_FOUND_ERROR:
    "No se encontró el extra o una de las embarcaciones. Es posible que otra persona la haya eliminado.",
  NO_UNITS: "Sin embarcaciones",
} as const;
