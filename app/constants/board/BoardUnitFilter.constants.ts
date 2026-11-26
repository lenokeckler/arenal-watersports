export const BOARD_UNIT_FILTER = {
  ALL: "all",
  AVAILABLE: "available",
  DAMAGED: "damaged",
  MAINTENANCE: "maintenance",
} as const;

export type BoardUnitFilter =
  (typeof BOARD_UNIT_FILTER)[keyof typeof BOARD_UNIT_FILTER];

export const BOARD_UNIT_FILTER_ORDER: readonly BoardUnitFilter[] =
  [
    BOARD_UNIT_FILTER.ALL,
    BOARD_UNIT_FILTER.AVAILABLE,
    BOARD_UNIT_FILTER.MAINTENANCE,
    BOARD_UNIT_FILTER.DAMAGED,
  ];

export const BOARD_UNIT_FILTER_QUERY_PARAM = "status";

export const BOARD_UNIT_FILTER_MENU_ID =
  "board-unit-filter-menu";

export const BOARD_UNIT_FILTER_TRIGGER_ATTRIBUTES: Record<
  string,
  string
> = {
  command: "toggle-popover",
  commandfor: BOARD_UNIT_FILTER_MENU_ID,
};

export const BOARD_UNIT_FILTER_STATUSES: Record<
  BoardUnitFilter,
  readonly string[]
> = {
  [BOARD_UNIT_FILTER.ALL]: [],
  [BOARD_UNIT_FILTER.AVAILABLE]: ["available"],
  [BOARD_UNIT_FILTER.DAMAGED]: ["damaged"],
  [BOARD_UNIT_FILTER.MAINTENANCE]: [
    "in_maintenance",
    "in_repair",
  ],
};

export const BOARD_UNIT_FILTER_COPY = {
  LABELS: {
    [BOARD_UNIT_FILTER.ALL]: "Todas",
    [BOARD_UNIT_FILTER.AVAILABLE]: "Disponibles",
    [BOARD_UNIT_FILTER.DAMAGED]: "Dañadas",
    [BOARD_UNIT_FILTER.MAINTENANCE]: "En mantenimiento",
  } satisfies Record<BoardUnitFilter, string>,
  NAV_LABEL: "Mostrar unidades",
  TRIGGER_LABEL: (current: string): string =>
    `Mostrar unidades: ${current}`,
} as const;
