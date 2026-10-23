import type { ReservationExtraOption } from "../models/ReservationExtraOption.interface";

export const RESERVATION_EXTRA_OPTIONS_TEST = {
  FIRST_UNIT_ID: "123e4567-e89b-12d3-a456-426614174000",
  SECOND_UNIT_ID: "123e4567-e89b-12d3-a456-426614174002",
  OPTION: {
    id: "123e4567-e89b-12d3-a456-426614174001",
    name: "Chaleco infantil",
    occupiesCategoryId:
      "123e4567-e89b-12d3-a456-426614174004",
    occupiesQuantity: 1,
    priceCrc: 1500,
    priceUsd: 3,
  } satisfies ReservationExtraOption,
  STALE_OPTION: {
    id: "123e4567-e89b-12d3-a456-426614174005",
    name: "Equipo obsoleto",
    occupiesCategoryId: null,
    occupiesQuantity: null,
    priceCrc: 2000,
    priceUsd: 4,
  } satisfies ReservationExtraOption,
  ERROR: new Error("request rejected"),
};

export const createDeferred = <Value>() => {
  let resolve: (value: Value) => void = () => undefined;
  let reject: (reason: unknown) => void = () => undefined;
  const promise = new Promise<Value>(
    (resolvePromise, rejectPromise) => {
      resolve = resolvePromise;
      reject = rejectPromise;
    }
  );
  return { promise, reject, resolve };
};
