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
  INFO_DEPARTED: "Inicio",
  INFO_PEOPLE: "Personas",
  INFO_RADIO: "Radio",
  INFO_RADIO_CHANNEL: (channel: number): string =>
    `Canal ${channel}`,
  INFO_RADIO_NONE: "Sin canal",
  INFO_RETURNS: "Fin",
  INFO_UNIT: (code: string): string =>
    `Ver quién lleva ${code}`,
  MAINTENANCE_IN_SERVICE: "Disponible",
  MAINTENANCE_IN_WORKSHOP: "En mantenimiento",
  MAINTENANCE_LABEL: "Estado de la unidad",
  MAINTENANCE_OCCUPIED:
    "Esta unidad está en el agua. Recíbala antes de ponerla en mantenimiento.",
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
  RETURN_BADGE: (time: string): string => `Fin: ${time}`,
  RECEIVE: "Recibir unidad",
  RECEIVE_DAMAGE_LABEL: "Qué se dañó",
  RECEIVE_DUE: (
    customerName: string,
    time: string
  ): string => `${customerName} · Fin: ${time}`,
  RECEIVE_ERROR:
    "No se pudo recibir la unidad. Intente de nuevo.",
  RECEIVE_FUEL: "Gasolina que quedó",
  RECEIVE_INVALID: "Revise los datos e intente de nuevo.",
  RECEIVE_NOT_OUT: "Esta unidad ya no está en el agua.",
  RECEIVE_ORDER: "¿Todo en orden?",
  RECEIVE_ORDER_DAMAGED: "Hay daños",
  RECEIVE_ORDER_OK: "Sí, todo bien",
  RECEIVE_PREVIOUS: (value: string): string =>
    `Antes: ${value}`,
  RECEIVE_SAVING: "Recibiendo…",
  RECEIVE_TITLE: (code: string): string =>
    `Recibir · ${code}`,
  STATUS_DAMAGE_CAUSE: "Causa",
  STATUS_DAMAGE_COMPLETE: "Completar reporte",
  STATUS_DAMAGE_PENDING:
    "Falta el detalle de un daño de esta unidad.",
  STATUS_DAMAGE_UNKNOWN: "Por completar",
  ACCESS_LABEL: "Más de esta unidad",
  ACCESS_DAMAGE: "Reportar daño",
  ACCESS_PHOTOS: "Fotos",
  ACCESS_HISTORY: "Historial",
  RECEIVE_CAUSE_LABEL: "Causa",
  RECEIVE_LATER: "Recibir y detallar después",
  RECEIVE_LATER_HINT:
    "La unidad no queda disponible aunque falte el detalle.",
  STATUS_DAMAGE_DATE: "Fecha",
  STATUS_DAMAGE_TITLE: "Daño reportado",
  STATUS_DAMAGE_WHAT: "Qué pasó",
  STATUS_EXTERNAL_WORKSHOP: "taller externo",
  STATUS_HINT:
    "Anote cada trabajo que le hagan. La unidad sigue en mantenimiento hasta que usted la devuelva.",
  STATUS_JOBS_EMPTY:
    "Todavía no se ha anotado ningún trabajo.",
  STATUS_JOBS_TITLE: "Trabajos hechos",
  STATUS_REGISTER_JOB: "Registrar trabajo",
  STATUS_RETURN_TO_SERVICE: "Devolver a servicio",
  STATUS_SAVING: "Guardando…",
  STATUS_SEND_TO_MAINTENANCE: "Pasar a mantenimiento",
  STATUS_TITLE: (code: string, status: string): string =>
    `${code} · ${status}`,
  STATUS_UNIT: (code: string): string =>
    `Ver estado de ${code}`,
  STATUS_WORK_TYPES: {
    oil_change: "Cambio de aceite",
    other: "Otro trabajo",
    part_change: "Cambio de pieza",
    tire_change: "Cambio de llanta",
  } as Record<string, string>,
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
  FILTERED_EMPTY_BODY:
    "Cambie el filtro de arriba para ver las demás unidades.",
  FILTERED_EMPTY_TITLE: "No hay unidades con este filtro",
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
} as const;

export const CATEGORY_UNIT_STATUS_LABEL: Record<
  ActiveInventoryUnitStatus,
  string
> = {
  available: "Disponible",
  damaged: "Dañada",
  in_maintenance: "En mantenimiento",
  in_repair: "En reparación",
  occupied: "Por regresar",
};

export const CATEGORY_UNIT_USAGE_COPY: Record<
  DispatchUsageMetric,
  (value: string) => string
> = {
  engine_hours: (value) => `${value} h`,
  kilometers: (value) => `${value} km`,
};

export const CATEGORY_UNIT_RECEIVE_USAGE_LABEL: Record<
  DispatchUsageMetric,
  string
> = {
  engine_hours: "Horas de motor al terminar",
  kilometers: "Kilómetros al terminar",
};

export const CATEGORY_UNIT_MODIFY_USAGE_LABEL: Record<
  DispatchUsageMetric,
  string
> = {
  engine_hours: "Horas de motor",
  kilometers: "Kilómetros",
};
