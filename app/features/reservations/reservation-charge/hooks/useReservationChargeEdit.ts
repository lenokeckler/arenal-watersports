"use client";

export const useReservationChargeEdit =
  (isPending: boolean, clearErrors: () => void) =>
  <Value>(apply: (next: Value) => void) =>
  (next: Value): void => {
    if (isPending) {
      return;
    }
    apply(next);
    clearErrors();
  };
