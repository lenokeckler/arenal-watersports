export const EQUIPMENT_BOARD_COPY = {
  EMPTY_BODY:
    "Cuando administración active una categoría reservable, aparecerá aquí con su equipo.",
  EMPTY_TITLE: "No hay equipo reservable que mostrar",
  ERROR_BODY:
    "Revise su conexión e intente de nuevo. Mientras no cargue, no asuma que hay equipo libre.",
  ERROR_TITLE: "No se pudo cargar el tablero",
  FREE_LABEL_PLURAL: "libres",
  FREE_LABEL_SINGULAR: "libre",
  FREE_OF_TOTAL: (
    free: number,
    total: number,
    freeLabel: string
  ): string => `${free} / ${total} ${freeLabel}`,
  GRID_LABEL: "Categorías de equipo reservable",
  LOADING_ANNOUNCEMENT: "Cargando el tablero de equipo.",
  METADATA_TITLE: "Tablero — Arenal Water Sports",
  PAGE_DESCRIPTION:
    "Qué se puede alquilar en este momento.",
  PAGE_TITLE: "Tablero",
  PER_UNIT_CHIP: "Por unidad",
  PER_UNIT_CHIP_SHORT: "Unidad",
  RETRY: "Reintentar",
} as const;
