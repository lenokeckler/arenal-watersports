export const RESERVATION_CANCELLATION_UI_COPY = {
  BACK_TO_CALENDAR: "Volver al calendario",
  CURRENT_DATE_TIME: (date: string, time: string): string =>
    `${date}, ${time}`,
  LABEL_CUSTOMER: "Cliente",
  LABEL_DATE_TIME: "Fecha y hora",
  LABEL_EQUIPMENT: "Equipo",
  QUANTITY_OF: (quantity: number): string =>
    `x ${quantity}`,
  SUMMARY_HEADING: "Reserva",
  TITLE: "Cancelar reserva",
} as const;
