import type { CategoryConfigureAlertsProps } from "./CategoryConfigureAlertsProps.interface";
import type { CategoryConfigureDepositProps } from "./CategoryConfigureDepositProps.interface";
import type { CategoryConfigureReservationsProps } from "./CategoryConfigureReservationsProps.interface";
import type { CategoryConfigureTraitsProps } from "./CategoryConfigureTraitsProps.interface";

export interface CategoryConfigureBodiesProps {
  reservations: CategoryConfigureReservationsProps;
  deposit: CategoryConfigureDepositProps;
  alerts: CategoryConfigureAlertsProps;
  traits: CategoryConfigureTraitsProps;
}
