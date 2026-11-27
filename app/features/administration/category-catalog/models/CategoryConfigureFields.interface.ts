import type { CategoryAlertFormFieldsViewModel } from "./CategoryAlertFormFieldsViewModel.interface";
import type { CategoryBehaviorFormFieldsViewModel } from "./CategoryBehaviorFormFieldsViewModel.interface";
import type { CategoryDepositFormFieldsViewModel } from "./CategoryDepositFormFieldsViewModel.interface";

export interface CategoryConfigureFields {
  behavior: CategoryBehaviorFormFieldsViewModel;
  deposit: CategoryDepositFormFieldsViewModel;
  alerts: CategoryAlertFormFieldsViewModel;
}
