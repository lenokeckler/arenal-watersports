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

const SAME_UNIT_TOUR_INPUT: ReservationExtrasViewModelInput =
  {
    durationHours: 3,
    extraIds: ["123e4567-e89b-12d3-a456-426614174003"],
    reservationType: RESERVATION_TYPE.TOUR,
    unitId: "123e4567-e89b-12d3-a456-426614174000",
  };

const DURATION_CHANGE_INPUT: ReservationExtrasViewModelInput =
  {
    ...FIRST_INPUT,
    durationHours: 3,
  };

const TYPE_CHANGE_INPUT: ReservationExtrasViewModelInput = {
  ...FIRST_INPUT,
  reservationType: RESERVATION_TYPE.TOUR,
};

const EXTRA_CHANGE_INPUT: ReservationExtrasViewModelInput =
  {
    ...FIRST_INPUT,
    extraIds: ["123e4567-e89b-12d3-a456-426614174003"],
  };

export const RESERVATION_EXTRAS_PRICING_TEST = {
  FIRST_INPUT,
  SECOND_INPUT,
  SAME_UNIT_TOUR_INPUT,
  DURATION_CHANGE_INPUT,
  TYPE_CHANGE_INPUT,
  EXTRA_CHANGE_INPUT,
  INVALID_DURATION_INPUT: {
    ...FIRST_INPUT,
    durationHours: 0,
  },
  COMBO_INPUT: {
    ...FIRST_INPUT,
    reservationType: RESERVATION_TYPE.COMBO,
  },
  PRICING: {
    hasBoatTariff: true,
    listAmountCrc: 50000,
    listAmountUsd: 100,
  } satisfies ReservationExtrasPricing,
  SECOND_PRICING: {
    hasBoatTariff: true,
    listAmountCrc: 65000,
    listAmountUsd: 130,
  } satisfies ReservationExtrasPricing,
  FAILURE: {
    message: "No fue posible calcular el total.",
    ok: false,
  } satisfies ReservationExtrasPricingActionResult,
  ERROR: new Error("request rejected"),
} as const;

export const createDeferred = <Value>() => {
  let resolve: (value: Value) => void = () => undefined;
  let reject: (reason?: unknown) => void = () => undefined;
  const promise = new Promise<Value>(
    (resolvePromise, rejectPromise) => {
      resolve = resolvePromise;
      reject = rejectPromise;
    }
  );
  return { promise, reject, resolve };
};
