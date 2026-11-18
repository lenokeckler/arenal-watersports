import type { DispatchUsageMetric } from "@/app/components/dispatch-board/models/DispatchUsageMetric.type";
import type { ActiveInventoryUnitStatus } from "@/app/constants";

export const CATEGORY_UNITS_COPY = {
  BACK_TO_BOARD: "Volver al tablero",
  CLOSE_SHEET: "Cerrar",
  EDIT: "Editar",
  EDIT_UNIT: (code: string): string => `Modificar ${code}`,
  IMPACT_COUNT_LABEL: "Golpes",
  IMPACT_COUNT_LESS: "Quitar un golpe",
  IMPACT_COUNT_MORE: "Agregar un golpe",
  IMPACT_COUNT_SHORT: (count: number): string =>
    `✕ ${count}`,
  IMPACT_COUNT_SPOKEN: (count: number): string =>
    `Golpes: ${count}`,
  INFO_CUSTOMER: "Cliente",
  INFO_DEPARTED: "Salió",
  INFO_PEOPLE: "Personas",
  INFO_RADIO: "Radio",
  INFO_RADIO_CHANNEL: (channel: number): string =>
    `Canal ${channel}`,
  INFO_RADIO_NONE: "Sin canal",
  INFO_RETURNS: "Regresa",
  INFO_UNIT: (code: string): string =>
    `Ver quién lleva ${code}`,
  MODIFY_ERROR:
    "No se pudo guardar el cambio. Intente de nuevo.",
  MODIFY_FUEL: "Gasolina",
  MODIFY_INVALID: "Revise los datos e intente de nuevo.",
  MODIFY_NOT_CORRECTABLE:
    "Esta unidad no se puede modificar ahora.",
  MODIFY_SAVE: "Guardar",
  MODIFY_SAVING: "Guardando…",
  MODIFY_TITLE: (code: string): string =>
    `Modificar · ${code}`,
  MODIFY_USAGE_INVALID:
    "Escriba una lectura válida, con hasta dos decimales.",
  RECEIVE: "Recibir unidad",
  UPDATE_ALREADY_CLOSED: "Este grupo ya regresó.",
  UPDATE_ERROR:
    "No se pudo guardar el cambio. Intente de nuevo.",
  UPDATE_INVALID:
    "Revise las horas y el canal e intente de nuevo.",
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
  RETRY: "Reintentar",
  UNITS_COUNT: (unitCount: number): string =>
    unitCount === 1 ? "1 unidad" : `${unitCount} unidades`,
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

export const CATEGORY_UNIT_USAGE_COPY: Record<
  DispatchUsageMetric,
  (value: string) => string
> = {
  engine_hours: (value) => `${value} h`,
  kilometers: (value) => `${value} km`,
};

export const CATEGORY_UNIT_MODIFY_USAGE_LABEL: Record<
  DispatchUsageMetric,
  string
> = {
  engine_hours: "Horas de motor",
  kilometers: "Kilómetros",
};
