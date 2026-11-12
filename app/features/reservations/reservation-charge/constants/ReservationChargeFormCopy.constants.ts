import { CURRENCY_CODE } from "@/app/constants";
import type { CurrencyCode } from "@/app/constants";

export const RESERVATION_CHARGE_FORM_COPY = {
  ACTIONS: "Acciones del cobro",
  AMOUNT_HELPER_MANUAL:
    "No hay tarifa del catálogo para esta moneda. Escriba el monto acordado con el cliente.",
  AMOUNT_HELPER_PROPOSED:
    "Propuesto: tarifa del catálogo por la duración de la salida. Ajústelo si el precio acordado fue otro.",
  AMOUNT_LABEL: {
    [CURRENCY_CODE.CRC]: "Monto cobrado en colones",
    [CURRENCY_CODE.USD]: "Monto cobrado en dólares",
  } satisfies Record<CurrencyCode, string>,
  AMOUNT_PLACEHOLDER: "0.00",
  BACK: "Volver",
  CURRENCY_LEGEND: "Moneda del cobro",
  LABEL_AMOUNT: "Monto",
  LABEL_CURRENCY: "Moneda",
  LABEL_METHOD: "Método de pago",
  METHOD_HELPER:
    "Escriba cómo pagó el cliente. Queda registrado junto con su nombre.",
  METHOD_PLACEHOLDER:
    "Por ejemplo: efectivo, tarjeta o SINPE",
  RECORDED_BY: (name: string): string =>
    `Registrado por ${name}`,
  SUBMIT: "Registrar cobro",
  SUBMITTING: "Registrando cobro…",
  SUCCESS: (code: string): string =>
    `Cobro registrado en la reserva ${code}.`,
} as const;
