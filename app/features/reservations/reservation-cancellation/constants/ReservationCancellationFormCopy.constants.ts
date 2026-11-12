export const RESERVATION_CANCELLATION_FORM_COPY = {
  ACTIONS: "Acciones de la cancelación",
  BACK: "Volver",
  LABEL_REASON: "Motivo de la cancelación",
  NOTE: "La reserva deja de aparecer en el calendario y en operaciones y pasa al historial con su motivo. El cobro y el depósito no cambian: si corresponde devolver dinero, regístrelo aparte.",
  REASON_HELPER:
    "Queda en el historial junto con su nombre.",
  REASON_PLACEHOLDER: "Por ejemplo: el cliente no llegó",
  SUBMIT: "Cancelar reserva",
  SUBMITTING: "Cancelando reserva…",
  SUCCESS: (code: string): string =>
    `La reserva ${code} quedó cancelada.`,
} as const;
