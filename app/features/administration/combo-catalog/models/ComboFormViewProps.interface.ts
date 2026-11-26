import type { ComboCategoryOption } from "./ComboCategoryOption.interface";
import type { ComboForEdit } from "./ComboForEdit.interface";

export interface ComboFormViewProps {
  categoryOptions: ComboCategoryOption[];
  combo?: ComboForEdit;
}
