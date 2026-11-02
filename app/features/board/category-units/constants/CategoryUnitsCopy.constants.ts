import {
  STRING,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";

export const CATEGORY_UNITS_COPY = {
  BACK_TO_BOARD: "Volver al tablero",
  CUSTOMER_LINE: (customerName: string): string =>
    `La lleva ${customerName}`,
  EMPTY_BODY:
    "Cuando administración registre unidades en esta categoría, aparecerán aquí con su estado.",
  EMPTY_TITLE: "Esta categoría todavía no tiene unidades",
  ERROR_BODY:
    "Revise su conexión e intente de nuevo. Mientras no cargue, no asuma que hay unidades libres.",
  ERROR_TITLE: "No se pudieron cargar las unidades",
  FALLBACK_TITLE: "Unidades de la categoría",
  GROUP_SWITCH_LABEL: "Categorías del mismo grupo",
  LIST_LABEL: (categoryName: string): string =>
    `Unidades de ${categoryName}`,
  LOADING_ANNOUNCEMENT:
    "Cargando las unidades de la categoría.",
  METADATA_TITLE: "Unidades — Arenal Water Sports",
  NOT_FOUND_BODY:
    "Es posible que la categoría ya no esté activa o que el enlace no sea correcto.",
  NOT_FOUND_TITLE: "Esta categoría no está en el tablero",
  PAGINATION_NAV_LABEL: "Paginación de unidades",
  RESERVATION_LINE: (
    reservationCode: string,
    reservationWindow: string
  ): string =>
    `Reserva ${reservationCode} ${STRING.MIDDLE_DOT} ${reservationWindow}`,
  RETRY: "Reintentar",
  RETURNS_AT: (time: string): string =>
    `Regresa a las ${time}`,
  RETURNS_ON: (date: string, time: string): string =>
    `Regresa el ${date} a las ${time}`,
  UNITS_COUNT: (unitCount: number): string =>
    unitCount === 1 ? "1 unidad" : `${unitCount} unidades`,
  WINDOW_SEPARATOR: " a ",
} as const;

export const CATEGORY_UNIT_STATUS_LABEL: Record<
  ActiveInventoryUnitStatus,
  string
> = {
  available: "Disponible",
  damaged: "Dañada",
  in_maintenance: "En mantenimiento",
  in_repair: "En reparación",
  occupied: "Ocupada",
};
