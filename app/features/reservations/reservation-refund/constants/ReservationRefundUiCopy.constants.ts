export const RESERVATION_REFUND_UI_COPY = {
  AVAILABLE_HEADING: "Disponible para devolver",
  AVAILABLE_NOTE:
    "Es lo que quedó cobrado, ya descontado lo devuelto antes.",
  BACK_TO_RESERVATION: "Volver a la reserva",
  CURRENT_DATE_TIME: (date: string, time: string): string =>
    `${date}, ${time}`,
  LABEL_CUSTOMER: "Cliente",
  LABEL_DATE_TIME: "Fecha y hora",
  NOTHING_IN_CURRENCY: "Sin monto por devolver",
  SUMMARY_HEADING: "Reserva",
  TITLE: "Registrar devolución",
} as const;
