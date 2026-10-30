import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";

export const INCOME_COPY = {
  COLLECTED_LABEL: "Cobrado",
  EMPTY_BODY:
    "Cuando se registre un cobro o una devolución, aparecerá aquí con su moneda.",
  EMPTY_TITLE: "Hoy no hay ingresos registrados",
  ERROR_BODY:
    "Revise su conexión e intente de nuevo. Mientras no carguen, no asuma que hoy no entró dinero.",
  ERROR_TITLE: "No se pudieron cargar los ingresos del día",
  LOADING_ANNOUNCEMENT: "Cargando ingresos del día.",
  METADATA_TITLE: "Ingresos del día — Arenal Water Sports",
  NEGATIVE_SCREEN_READER_PREFIX: "menos ",
  NET_HELP: "Cobrado menos devuelto",
  NET_LABEL: "Neto",
  NET_NEGATIVE_NOTE:
    "Hoy se devolvió más de lo que se cobró.",
  PAGE_DESCRIPTION:
    "Lo cobrado hoy menos lo devuelto, en cada moneda. Los dólares y los colones se muestran por separado y nunca se suman.",
  PAGE_TITLE: "Ingresos del día",
  REFUNDED_LABEL: "Devuelto",
} as const;

export const INCOME_NO_MOVEMENT_COPY: Record<
  CurrencyCode,
  string
> = {
  [CURRENCY_CODE.USD]: "Hoy no hubo movimiento en dólares.",
  [CURRENCY_CODE.CRC]: "Hoy no hubo movimiento en colones.",
};
