import type {
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";

export interface ReservationEquipmentEligibilityRealtimeHandlersOptions {
  isRealtimeConnectedRef: MutableRefObject<boolean>;
  refresh: () => Promise<void>;
  requestVersionRef: MutableRefObject<number>;
  setHasError: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setRefreshKey: Dispatch<SetStateAction<number>>;
}
