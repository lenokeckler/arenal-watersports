import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";

export const PENDING_DEPOSITS_COPY = {
  EMPTY_BODY:
    "Todo el dinero de clientes que teníamos en mano ya fue resuelto.",
  EMPTY_TITLE: "No hay depósitos pendientes",
  ERROR_BODY:
    "Revise su conexión e intente de nuevo. Mientras no cargue la lista, no asuma que no hay depósitos pendientes.",
  ERROR_TITLE: "No se pudieron cargar los depósitos",
  LIST_ARIA_LABEL: "Lista de depósitos pendientes",
  LOADING_ANNOUNCEMENT: "Cargando depósitos pendientes.",
  METADATA_TITLE:
    "Depósitos pendientes — Arenal Water Sports",
  PAGE_DESCRIPTION:
    "Este dinero es de sus clientes. Mientras no se resuelva, sigue apareciendo aquí con la reserva a la que pertenece.",
  PAGE_TITLE: "Depósitos pendientes",
  RESERVATION_CODE_LABEL: "Reserva",
} as const;

export const CURRENCY_NAME: Record<CurrencyCode, string> = {
  [CURRENCY_CODE.USD]: "Dólares",
  [CURRENCY_CODE.CRC]: "Colones",
};
