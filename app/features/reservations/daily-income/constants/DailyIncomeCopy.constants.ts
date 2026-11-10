import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";

export const DAILY_INCOME_COPY = {
  BREAKDOWN_TITLE: "Por método de pago",
  EMPTY_BODY:
    "Cuando se registre un pago, aparecerá aquí con su moneda.",
  EMPTY_TITLE: "Hoy no hay ingresos registrados",
  ERROR_BODY:
    "Revise su conexión y vuelva a cargar la página. Mientras no cargue, no asuma que hoy no entró dinero.",
  ERROR_TITLE: "No se pudieron cargar los ingresos del día",
  INCOME_LABEL: "Ingresos de hoy",
  LOADING_ANNOUNCEMENT: "Cargando ingresos del día.",
  METADATA_TITLE: "Ingresos del día — Arenal Water Sports",
  NO_PAYMENT_METHOD: "Sin método",
  PAGE_DESCRIPTION:
    "Esto es lo que entró hoy en cada moneda. Los dólares y los colones se muestran por separado y nunca se suman.",
  PAGE_TITLE: "Ingresos del día",
} as const;

export const DAILY_INCOME_NO_MOVEMENT_COPY: Record<
  CurrencyCode,
  string
> = {
  [CURRENCY_CODE.USD]: "Hoy no entraron pagos en dólares.",
  [CURRENCY_CODE.CRC]: "Hoy no entraron pagos en colones.",
};

export const DAILY_INCOME_METHOD_LIST_COPY: Record<
  CurrencyCode,
  string
> = {
  [CURRENCY_CODE.USD]:
    "Ingresos en dólares por método de pago",
  [CURRENCY_CODE.CRC]:
    "Ingresos en colones por método de pago",
};
