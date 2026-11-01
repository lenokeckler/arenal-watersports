import { useCallback } from "react";
import type { ReservationEquipmentEligibilityRealtimeHandlersOptions } from "../models/ReservationEquipmentEligibilityRealtimeHandlersOptions.interface";

export const useReservationEquipmentEligibilityRealtimeHandlers =
  ({
    isRealtimeConnectedRef,
    refresh,
    requestVersionRef,
    setHasError,
    setIsLoading,
    setRefreshKey,
  }: ReservationEquipmentEligibilityRealtimeHandlersOptions) => {
    const onChange = useCallback((): void => {
      void refresh();
    }, [refresh]);
    const onSubscribed = useCallback((): void => {
      isRealtimeConnectedRef.current = true;
      void refresh();
    }, [isRealtimeConnectedRef, refresh]);
    const onUnavailable = useCallback((): void => {
      isRealtimeConnectedRef.current = false;
      requestVersionRef.current += 1;
      setHasError(true);
      setIsLoading(false);
      setRefreshKey((currentKey) => currentKey + 1);
    }, [
      isRealtimeConnectedRef,
      requestVersionRef,
      setHasError,
      setIsLoading,
      setRefreshKey,
    ]);

    return { onChange, onSubscribed, onUnavailable };
  };
