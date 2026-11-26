import type { CategoryAlerts } from "./CategoryAlerts.interface";
import type { CategoryBehavior } from "./CategoryBehavior.interface";
import type { CategoryDeposit } from "./CategoryDeposit.interface";
import type { CategoryImage } from "./CategoryImage.interface";
import type { CategoryStatus } from "./CategoryStatus.type";

export interface CategoryConfiguration {
  id: string;
  name: string;
  status: CategoryStatus;
  currentQuantity: number;
  behavior: CategoryBehavior;
  deposit: CategoryDeposit;
  alerts: CategoryAlerts;
  image: CategoryImage;
}
