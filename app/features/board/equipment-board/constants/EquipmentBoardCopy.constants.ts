export const EQUIPMENT_BOARD_COPY = {
  EMPTY_BODY:
    "Cuando administración active una categoría reservable, aparecerá aquí con su equipo.",
  EMPTY_TITLE: "No hay equipo reservable que mostrar",
  ERROR_BODY:
    "Revise su conexión e intente de nuevo. Mientras no cargue, no asuma que hay equipo libre.",
  ERROR_TITLE: "No se pudo cargar el tablero",
  FREE_LABEL: "libres",
  IN_USE_OF_TOTAL: (inUse: number, total: number): string =>
    `${inUse} en uso de ${total}`,
  LOADING_ANNOUNCEMENT: "Cargando el tablero de equipo.",
  METADATA_TITLE: "Tablero — Arenal Water Sports",
  PAGE_DESCRIPTION:
    "Esto es lo que hay libre ahora mismo en cada categoría de equipo reservable.",
  PAGE_TITLE: "Tablero",
  RETRY: "Reintentar",
} as const;
