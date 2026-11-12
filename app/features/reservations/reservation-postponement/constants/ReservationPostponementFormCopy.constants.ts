import type { ReservationPostponementCause } from "../models/ReservationPostponementCause.type";

export const RESERVATION_POSTPONEMENT_FORM_COPY = {
  ACTIONS: "Acciones de la reserva pospuesta",
  CANCEL: "Volver",
  CAUSE_LABEL: {
    heavy_rain: "Lluvia muy fuerte",
    other: "Otro motivo",
    storm: "Tormenta",
  } satisfies Record<ReservationPostponementCause, string>,
  LABEL_CAUSE: "Motivo",
  LABEL_NEW_DATE: "Nueva fecha",
  LABEL_NEW_TIME: "Nueva hora",
  LABEL_REASON: "Cuéntenos el motivo",
  NOTE_KEPT:
    "El cobro y el depósito de garantía se conservan para la fecha nueva. Al cliente no se le vuelve a cobrar.",
  NOTE_WEATHER_ONLY:
    "Una reserva que ya salió solo se pospone por clima: lluvia muy fuerte o tormenta. El equipo se cierra y vuelve al tablero.",
  REASON_HELPER: "Queda registrado junto con su nombre.",
  REASON_PLACEHOLDER:
    "Por ejemplo: el cliente pidió cambiar el día",
  SUBMIT: "Posponer reserva",
  SUBMITTING: "Posponiendo reserva…",
  SUCCESS: (date: string, time: string): string =>
    `La reserva quedó agendada para el ${date} a las ${time}.`,
  TIME_ZONE: "Hora de Costa Rica · UTC−06:00",
} as const;
