export const createReservationDepositEdit =
  (isPending: boolean, clearErrors: () => void) =>
  <Value>(apply: (next: Value) => void) =>
  (next: Value): void => {
    if (isPending) {
      return;
    }
    apply(next);
    clearErrors();
  };
