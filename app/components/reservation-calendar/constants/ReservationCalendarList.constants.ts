const RESERVATION_CALENDAR_PAGE_SIZE_OPTIONS = [
  10, 25, 50,
] as const;

export const RESERVATION_CALENDAR_LIST = {
  DEFAULT_PAGE_SIZE:
    RESERVATION_CALENDAR_PAGE_SIZE_OPTIONS[0],
  FIRST_PAGE: 1,
  PAGE_INCREMENT: 1,
  MINIMUM_TOTAL_COUNT: 0,
  PAGE_SIZE_OPTIONS: RESERVATION_CALENDAR_PAGE_SIZE_OPTIONS,
  REQUEST_SEQUENCE_INCREMENT: 1,
} as const;

export const RESERVATION_CALENDAR_LIST_ERROR = {
  INVALID_REQUEST:
    "No fue posible consultar la lista de reservas.",
  LOAD: "No fue posible cargar la lista de reservas. Revise su conexión e inténtelo de nuevo.",
  PAGE_SIZE_READ:
    "No fue posible leer la cantidad de reservas guardada. Se muestra el tamaño predeterminado para esta sesión.",
  SAVE_PAGE_SIZE:
    "No fue posible guardar la cantidad de reservas por página. Puede continuar con el tamaño guardado.",
} as const;
