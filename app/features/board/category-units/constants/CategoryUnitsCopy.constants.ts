import {
  STRING,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";

export const CATEGORY_UNITS_COPY = {
  BACK_TO_BOARD: "Volver al tablero",
  CUSTOMER_LINE: (customerName: string): string =>
    `La lleva ${customerName}`,
  DISPATCH_ACTION: "Despachar",
  DISPATCH_CANCEL: "Cancelar",
  DISPATCH_SELECT_UNIT: (code: string): string =>
    `Seleccionar ${code} para despachar`,
  DISPATCH_SELECTED: (count: number): string =>
    count === 1
      ? "1 unidad seleccionada"
      : `${count} unidades seleccionadas`,
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
  OVERDUE_CHIP: "Retrasada",
  OVERDUE_RETURNS_AT: (time: string): string =>
    `Debía regresar a las ${time}`,
  OVERDUE_RETURNS_ON: (
    date: string,
    time: string
  ): string => `Debía regresar el ${date} a las ${time}`,
  PICKER_COMMITTED: (count: number): string =>
    `Comprometidas: ${count}`,
  PICKER_DISPATCH: (customerName: string): string =>
    `Despachar la reserva de ${customerName}`,
  PICKER_EMPTY:
    "Hoy no hay reservas pendientes con equipo de esta categoría. Un combo se despacha desde la lista del día.",
  PICKER_ERROR:
    "No se pudieron cargar las reservas. Cierre la hoja e intente de nuevo.",
  PICKER_FITS: (fits: number, picked: number): string =>
    `Caben ${fits} de las ${picked} unidades escogidas.`,
  PICKER_LIST_LABEL: "Reservas de hoy con esta categoría",
  PICKER_LOADING: "Buscando las reservas de hoy…",
  PICKER_TITLE: "Escoja la reserva que sale",
  PAGINATION_NAV_LABEL: "Paginación de unidades",
  PAGINATION_NEXT: "Siguiente",
  PAGINATION_PAGE_OF: (
    page: number,
    pageCount: number
  ): string => `${page} de ${pageCount}`,
  PAGINATION_PREVIOUS: "Anterior",
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
