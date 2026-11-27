import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import type { ReservationExtraTimeOutcome } from "../models/ReservationExtraTimeOutcome.type";
import { RESERVATION_EXTRA_TIME_OUTCOME as OUTCOME } from "./ReservationExtraTimeOutcome.constants";

export const RESERVATION_EXTRA_TIME_FORM_COPY = {
  ACTIONS: "Acciones del tiempo adicional",
  AMOUNT_HELPER:
    "Lo que se acordó con el cliente por el tiempo de más. Se registra aparte de la tarifa.",
  AMOUNT_LABEL: {
    [CURRENCY_CODE.CRC]: "Monto acordado en colones",
    [CURRENCY_CODE.USD]: "Monto acordado en dólares",
  } satisfies Record<CurrencyCode, string>,
  AMOUNT_PLACEHOLDER: "0.00",
  BACK: "Volver a la reserva",
  CURRENCY_LEGEND: "Moneda del cobro",
  LABEL_AMOUNT: "Monto",
  LABEL_METHOD: "Método de pago",
  LABEL_MINUTES: "Tiempo de más",
  LABEL_OUTCOME: "Decisión",
  METHOD_HELPER:
    "Solo queda anotado: el sistema no cobra ni valida tarjetas.",
  OTHER_METHOD_LABEL: "¿Cuál método?",
  OTHER_METHOD_PLACEHOLDER: "Por ejemplo: transferencia",
  OUTCOME_HELPER: {
    [OUTCOME.CHARGED]:
      "Se registra el monto acordado dentro del cobro de la reserva.",
    [OUTCOME.COURTESY]:
      "Queda anotado que el tiempo de más no se cobra.",
  } satisfies Record<ReservationExtraTimeOutcome, string>,
  OUTCOME_LABEL: {
    [OUTCOME.CHARGED]: "Cobrarlo",
    [OUTCOME.COURTESY]: "Dejarlo de cortesía",
  } satisfies Record<ReservationExtraTimeOutcome, string>,
  OUTCOME_LEGEND: "¿Qué se hace con el tiempo de más?",
  RECORDED_BY: (name: string): string =>
    `Registrado por ${name}`,
  SUBMIT: {
    [OUTCOME.CHARGED]: "Cobrar tiempo adicional",
    [OUTCOME.COURTESY]: "Registrar cortesía",
  } satisfies Record<ReservationExtraTimeOutcome, string>,
  SUBMIT_UNDECIDED: "Registrar decisión",
  SUBMITTING: "Registrando…",
  SUCCESS: {
    [OUTCOME.CHARGED]: (code: string): string =>
      `Tiempo adicional cobrado en la reserva ${code}.`,
    [OUTCOME.COURTESY]: (code: string): string =>
      `Tiempo adicional de cortesía en la reserva ${code}.`,
  } satisfies Record<
    ReservationExtraTimeOutcome,
    (code: string) => string
  >,
} as const;
