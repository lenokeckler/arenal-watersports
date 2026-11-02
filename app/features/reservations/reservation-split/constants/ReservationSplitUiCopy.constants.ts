export const RESERVATION_SPLIT_UI_COPY = {
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
