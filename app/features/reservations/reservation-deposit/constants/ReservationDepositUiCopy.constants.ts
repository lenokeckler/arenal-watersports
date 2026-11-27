export const RESERVATION_DEPOSIT_UI_COPY = {
  BACK_TO_RESERVATION: "Volver a la reserva",
  CURRENT_DATE_TIME: (date: string, time: string): string =>
    `${date}, ${time}`,
  LABEL_CUSTOMER: "Cliente",
  LABEL_DATE_TIME: "Fecha y hora",
  SUMMARY_HEADING: "Reserva",
  TITLE: "Registrar depósito",
} as const;
