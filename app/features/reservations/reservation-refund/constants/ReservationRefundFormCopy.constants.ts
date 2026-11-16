import { CURRENCY_CODE } from "@/app/constants";
import type { CurrencyCode } from "@/app/constants";

export const RESERVATION_REFUND_FORM_COPY = {
  ACTIONS: "Acciones de la devolución",
  AMOUNT_HELPER: (max: string): string =>
    `Máximo que puede devolver: ${max}.`,
  AMOUNT_LABEL: {
    [CURRENCY_CODE.CRC]: "Monto devuelto en colones",
    [CURRENCY_CODE.USD]: "Monto devuelto en dólares",
  } satisfies Record<CurrencyCode, string>,
  AMOUNT_PLACEHOLDER: "0.00",
  BACK: "Volver",
  CURRENCY_LEGEND: "Moneda de la devolución",
  CURRENCY_OPTION_DESCRIPTION: (amount: string): string =>
    `Disponible: ${amount}`,
  LABEL_AMOUNT: "Monto",
  LABEL_CURRENCY: "Moneda",
  LABEL_REASON: "Motivo",
  OTHER_HELPER:
    "Escriba por qué se devuelve el dinero. Queda registrado junto con su nombre.",
  OTHER_LABEL: "Describa el motivo",
  REASON_LEGEND: "Motivo de la devolución",
  RECORDED_BY: (name: string): string =>
    `Registrado por ${name}`,
  SUBMIT: "Registrar devolución",
  SUBMITTING: "Registrando devolución…",
  SUCCESS: (code: string): string =>
    `Devolución registrada en la reserva ${code}.`,
} as const;
