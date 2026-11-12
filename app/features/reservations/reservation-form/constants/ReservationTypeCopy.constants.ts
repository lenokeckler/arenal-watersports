import { RESERVATION_TYPE } from "./ReservationType.constants";

export const RESERVATION_TYPE_COPY = {
  LABEL: "Tipo de salida",
  DESCRIPTION: "Seleccione cómo se realizará esta reserva.",
  OPTIONS: {
    RENTAL: {
      description:
        "El cliente se lleva el equipo por su cuenta.",
      id: "reservation-type-rental",
      label: "Renta",
      value: RESERVATION_TYPE.RENTAL,
    },
    TOUR: {
      description: "La salida va acompañada por un guía.",
      id: "reservation-type-tour",
      label: "Tour",
      value: RESERVATION_TYPE.TOUR,
    },
    COMBO: {
      description: "Paquete con varios equipos distintos.",
      id: "reservation-type-combo",
      label: "Combo",
      value: RESERVATION_TYPE.COMBO,
    },
  },
} as const;
