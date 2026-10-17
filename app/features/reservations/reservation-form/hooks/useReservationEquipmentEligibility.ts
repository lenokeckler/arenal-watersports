import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { NullableRef } from "@/app/types";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { getReservationCategoriesAction } from "../actions/getReservationCategoriesAction";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { createReservationEquipmentEligibilityStatusHandler } from "../utils/createReservationEquipmentEligibilityStatusHandler";
import { subscribeToReservationEquipmentEligibility } from "../utils/subscribeToReservationEquipmentEligibility";

export const useReservationEquipmentEligibility = (
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
  const requestVersion = useRef(0);
  const isRealtimeConnected = useRef(false);

  const refresh = useCallback(async (): Promise<void> => {
    const currentVersion = requestVersion.current + 1;
    requestVersion.current = currentVersion;
    setHasError(false);
    setIsLoading(true);
    setRefreshKey((currentKey) => currentKey + 1);

    try {
      const nextCategories =
        await getReservationCategoriesAction();
      if (
        requestVersion.current === currentVersion &&
        isRealtimeConnected.current
      ) {
        setCategories(nextCategories);
      } else if (
        requestVersion.current === currentVersion
      ) {
        setCategories([]);
        setHasError(true);
      }
    } catch {
      if (requestVersion.current === currentVersion) {
        setCategories([]);
        setHasError(true);
      }
    } finally {
      if (requestVersion.current === currentVersion) {
        setIsLoading(false);
      }
    }
  }, []);

  const retry = useCallback((): void => {
    if (isRealtimeConnected.current) {
      void refresh();
      return;
    }
    setHasError(false);
    setIsLoading(true);
    setSubscriptionAttempt(
      (currentAttempt) => currentAttempt + 1
    );
  }, [refresh]);

  useEffect(() => {
    let isActive = true;
    const supabase = createBrowserSupabaseClient();
    let channel: NullableRef<
      ReturnType<typeof supabase.channel>
    > = null;

    const connect = async (): Promise<void> => {
      try {
        const refreshIfActive = (): void => {
          if (isActive) {
            void refresh();
          }
        };
        const handleSubscriptionStatus =
          createReservationEquipmentEligibilityStatusHandler(
            {
              isActive: () => isActive,
              onSubscribed: () => {
                isRealtimeConnected.current = true;
                refreshIfActive();
              },
              onUnavailable: () => {
                isRealtimeConnected.current = false;
                requestVersion.current += 1;
                setCategories([]);
                setHasError(true);
                setIsLoading(false);
                setRefreshKey(
                  (currentKey) => currentKey + 1
                );
              },
            }
          );

        channel =
          await subscribeToReservationEquipmentEligibility({
            isActive: () => isActive,
            onChange: refreshIfActive,
            onStatus: handleSubscriptionStatus,
            supabase,
          });
      } catch {
        if (isActive) {
          isRealtimeConnected.current = false;
          setCategories([]);
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    void connect();

    return () => {
      isActive = false;
      isRealtimeConnected.current = false;
      requestVersion.current += 1;
      if (channel) {
        void supabase.removeChannel(channel);
      }
    };
  }, [refresh, subscriptionAttempt]);

  return {
    categories,
    hasError,
    isLoading,
    refreshKey,
    retry,
  };
};
