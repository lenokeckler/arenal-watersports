import type { ReservationEquipmentImageOption } from "../models/ReservationEquipmentImageOption.interface";

export const RESERVATION_EQUIPMENT_IMAGE_DIMENSION = 128;

export const RESERVATION_EQUIPMENT_IMAGE: Record<
  string,
  ReservationEquipmentImageOption
> = {
  "jet ski": {
    alt: "Moto acuática para una reserva en el lago",
    source: "/images/equipment/jet-ski.webp",
  },
  kayak: {
    alt: "Kayak doble para una reserva en el lago",
    source: "/images/equipment/kayak-doble.webp",
  },
  paddleboard: {
    alt: "Tabla de paddleboard para una reserva en el lago",
    source: "/images/equipment/paddleboard.webp",
  },
  "paddle board": {
    alt: "Tabla de paddleboard para una reserva en el lago",
    source: "/images/equipment/paddleboard.webp",
  },
  sup: {
    alt: "Tabla de paddleboard para una reserva en el lago",
    source: "/images/equipment/paddleboard.webp",
  },
};
