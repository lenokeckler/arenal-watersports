import type { CategoryAlertType } from "../constants/CategoryAlertType.constants";
import type { CategoryConfigureAlertTypeChoice } from "./CategoryConfigureAlertTypeChoice.interface";

export interface CategoryConfigureAlertTypeChipsProps {
  choices: CategoryConfigureAlertTypeChoice[];
  onSelectType: (alertType: CategoryAlertType) => void;
}
