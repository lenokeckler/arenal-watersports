import { CURRENCY_CODE } from "@/app/constants";
import type { CurrencyCode } from "@/app/constants";

export const RESERVATION_CHARGE_FORM_COPY = {
  ACTIONS: "Acciones del cobro",
  ADD_CURRENCY: {
    [CURRENCY_CODE.CRC]: "Agregar monto en colones",
    [CURRENCY_CODE.USD]: "Agregar monto en dólares",
  } satisfies Record<CurrencyCode, string>,
  AMOUNT_HELPER_MANUAL:
    "No hay tarifa del catálogo para esta moneda. Escriba el monto acordado con el cliente.",
  AMOUNT_HELPER_PROPOSED:
    "Propuesto: tarifa del catálogo por la duración de la salida. Ajústelo libremente si el precio acordado fue otro.",
  AMOUNT_LABEL: {
    [CURRENCY_CODE.CRC]: "Monto acordado en colones",
    [CURRENCY_CODE.USD]: "Monto acordado en dólares",
  } satisfies Record<CurrencyCode, string>,
  AMOUNT_PLACEHOLDER: "0.00",
  BACK: "Volver",
  CURRENCY_LEGEND: "Moneda del cobro",
  LABEL_AMOUNT: "Monto",
  LABEL_CURRENCY: "Moneda",
  LABEL_METHOD: "Método de pago",
  LABEL_PART: {
    [CURRENCY_CODE.CRC]: "Monto en colones",
    [CURRENCY_CODE.USD]: "Monto en dólares",
  } satisfies Record<CurrencyCode, string>,
  METHOD_HELPER:
    "Solo queda anotado: el sistema no cobra ni valida tarjetas.",
  MIXED_SECOND_HELPER:
    "Este monto se suma al primero: el cliente paga una parte en cada moneda. Si no lo necesita, quítelo.",
  OTHER_METHOD_LABEL: "¿Cuál método?",
  OTHER_METHOD_PLACEHOLDER: "Por ejemplo: transferencia",
  PRICE_GROUP_LABEL: "Precio acordado",
  RECORDED_BY: (name: string): string =>
    `Registrado por ${name}`,
  REMOVE_CURRENCY: {
    [CURRENCY_CODE.CRC]: "Quitar monto en colones",
    [CURRENCY_CODE.USD]: "Quitar monto en dólares",
  } satisfies Record<CurrencyCode, string>,
  SUBMIT: "Registrar cobro",
  SUBMITTING: "Registrando cobro…",
  SUCCESS: (code: string): string =>
    `Cobro registrado en la reserva ${code}.`,
} as const;
