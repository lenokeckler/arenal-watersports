import {
  RESERVATION_DETAIL_EXTRA_TIME_STATE as STATE,
  type ReservationDetailExtraTimeState,
} from "./ReservationDetail.constants";

export const RESERVATION_DETAIL_CHARGES_COPY = {
  AMOUNT_CHARGED_GROSS: "Cobrado bruto",
  AMOUNT_CHARGED_NET: "Cobrado neto",
  AMOUNT_CREDIT: "Saldo a favor",
  AMOUNT_REMAINING: "Pendiente",
  AMOUNT_TARGET: "Tarifa",
  CHARGE_STATUS: "Estado del cobro",
  EXTRA_TIME_CHARGES: "Tiempo adicional",
  EXTRA_TIME_STATE: {
    [STATE.CHARGED]: (duration: string): string =>
      `Tiempo adicional cobrado: ${duration}`,
    [STATE.COURTESY]: (duration: string): string =>
      `Tiempo adicional de cortesía: ${duration}`,
    [STATE.PENDING]: (duration: string): string =>
      `Tiempo adicional por decidir: ${duration}`,
  } satisfies Record<
    ReservationDetailExtraTimeState,
    (duration: string) => string
  >,
  MISSING_AMOUNT: "Tarifa no definida",
  MISSING_PARENT:
    "La tarifa se registra en la reserva original.",
  PAID: "Pagado",
  PARENT: "Cobro en reserva original",
  PARTIAL: "Pago parcial",
  PENDING: "Pendiente de pago",
  RECORD_CHARGE: "Registrar cobro",
  RECORD_CHARGE_LABEL: (code: string): string =>
    `Registrar cobro de la reserva ${code}`,
  REFUNDS: "Reembolsos registrados",
  RESOLVE_EXTRA_TIME: "Cobrar tiempo adicional",
  RESOLVE_EXTRA_TIME_LABEL: (code: string): string =>
    `Cobrar el tiempo adicional de la reserva ${code}`,
  UNPRICED: "Sin tarifa configurada",
} as const;

export const RESERVATION_DETAIL_CHARGES_SECTION_ID =
  "estado-del-cobro";
