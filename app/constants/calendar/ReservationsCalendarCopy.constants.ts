export const RESERVATIONS_CALENDAR_COPY = {
  ACTUAL_DEPARTURE: "Salida real:",
  ACTUAL_RETURN: "Regreso real:",
  CREATE_RESERVATION: "Nueva reserva",
  DETAIL_SEPARATOR: ". ",
  EQUIPMENT: "Equipo comprometido:",
  EMPTY_PERIOD: "No hay reservas en este período.",
  EMPTY_DAY: "No hay reservas en este día.",
  EXPECTED_RETURN: "Regreso esperado:",
  LOAD_ERROR:
    "No se pudo cargar el calendario. Intente de nuevo.",
  MISSING_EQUIPMENT: "Equipo pendiente de registrar",
  MISSING_SNAPSHOT:
    "Aún no se ha cargado información de reservas.",
  MODIFY_RESERVATION: "Modificar",
  MODIFY_RESERVATION_LABEL: "Modificar la reserva de",
  PARTIAL_COVERAGE:
    "La información cargada no cubre todo este período.",
  PERIOD_AGENDA: "Agenda de reservas del período",
  SELECTED_DAY_AGENDA_ID:
    "selected-day-reservations-agenda",
  SELECTED_DAY_AGENDA:
    "Agenda de reservas del día seleccionado",
  SELECTED_MONTH_AGENDA_ID:
    "selected-month-reservations-agenda",
  SELECTED_MONTH_AGENDA:
    "Agenda de reservas del mes seleccionado",
  REFRESH_ERROR:
    "No se pudo actualizar el calendario. Se muestran los datos anteriores.",
  REFRESHING: "Actualizando las reservas…",
  RETRY: "Volver a intentar",
  RESERVATION_COUNT_LABEL: (count: number): string =>
    count === 1 ? `${count} reserva` : `${count} reservas`,
  RESERVATION_COUNT_SEPARATOR: ", ",
  INCOMPLETE_RESULTS:
    "Faltan resultados de reservas por cargar.",
  QUANTITY_SEPARATOR: " × ",
  RESERVATION_NAME: "Reserva a nombre de",
  SCHEDULED: "Horario agendado:",
  TITLE: "Calendario de reservas",
  UNKNOWN_EXPECTED_RETURN: "Sin hora prevista",
  UNKNOWN_RETURN: "Sin regreso registrado",
} as const;
