import { CURRENCY_CODE } from "@/app/constants";
import type { CurrencyCode } from "@/app/constants";

export const RESERVATION_CHARGE_UI_COPY = {
  BACK_TO_RESERVATION: "Volver a la reserva",
  CURRENT_DATE_TIME: (date: string, time: string): string =>
    `${date}, ${time}`,
  HOURS_SUFFIX: "h",
  LABEL_CUSTOMER: "Cliente",
  LABEL_DATE_TIME: "Fecha y hora",
  LABEL_DURATION: "Duración",
  LABEL_PEOPLE: "Personas",
  MINUTES_SUFFIX: "min",
  NO_PROPOSAL_LINE: {
    [CURRENCY_CODE.CRC]:
      "Sin tarifa del catálogo en colones",
    [CURRENCY_CODE.USD]:
      "Sin tarifa del catálogo en dólares",
  } satisfies Record<CurrencyCode, string>,
  PER_RESERVATION_NOTE:
    "El cobro es por reserva, no por persona: si llegan menos personas de las agendadas, se cobra lo mismo.",
  PROPOSAL_LINE: (amount: string): string =>
    `Tarifa del catálogo: ${amount}`,
  SUMMARY_HEADING: "Reserva",
  TITLE: "Registrar cobro",
} as const;
