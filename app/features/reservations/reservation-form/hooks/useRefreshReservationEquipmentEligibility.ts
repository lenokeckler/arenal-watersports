import { useCallback } from "react";
import { getReservationCategoriesAction } from "../actions/getReservationCategoriesAction";
import type { ReservationEquipmentEligibilityRefreshOptions } from "../models/ReservationEquipmentEligibilityRefreshOptions.interface";

export const useRefreshReservationEquipmentEligibility = ({
  isRealtimeConnectedRef,
  requestVersionRef,
  setCategories,
  setHasError,
  setIsLoading,
  setRefreshKey,
}: ReservationEquipmentEligibilityRefreshOptions): (() => Promise<void>) =>
  useCallback(async (): Promise<void> => {
    const currentVersion = requestVersionRef.current + 1;
    requestVersionRef.current = currentVersion;
    setHasError(false);
    setIsLoading(true);
    setRefreshKey((currentKey) => currentKey + 1);

    try {
      const nextCategories =
        await getReservationCategoriesAction();
      if (
        requestVersionRef.current === currentVersion &&
        isRealtimeConnectedRef.current
      ) {
        setCategories(nextCategories);
      } else if (
        requestVersionRef.current === currentVersion
      ) {
        setHasError(true);
      }
    } catch {
      if (requestVersionRef.current === currentVersion) {
        setHasError(true);
      }
    } finally {
      if (requestVersionRef.current === currentVersion) {
        setIsLoading(false);
      }
    }
  }, [
    isRealtimeConnectedRef,
    requestVersionRef,
    setCategories,
    setHasError,
    setIsLoading,
    setRefreshKey,
  ]);
