export const RESERVATION_SPLIT_UI_COPY = {
  ACTIONS: "Acciones de la división",
  ADD_DEPARTURE: "Agregar otra salida",
  ADD_DEPARTURE_BLOCKED:
    "No quedan personas ni equipos para otra salida.",
  ANNOUNCE_ADDED: (departureNumber: number): string =>
    `Salida ${departureNumber} agregada.`,
  ANNOUNCE_REMOVED: (departureNumber: number): string =>
    `Salida ${departureNumber} quitada.`,
  BACK_TO_CALENDAR: "Volver al calendario",
  CARRIES_UNITS: (units: string): string =>
    `Lleva: ${units}.`,
  CHARGE_NOTE:
    "El cobro y el depósito se quedan en la reserva original. Las salidas nuevas no tienen cobro propio; solo se suma el tiempo adicional que generen.",
  DEPARTURE_HEADING: (departureNumber: number): string =>
    `Salida ${departureNumber}`,
  DESCRIPTION:
    "Reparta las personas y el equipo en salidas distintas. La reserva original sigue siendo la primera salida.",
  DURATION_HOURS: (hours: number): string =>
    hours === 1 ? "1 hora" : `${hours} horas`,
  DURATION_HOURS_MINUTES: (
    hours: number,
    minutes: number
  ): string => `${hours} h ${minutes} min`,
  DURATION_MINUTES: (minutes: number): string =>
    `${minutes} min`,
  DURATION_INHERITED: (duration: string): string =>
    `Duración: ${duration}, igual que la reserva original.`,
  EQUIPMENT_LEGEND: "Equipo de esta salida",
  LABEL_CUSTOMER: "Cliente",
  LABEL_DATE: "Fecha",
  LABEL_DURATION: "Duración",
  LABEL_EQUIPMENT: "Equipo",
  LABEL_PEOPLE: "Personas",
  LABEL_START_TIME: "Hora de inicio",
  ORIGINAL_HEADING: "Salida original",
  ORIGINAL_STAYS: "Se quedan en esta salida.",
  ORIGINAL_TIME_HINT: "Esta salida conserva su hora.",
  PEOPLE: "Cantidad de personas",
  REMAINING_OF: (
    remaining: number,
    total: number
  ): string => `${remaining} de ${total}`,
  REMOVE_DEPARTURE: "Quitar salida",
  REMOVE_DEPARTURE_ARIA: (
    departureNumber: number
  ): string => `Quitar la salida ${departureNumber}`,
  SAME_DAY_HINT: "Mismo día que la reserva original.",
  TIME_ZONE: "Hora de Costa Rica · UTC−06:00",
  TITLE: "Dividir reserva",
  UNITS_HELPER:
    "Cada unidad va completa en una sola salida.",
  UNITS_LEGEND: "Equipo por unidad",
  UNIT_GOES_TO: (departureNumber: number): string =>
    `Va en la salida ${departureNumber}`,
  UNIT_STAYS: "Se queda",
  UNIT_OPTION_DEPARTURE: (
    departureNumber: number,
    time: string
  ): string => `Salida ${departureNumber} · ${time}`,
  UNIT_OPTION_NO_TIME: "sin hora",
  UNIT_OPTION_ORIGINAL: (time: string): string =>
    `Salida original · ${time}`,
  SUBMIT: "Dividir reserva",
  SUBMITTING: "Dividiendo reserva…",
  SUCCESS: (departures: number): string =>
    `La reserva quedó dividida en ${departures} salidas.`,
  STEPPER_ADD_ARIA: (
    label: string,
    departureNumber: number
  ): string =>
    `Agregar uno: ${label}, salida ${departureNumber}`,
  STEPPER_AT_MAX: "No quedan más para esta salida.",
  STEPPER_GROUP_ARIA: (
    label: string,
    departureNumber: number
  ): string => `${label}, salida ${departureNumber}`,
  STEPPER_REMOVE_ARIA: (
    label: string,
    departureNumber: number
  ): string =>
    `Quitar uno: ${label}, salida ${departureNumber}`,
  STEPPER_VALUE_SR: (value: number): string =>
    `${value} seleccionados`,
} as const;
