import { useRefreshReservationEquipmentEligibility } from "./useRefreshReservationEquipmentEligibility";
import { useReservationEquipmentEligibilityRealtime } from "./useReservationEquipmentEligibilityRealtime";
import { useReservationEquipmentEligibilityRealtimeHandlers } from "./useReservationEquipmentEligibilityRealtimeHandlers";
import { useReservationEquipmentEligibilitySnapshot } from "./useReservationEquipmentEligibilitySnapshot";
import { useRetryReservationEquipmentEligibility } from "./useRetryReservationEquipmentEligibility";

export const useReservationEquipmentEligibilityController =
  (
    snapshot: ReturnType<
      typeof useReservationEquipmentEligibilitySnapshot
    >
  ): (() => void) => {
    const refresh =
      useRefreshReservationEquipmentEligibility({
        isRealtimeConnectedRef:
          snapshot.isRealtimeConnectedRef,
        requestVersionRef: snapshot.requestVersionRef,
        setCategories: snapshot.setCategories,
        setHasError: snapshot.setHasError,
        setIsLoading: snapshot.setIsLoading,
        setRefreshKey: snapshot.setRefreshKey,
      });
    const retry = useRetryReservationEquipmentEligibility({
      isRealtimeConnectedRef:
        snapshot.isRealtimeConnectedRef,
      refresh,
      setHasError: snapshot.setHasError,
      setIsLoading: snapshot.setIsLoading,
      setSubscriptionAttempt:
        snapshot.setSubscriptionAttempt,
    });
    const realtimeHandlers =
      useReservationEquipmentEligibilityRealtimeHandlers({
        isRealtimeConnectedRef:
          snapshot.isRealtimeConnectedRef,
        refresh,
        requestVersionRef: snapshot.requestVersionRef,
        setCategories: snapshot.setCategories,
        setHasError: snapshot.setHasError,
        setIsLoading: snapshot.setIsLoading,
        setRefreshKey: snapshot.setRefreshKey,
      });
    useReservationEquipmentEligibilityRealtime({
      ...realtimeHandlers,
      subscriptionAttempt: snapshot.subscriptionAttempt,
    });

    return retry;
  };
