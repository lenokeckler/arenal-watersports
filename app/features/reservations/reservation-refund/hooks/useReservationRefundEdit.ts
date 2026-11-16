"use client";

export const useReservationRefundEdit =
  (isPending: boolean, clearErrors: () => void) =>
  <Value>(apply: (next: Value) => void) =>
  (next: Value): void => {
    if (isPending) {
      return;
    }
    apply(next);
    clearErrors();
  };
