import type {
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";

export interface ReservationEquipmentEligibilityRefreshOptions {
  isRealtimeConnectedRef: MutableRefObject<boolean>;
  requestVersionRef: MutableRefObject<number>;
  setCategories: Dispatch<
    SetStateAction<ReservationCategoryOption[]>
  >;
  setHasError: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setRefreshKey: Dispatch<SetStateAction<number>>;
}
