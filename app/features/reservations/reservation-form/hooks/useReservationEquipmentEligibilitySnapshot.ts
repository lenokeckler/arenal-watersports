import { useRef, useState } from "react";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";

export const useReservationEquipmentEligibilitySnapshot = (
  initialCategories: ReservationCategoryOption[]
) => {
  const [categories, setCategories] = useState(
    initialCategories
  );
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [subscriptionAttempt, setSubscriptionAttempt] =
    useState(0);
  const requestVersionRef = useRef(0);
  const isRealtimeConnectedRef = useRef(false);

  return {
    categories,
    hasError,
    isLoading,
    isRealtimeConnectedRef,
    refreshKey,
    requestVersionRef,
    setCategories,
    setHasError,
    setIsLoading,
    setRefreshKey,
    setSubscriptionAttempt,
    subscriptionAttempt,
  };
};
