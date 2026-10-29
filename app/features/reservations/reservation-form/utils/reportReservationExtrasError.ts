export const reportReservationExtrasError = (
  error: unknown
): void => {
  if (typeof window.reportError === "function") {
    window.reportError(error);
  }
};
