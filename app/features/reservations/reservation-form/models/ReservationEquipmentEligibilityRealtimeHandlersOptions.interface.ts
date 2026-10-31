import type {
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";

export interface ReservationEquipmentEligibilityRealtimeHandlersOptions {
  isRealtimeConnectedRef: MutableRefObject<boolean>;
  refresh: () => Promise<void>;
  requestVersionRef: MutableRefObject<number>;
  setCategories: Dispatch<
    SetStateAction<ReservationCategoryOption[]>
  >;
  setHasError: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setRefreshKey: Dispatch<SetStateAction<number>>;
}
