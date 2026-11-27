import { CURRENCY_CODE } from "@/app/constants";
import type { CurrencyCode } from "@/app/constants";

export const RESERVATION_DEPOSIT_FORM_COPY = {
  ACTIONS: "Acciones del depósito",
  AMOUNT_LABEL: {
    [CURRENCY_CODE.CRC]: "Monto recibido en colones",
    [CURRENCY_CODE.USD]: "Monto recibido en dólares",
  } satisfies Record<CurrencyCode, string>,
  AMOUNT_PLACEHOLDER: "0.00",
  BACK: "Volver",
  CURRENCY_LEGEND: "Moneda del depósito",
  CURRENCY_OPTION_DESCRIPTION: (amount: string): string =>
    `Sugerido: ${amount}`,
  CURRENCY_OPTION_NO_PROPOSAL: "Sin monto sugerido",
  DECISION_DECLINED: "No hubo depósito",
  DECISION_DECLINED_NOTE:
    "Quedará registrado que en esta salida no hubo depósito.",
  DECISION_LEGEND: "¿Se recibió depósito de garantía?",
  DECISION_RECEIVED: "Sí, se recibió depósito",
  NO_PROPOSAL_HELPER:
    "No hay monto sugerido en esta moneda para este equipo. Escriba el monto recibido.",
  LABEL_AMOUNT: "Monto",
  LABEL_CURRENCY: "Moneda",
  LABEL_DECISION: "Depósito",
  PENDING_DEPOSITS: "Ver depósitos pendientes",
  PROPOSAL_HELPER: (amount: string): string =>
    `Sugerido según el equipo que sale: ${amount}. Puede cambiarlo.`,
  RECEIPT_WITHOUT_DEPOSIT: "Sin depósito",
  RECORDED_BY: (name: string): string =>
    `Registrado por ${name}`,
  SUBMIT: "Registrar depósito",
  SUBMIT_DECLINED: "Registrar sin depósito",
  SUBMITTING: "Registrando depósito…",
  SUBMITTING_DECLINED: "Registrando sin depósito…",
  SUCCESS_DECLINED: (code: string): string =>
    `Se registró que no hubo depósito en la reserva ${code}.`,
  SUCCESS_RECEIVED: (code: string): string =>
    `Depósito registrado en la reserva ${code}.`,
} as const;
