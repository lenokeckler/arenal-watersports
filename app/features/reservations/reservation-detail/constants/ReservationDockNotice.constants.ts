import { RESERVATION_STATUS } from "@/app/constants";

export const RESERVATION_DOCK_NOTICE_STATUSES: readonly string[] =
  [
    RESERVATION_STATUS.SCHEDULED,
    RESERVATION_STATUS.DISPATCHED,
  ];

export const RESERVATION_DOCK_NOTICE_RPC =
  "set_reservation_dock_notice";

export const RESERVATION_DOCK_NOTICE_ERROR = {
  INVALID_INPUT: "Invalid reservation dock notice input",
  SET_NOTICE: "set reservation dock notice",
} as const;

export const RESERVATION_DOCK_NOTICE_COPY = {
  ERROR:
    "No se pudo actualizar el aviso al muelle. Intente de nuevo.",
  REMOVE: "Quitar aviso",
  SEND: "Enviar al muelle",
  SENDING: "Enviando…",
  SENT: "Enviada al muelle",
} as const;
