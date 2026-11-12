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
  NO_PROPOSAL: "Sin tarifa en el catálogo",
  PER_RESERVATION_NOTE:
    "El cobro es por reserva, no por persona: si llegan menos personas de las agendadas, se cobra lo mismo.",
  PROPOSAL_LABEL: {
    [CURRENCY_CODE.CRC]: "Tarifa del catálogo en colones",
    [CURRENCY_CODE.USD]: "Tarifa del catálogo en dólares",
  } satisfies Record<CurrencyCode, string>,
  SUMMARY_HEADING: "Reserva",
  TITLE: "Registrar cobro",
} as const;
