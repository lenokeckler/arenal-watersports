import type { ReservationEquipmentEligibilityRetryOptions } from "../models/ReservationEquipmentEligibilityRetryOptions.interface";

export const useRetryReservationEquipmentEligibility =
  ({
    isRealtimeConnectedRef,
    refresh,
    setHasError,
    setIsLoading,
    setSubscriptionAttempt,
  }: ReservationEquipmentEligibilityRetryOptions): (() => void) =>
  (): void => {
    if (isRealtimeConnectedRef.current) {
      void refresh();
      return;
    }
    setHasError(false);
    setIsLoading(true);
    setSubscriptionAttempt(
      (currentAttempt) => currentAttempt + 1
    );
  };
