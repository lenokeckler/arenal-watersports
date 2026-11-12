import type {
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";

export interface ReservationEquipmentEligibilityRetryOptions {
  isRealtimeConnectedRef: MutableRefObject<boolean>;
  refresh: () => Promise<void>;
  setHasError: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSubscriptionAttempt: Dispatch<SetStateAction<number>>;
}
