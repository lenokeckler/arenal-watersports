import type { CategoryBehaviorFormValues } from "./CategoryBehaviorFormValues.interface";
import type { CategoryConfigureReservationsProps } from "./CategoryConfigureReservationsProps.interface";

export interface CategoryConfigureReservationsState {
  reservations: CategoryConfigureReservationsProps;
  values: CategoryBehaviorFormValues;
}
