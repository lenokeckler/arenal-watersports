export const RESERVATION_CANCELLATION_FORM_COPY = {
  ACTIONS: "Acciones de la cancelación",
  BACK: "Volver",
  CAUSE_HELPER:
    "Operaciones se lo reportó por radio. Elija la causa que más se parece.",
  LABEL_CAUSE: "¿Qué pasó con la salida?",
  LABEL_REASON: "Motivo de la cancelación",
  NOTE: "La reserva deja de aparecer en el calendario y en operaciones y pasa al historial con su motivo. El cobro y el depósito no cambian: si corresponde devolver dinero, regístrelo aparte.",
  NOTE_DISPATCHED:
    "Esta salida está en curso. La reserva se cancela, pero el equipo sigue afuera hasta que operaciones registre cómo volvió: gasolina, horas o kilometraje y daños. El cobro y el depósito no cambian: el depósito se resuelve igual que en un cierre normal.",
  REASON_HELPER:
    "Queda en el historial junto con su nombre.",
  REASON_HELPER_DISPATCHED:
    "Escriba lo que operaciones reportó por radio. Queda en el historial junto con su nombre.",
  REASON_PLACEHOLDER: "Por ejemplo: el cliente no llegó",
  REASON_PLACEHOLDER_DISPATCHED:
    "Por ejemplo: operaciones avisó por radio que entró tormenta",
  SUBMIT: "Cancelar reserva",
  SUBMITTING: "Cancelando reserva…",
  SUCCESS: (code: string): string =>
    `La reserva ${code} quedó cancelada.`,
  SUCCESS_DISPATCHED: (code: string): string =>
    `La reserva ${code} quedó cancelada. Operaciones todavía debe registrar cómo volvió el equipo.`,
} as const;
