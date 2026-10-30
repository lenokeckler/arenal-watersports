import { STRING } from "@/app/constants";
import type { ReservationEquipmentImageOption } from "../models/ReservationEquipmentImageOption.interface";

export const RESERVATION_EQUIPMENT_IMAGE_DIMENSION = 128;
export const RESERVATION_EQUIPMENT_NAME_NORMALIZATION = {
  FORM: "NFD",
  DIACRITICS: /[\u0300-\u036f]/g,
} as const;

const jetSki: ReservationEquipmentImageOption = {
  alt: STRING.Empty,
  source: "/images/equipment/jet-ski.webp",
};
const kayak: ReservationEquipmentImageOption = {
  alt: STRING.Empty,
  source: "/images/equipment/kayak-doble.webp",
};
const paddleboard: ReservationEquipmentImageOption = {
  alt: STRING.Empty,
  source: "/images/equipment/paddleboard.webp",
};

export const RESERVATION_EQUIPMENT_IMAGE: Record<
  string,
  ReservationEquipmentImageOption
> = {
  "jet ski": jetSki,
  kayak,
  "kayak doble": kayak,
  paddleboard,
  "paddle board": paddleboard,
  sup: paddleboard,
  "sup board": paddleboard,
};
