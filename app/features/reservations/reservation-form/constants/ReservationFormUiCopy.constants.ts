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
  CATEGORY_PLACEHOLDER: "Seleccione una categoría",
  QUANTITY: "Cantidad de equipos",
  SUBMIT: "Registrar reserva",
  SUBMITTING: "Guardando reserva…",
  SUCCESS: "La reserva quedó registrada correctamente.",
  SUBMIT_ERROR:
    "No fue posible registrar la reserva. Revise los datos e inténtelo de nuevo.",
  NO_CATEGORIES:
    "No hay categorías para este tipo de salida. Si requiere equipo de tour, seleccione Tour.",
  EQUIPMENT_QUANTITY_NOTE:
    "Los equipos intercambiables se reservan por cantidad; Operaciones asigna cada unidad al despachar.",
  EQUIPMENT_UNIT_NOTE:
    "La lancha se compromete por unidad concreta y permanece en tierra hasta que Operaciones la despache.",
  NO_AVAILABLE_UNITS:
    "No hay unidades disponibles para esta categoría.",
  AVAILABILITY_ERROR:
    "No fue posible verificar la disponibilidad. Inténtelo de nuevo.",
  AVAILABILITY_LOADING:
    "Verificando disponibilidad de la lancha…",
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
  UNIT: "Unidad de lancha",
  UNIT_PLACEHOLDER: "Seleccione una unidad disponible",
  EQUIPMENT_ELIGIBILITY_ERROR:
    "No fue posible actualizar el equipo disponible. Revise su conexión e intente de nuevo.",
  EQUIPMENT_ELIGIBILITY_LOADING:
    "Actualizando el equipo disponible…",
  RETRY_EQUIPMENT_ELIGIBILITY: "Reintentar actualización",
  GUIDES: "Guías de la salida",
  GUIDES_DESCRIPTION:
    "Seleccione uno o varios trabajadores marcados como guía. La cantidad de personas no limita la asignación.",
  GUIDES_SELECTED: "Guías seleccionados",
  GUIDES_EMPTY:
    "No hay trabajadores marcados como guía disponibles.",
  GUIDES_LOADING: "Cargando guías…",
  GUIDES_ERROR:
    "No fue posible cargar los guías. Revise la conexión e inténtelo de nuevo.",
  GUIDES_RETRY: "Reintentar carga de guías",
  EQUIPMENT_SELECTION_CHANGED:
    "La disponibilidad cambió. Seleccione otra categoría o unidad para continuar.",
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
