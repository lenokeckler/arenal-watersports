import type { NullableRef } from "@/app/types";

export const isReservationQuantityUnavailable = (
  isQuantityTracked: boolean,
  quantity: number,
  freeQuantity: NullableRef<number>
): boolean =>
  isQuantityTracked &&
  freeQuantity !== null &&
  quantity > freeQuantity;
