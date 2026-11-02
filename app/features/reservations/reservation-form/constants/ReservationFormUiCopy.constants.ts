export const RESERVATION_FORM_UI_COPY = {
  TITLE: "Nueva reserva",
  BACK_TO_CALENDAR: "Volver al calendario",
  ACTIONS: "Acciones de reserva",
  DESCRIPTION:
    "Registre los datos de la actividad y el equipo requerido.",
  CUSTOMER_NAME: "Nombre de la reserva",
  PEOPLE_COUNT: "Cantidad de personas",
  DATE: "Fecha de la actividad",
  TIME: "Hora de inicio",
  TIME_ZONE: "Hora de Costa Rica · UTC−06:00",
  DURATION: "Duración en horas",
  CUSTOM_DURATION: "Otra duración en horas",
  CUSTOM_DURATION_OPTION: "Otra duración",
  CATEGORY: "Equipo",
  CATEGORY_UNAVAILABLE:
    "La categoría seleccionada dejó de estar disponible. Elija otra categoría.",
  CATEGORY_PLACEHOLDER: "Seleccione una categoría",
  QUANTITY: "Cantidad de equipos",
  UNIT: "Unidad",
  UNIT_PLACEHOLDER: "Seleccione una unidad disponible",
  AVAILABILITY_LOADING: "Consultando disponibilidad…",
  AVAILABILITY_ERROR:
    "No fue posible consultar las unidades disponibles.",
  NO_AVAILABLE_UNITS:
    "No hay unidades disponibles para este horario.",
  UNIT_UNAVAILABLE:
    "La unidad seleccionada dejó de estar disponible. Elija otra unidad.",
  UNIT_CONFLICT:
    "La unidad seleccionada ya tiene una reserva en ese horario. Elija otra unidad o cambie el horario.",
  RETRY_AVAILABILITY: "Volver a consultar",
  SUBMIT: "Registrar reserva",
  SUBMITTING: "Guardando reserva…",
  SUCCESS: "La reserva quedó registrada correctamente.",
  SUBMIT_ERROR:
    "No fue posible guardar la reserva por un error del sistema. Sus datos se conservaron; inténtelo de nuevo. Si persiste, informe a Administración.",
  SUBMIT_UNEXPECTED_ERROR:
    "El sistema devolvió una respuesta inesperada. No se confirmó la reserva; verifique el calendario antes de intentarlo de nuevo.",
  NO_CATEGORIES:
    "No hay categorías de equipo disponibles para reservar.",
  EQUIPMENT_QUANTITY_NOTE:
    "Los equipos intercambiables se reservan por cantidad; Operaciones asigna cada unidad al despachar.",
  EQUIPMENT_UNIT_NOTE:
    "La lancha se compromete por unidad concreta y permanece en tierra hasta que Operaciones la despache.",
  CATEGORY_AVAILABILITY: "Disponibilidad en este horario",
  CATEGORY_AVAILABILITY_AVAILABLE: "Disponibles",
  CATEGORY_AVAILABILITY_CONTEXT:
    "Resumen por categoría; no confirma la disponibilidad de una unidad concreta.",
  CATEGORY_AVAILABILITY_ERROR:
    "No fue posible consultar la disponibilidad para este horario.",
  CATEGORY_AVAILABILITY_LOADING:
    "Consultando equipos comprometidos en este horario…",
  CATEGORY_AVAILABILITY_OVERCOMMITTED:
    "La demanda supera la capacidad registrada para este horario.",
  CATEGORY_AVAILABILITY_RETRY: "Reintentar consulta",
  CATEGORY_AVAILABILITY_UNAVAILABLE:
    "No hay equipos disponibles en este horario.",
  CATEGORY_CONFLICT_WARNING_TITLE:
    "Posible cruce de disponibilidad",
  CATEGORY_CONFLICT_WARNING_DESCRIPTION:
    "El horario coincide con otras reservas de esta categoría. Puede continuar si la operación se acomoda sobre la marcha.",
  CATEGORY_CONFLICT_WARNING_LOADING:
    "Consultando reservas de esta categoría…",
  CATEGORY_CONFLICT_WARNING_ERROR:
    "No fue posible verificar los cruces de horario. Puede continuar con el registro.",
  EQUIPMENT_NOTE:
    "Indique la cantidad de equipos intercambiables. Para la lancha, elija la unidad que quedará reservada.",
  EQUIPMENT_ELIGIBILITY_LOADING:
    "Actualizando las categorías disponibles…",
  EQUIPMENT_ELIGIBILITY_ERROR:
    "No fue posible actualizar las categorías disponibles.",
  RETRY_EQUIPMENT_ELIGIBILITY: "Reintentar actualización",
  EQUIPMENT_SELECTION_CHANGED:
    "La disponibilidad cambió. Seleccione otra categoría o unidad.",
} as const;
