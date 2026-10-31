import { useCallback } from "react";
import type { ReservationEquipmentEligibilityRealtimeHandlersOptions } from "../models/ReservationEquipmentEligibilityRealtimeHandlersOptions.interface";

export const useReservationEquipmentEligibilityRealtimeHandlers =
  ({
    isRealtimeConnectedRef,
    refresh,
    requestVersionRef,
    setCategories,
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
      setCategories([]);
      setHasError(true);
      setIsLoading(false);
      setRefreshKey((currentKey) => currentKey + 1);
    }, [
      isRealtimeConnectedRef,
      requestVersionRef,
      setCategories,
      setHasError,
      setIsLoading,
      setRefreshKey,
    ]);

    return { onChange, onSubscribed, onUnavailable };
  };
