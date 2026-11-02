export const RESERVATION_SPLIT_UI_COPY = {
  DURATION_HOURS: (hours: number): string =>
    hours === 1 ? "1 hora" : `${hours} horas`,
  LABEL_CUSTOMER: "Cliente",
  LABEL_DATE: "Fecha",
  LABEL_DURATION: "Duración",
  LABEL_EQUIPMENT: "Equipo",
  LABEL_PEOPLE: "Personas",
  LABEL_START_TIME: "Hora de inicio",
  ORIGINAL_HEADING: "Salida original",
  ORIGINAL_STAYS: "Se quedan en esta salida.",
  ORIGINAL_TIME_HINT: "Esta salida conserva su hora.",
  REMAINING_OF: (
    remaining: number,
    total: number
  ): string => `${remaining} de ${total}`,
  UNIT_GOES_TO: (departureNumber: number): string =>
    `Va en la salida ${departureNumber}`,
  UNIT_STAYS: "Se queda",
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
