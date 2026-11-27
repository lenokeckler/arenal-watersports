import type { UpdateCategoryAlertsInput } from "./UpdateCategoryAlertsInput.interface";
import type { UpdateCategoryBehaviorInput } from "./UpdateCategoryBehaviorInput.interface";
import type { UpdateCategoryDepositInput } from "./UpdateCategoryDepositInput.interface";

export interface UpdateCategoryConfigurationInput {
  categoryId: string;
  behavior: UpdateCategoryBehaviorInput;
  deposit: UpdateCategoryDepositInput;
  alerts: UpdateCategoryAlertsInput;
}
