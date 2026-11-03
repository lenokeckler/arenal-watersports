import {
  STRING,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";

export const CATEGORY_UNITS_COPY = {
  CUSTOMER_LINE: (customerName: string): string =>
    `La lleva ${customerName}`,
  LIST_LABEL: (categoryName: string): string =>
    `Unidades de ${categoryName}`,
  RESERVATION_LINE: (
    reservationCode: string,
    reservationWindow: string
  ): string =>
    `Reserva ${reservationCode} ${STRING.MIDDLE_DOT} ${reservationWindow}`,
  RETURNS_AT: (time: string): string =>
    `Regresa a las ${time}`,
  RETURNS_ON: (date: string, time: string): string =>
    `Regresa el ${date} a las ${time}`,
  WINDOW_SEPARATOR: " a ",
} as const;

export const CATEGORY_UNIT_STATUS_LABEL: Record<
  ActiveInventoryUnitStatus,
  string
> = {
  available: "Disponible",
  damaged: "Dañada",
  in_maintenance: "En mantenimiento",
  in_repair: "En reparación",
  occupied: "Ocupada",
};
