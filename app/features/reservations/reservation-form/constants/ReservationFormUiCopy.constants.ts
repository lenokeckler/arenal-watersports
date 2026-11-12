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
  QUANTITY_UNAVAILABLE:
    "La cantidad solicitada supera los equipos disponibles para este horario.",
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
  SUBMIT_RESERVATION_ACCESS_ERROR:
    "Su cuenta necesita el área de Reservas habilitada y activa para registrar esta reserva. Solicite a Administración que revise su acceso.",
  SUBMIT_UNEXPECTED_ERROR:
    "El sistema devolvió una respuesta inesperada. No se confirmó la reserva; verifique el calendario antes de intentarlo de nuevo.",
  NO_CATEGORIES:
    "No hay categorías de equipo disponibles para esta reserva.",
  RESERVATION_TYPE_SELECTION_CLEARED:
    "La categoría seleccionada solo está disponible para Tour y se borró al cambiar el tipo de salida. Seleccione otra categoría.",
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
  EQUIPMENT_ELIGIBILITY_LOADING:
    "Actualizando las categorías disponibles…",
  EQUIPMENT_ELIGIBILITY_ERROR:
    "No fue posible actualizar las categorías disponibles.",
  RETRY_EQUIPMENT_ELIGIBILITY: "Reintentar actualización",
  EQUIPMENT_SELECTION_CHANGED:
    "La disponibilidad cambió. Seleccione otra categoría o unidad.",
  GUIDES: "Guías de la salida",
  GUIDES_DESCRIPTION:
    "Seleccione uno o varios trabajadores marcados como guía. La cantidad de personas no limita la asignación.",
  GUIDES_SELECTED: "Guías asignados",
  GUIDES_EMPTY:
    "No hay trabajadores marcados como guía disponibles.",
  GUIDES_LOADING: "Cargando guías…",
  GUIDES_ERROR:
    "No fue posible cargar los guías. Revise la conexión e inténtelo de nuevo.",
  GUIDES_RETRY: "Reintentar carga de guías",
  EXTRAS_TITLE: "Extras de la salida",
  EXTRAS_DESCRIPTION:
    "Seleccione los servicios adicionales compatibles con esta lancha.",
  EXTRAS_LOADING: "Cargando extras compatibles…",
  EXTRAS_ERROR:
    "No fue posible cargar los extras. Revise su conexión e inténtelo de nuevo.",
  EXTRAS_EMPTY: "Esta lancha no tiene extras disponibles.",
  EXTRAS_RETRY: "Reintentar carga de extras",
  EXTRA_INVENTORY_NOTE: "Ocupa equipo del inventario",
  QUOTE_TITLE: "Total estimado",
  QUOTE_CURRENCY_NOTE:
    "Montos calculados por separado con la tarifa de esta salida; no se convierte entre monedas.",
  QUOTE_LOADING: "Calculando total…",
  QUOTE_ERROR:
    "No fue posible calcular el total. Revise su conexión e inténtelo de nuevo.",
  QUOTE_RETRY: "Reintentar cálculo",
  QUOTE_MISSING_TARIFF:
    "No hay tarifa registrada para esta lancha y tipo de salida.",
  QUOTE_MISSING_CURRENCY: "Tarifa no disponible",
} as const;
