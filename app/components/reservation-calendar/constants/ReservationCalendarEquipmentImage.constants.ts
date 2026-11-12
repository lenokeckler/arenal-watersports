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
const kayakIndividual: ReservationEquipmentImageOption = {
  alt: STRING.Empty,
  source: "/images/equipment/kayak-individual.webp",
};
const lancha: ReservationEquipmentImageOption = {
  alt: STRING.Empty,
  source: "/images/equipment/lancha.webp",
};
const cuadraciclo: ReservationEquipmentImageOption = {
  alt: STRING.Empty,
  source: "/images/equipment/cuadraciclo.webp",
};

export const RESERVATION_EQUIPMENT_IMAGE: Record<
  string,
  ReservationEquipmentImageOption
> = {
  "jet ski": jetSki,
  kayak,
  "kayak doble": kayak,
  "kayak individual": kayakIndividual,
  lancha,
  cuadraciclo,
  cuadraciclos: cuadraciclo,
  paddleboard,
  "paddle board": paddleboard,
  sup: paddleboard,
  "sup board": paddleboard,
};
