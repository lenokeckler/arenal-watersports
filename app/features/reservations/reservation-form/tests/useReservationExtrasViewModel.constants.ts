import type { ReservationExtraOption } from "../models/ReservationExtraOption.interface";
import type { ReservationExtrasPricing } from "../models/ReservationExtrasPricing.interface";
import type { ReservationExtrasPricingActionResult } from "../models/ReservationExtrasPricingActionResult.type";
import type { ReservationExtrasViewModelInput } from "../models/ReservationExtrasViewModelInput.interface";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";

const FIRST_INPUT: ReservationExtrasViewModelInput = {
  durationHours: 2,
  extraIds: [],
  reservationType: RESERVATION_TYPE.RENTAL,
  unitId: "123e4567-e89b-12d3-a456-426614174000",
};

const SECOND_INPUT: ReservationExtrasViewModelInput = {
  durationHours: 3,
  extraIds: ["123e4567-e89b-12d3-a456-426614174001"],
  reservationType: RESERVATION_TYPE.TOUR,
  unitId: "123e4567-e89b-12d3-a456-426614174002",
};

export const RESERVATION_EXTRAS_VIEW_MODEL_TEST = {
  FIRST_INPUT,
  INVALID_DURATION_INPUT: {
    ...FIRST_INPUT,
    durationHours: 0,
  },
  INVALID_UNIT_INPUT: {
    ...FIRST_INPUT,
    unitId: "",
  },
  COMBO_INPUT: {
    ...FIRST_INPUT,
    reservationType: RESERVATION_TYPE.COMBO,
  },
  OPTION: {
    id: "123e4567-e89b-12d3-a456-426614174001",
    name: "Chaleco infantil",
    occupiesCategoryId:
      "123e4567-e89b-12d3-a456-426614174004",
    occupiesQuantity: 1,
    priceCrc: 1500,
    priceUsd: 3,
  } satisfies ReservationExtraOption,
  PRICING: {
    hasBoatTariff: true,
    listAmountCrc: 50000,
    listAmountUsd: 100,
  } satisfies ReservationExtrasPricing,
  FAILURE: {
    message: "No fue posible calcular el total.",
    ok: false,
  } satisfies ReservationExtrasPricingActionResult,
  SECOND_INPUT,
} as const;
