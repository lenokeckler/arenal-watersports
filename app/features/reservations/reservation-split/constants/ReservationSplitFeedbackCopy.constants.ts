export const RESERVATION_SPLIT_FEEDBACK_COPY = {
  CATEGORY_UNAVAILABLE:
    "Ya no hay equipo disponible de esa categoría. Elija otro equipo o inténtelo más tarde.",
  DEPARTURES_MIN: "Agregue al menos una salida nueva.",
  EQUIPMENT_DUPLICATE:
    "Cada equipo solo puede aparecer una vez en la salida.",
  EQUIPMENT_MIN: "Cada salida necesita al menos 1 equipo.",
  NETWORK_ERROR:
    "Sin conexión. Sus datos siguen aquí; vuelva a intentarlo cuando tenga señal.",
  NOT_FOUND:
    "No se encontró la reserva. Vuelva al calendario e inténtelo de nuevo.",
  NOT_SCHEDULED:
    "Solo se pueden dividir las reservas programadas. Esta reserva está en otro estado.",
  ORIGINAL_EQUIPMENT_MIN:
    "La reserva original debe conservar al menos un equipo. Ajuste las salidas e inténtelo de nuevo.",
  ORIGINAL_PEOPLE_MIN:
    "La reserva original debe conservar al menos una persona. Ajuste las salidas e inténtelo de nuevo.",
  PEOPLE_MIN: "Cada salida necesita al menos 1 persona.",
  RELOAD_REQUIRED:
    "La reserva no coincide con los datos mostrados. Vuelva al calendario, ábrala de nuevo e inténtelo otra vez.",
  STALE:
    "Esta reserva cambió mientras usted la editaba. Vuelva al calendario y ábrala de nuevo para ver la versión actual.",
  SUBMIT_ERROR:
    "No fue posible dividir la reserva. Revise los datos e inténtelo de nuevo.",
  TIME_INVALID:
    "Indique una hora válida, por ejemplo 14:30",
  TIME_REQUIRED: "Indique la hora de inicio de la salida.",
  UNIT_UNAVAILABLE:
    "La unidad ya está ocupada en el horario de la nueva salida. Elija otra salida para esa unidad o cambie la hora.",
} as const;
