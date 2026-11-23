import type { Database } from "@/app/types";
import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_MOVEMENT_TYPE,
  type ReservationDetailMovementType,
} from "./ReservationDetail.constants";

export const RESERVATION_DETAIL_MOVEMENTS_COPY = {
  DATE: "Fecha",
  EXTRA_TIME_CONCEPT: "Tiempo adicional",
  METHOD: "Método de pago",
  METHOD_NOT_APPLICABLE: "No aplica",
  MOVEMENTS_EMPTY:
    "Todavía no hay cobros ni devoluciones registrados en esta reserva.",
  MOVEMENTS_HIDE: "Ocultar movimientos de dinero",
  MOVEMENTS_SHOW: "Ver movimientos de dinero",
  MOVEMENTS_TITLE: "Movimientos de dinero",
  RECORDED_BY: "Registrado por",
  TARIFF_CONCEPT: "Tarifa",
  TYPE_CHARGE: "Cobro",
  TYPE_REFUND: "Devolución",
} as const;

export const RESERVATION_DETAIL_MOVEMENTS_PANEL_ID =
  "movimientos-de-dinero";

export const RESERVATION_DETAIL_MOVEMENT_KIND_COPY: Record<
  Database["public"]["Enums"]["charge_kind"],
  string
> = {
  [RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME]:
    RESERVATION_DETAIL_MOVEMENTS_COPY.EXTRA_TIME_CONCEPT,
  [RESERVATION_DETAIL_CHARGE_KIND.TARIFF]:
    RESERVATION_DETAIL_MOVEMENTS_COPY.TARIFF_CONCEPT,
};

export const RESERVATION_DETAIL_MOVEMENT_TYPE_COPY: Record<
  ReservationDetailMovementType,
  string
> = {
  [RESERVATION_DETAIL_MOVEMENT_TYPE.CHARGE]:
    RESERVATION_DETAIL_MOVEMENTS_COPY.TYPE_CHARGE,
  [RESERVATION_DETAIL_MOVEMENT_TYPE.REFUND]:
    RESERVATION_DETAIL_MOVEMENTS_COPY.TYPE_REFUND,
};
