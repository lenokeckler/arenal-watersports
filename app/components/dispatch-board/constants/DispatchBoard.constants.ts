export const OPERATIONS_AREA = "operaciones";

export const DISPATCH_BOARD_PAGINATION = {
  FIRST_PAGE: 1,
  MAX_OFFSET: 2_147_483_647,
  PAGE_SIZE: 50,
  QUERY_KEY: "pagina",
} as const;

export const DISPATCH_BOARD_MAX_PAGE =
  Math.floor(
    DISPATCH_BOARD_PAGINATION.MAX_OFFSET /
      DISPATCH_BOARD_PAGINATION.PAGE_SIZE
  ) + DISPATCH_BOARD_PAGINATION.FIRST_PAGE;

export const OPERATIONS_ACCESS_ERROR =
  "The current worker cannot access operations.";

export const DISPATCH_BOARD_COPY = {
  EMPTY:
    "No hay reservas pendientes de despachar para hoy.",
  ERROR: "No se pudieron cargar las reservas pendientes.",
  FORBIDDEN: "No tienes acceso a las operaciones.",
  HEADING: "Reservas pendientes de despachar",
  NEXT_PAGE: "Siguiente",
  PAGE_LABEL: "Paginación de reservas",
  PREVIOUS_PAGE: "Anterior",
  RESERVATION_SEPARATOR: " · ",
} as const;

export const DISPATCH_BOARD_HEADING_ID =
  "reservas-pendientes-de-despachar";

export const DISPATCH_BOARD_DATE_FORMAT = {
  HOUR: "2-digit",
  MINUTE: "2-digit",
} as const;

export const DISPATCH_BOARD_PAGE_PATTERN = /^\d+$/;

export const DISPATCH_BOARD_QUERY = {
  SEPARATOR: "?",
} as const;
