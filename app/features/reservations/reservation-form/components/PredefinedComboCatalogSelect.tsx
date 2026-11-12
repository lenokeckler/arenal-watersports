import Label from "@/app/components/text/Label";
import { PREDEFINED_COMBO_FORM_COPY } from "../constants/PredefinedComboFormCopy.constants";
import { PREDEFINED_COMBO_FORM_FIELD_ID } from "../constants/PredefinedComboForm.constants";
import type { PredefinedComboCatalogFieldProps } from "../models/PredefinedComboCatalogFieldProps.interface";
import {
  PREDEFINED_COMBO_LABEL_CLASS,
  PREDEFINED_COMBO_SELECT_CLASS,
  PREDEFINED_COMBO_SELECT_FIELD_CLASS,
} from "../styles/PredefinedComboSelection.styles";
import PredefinedComboCatalogOption from "./PredefinedComboCatalogOption";

const PredefinedComboCatalogSelect = ({
  combos,
  onComboSelection,
  selectedComboId,
}: PredefinedComboCatalogFieldProps): React.JSX.Element => (
  <div className={PREDEFINED_COMBO_SELECT_FIELD_CLASS}>
    <Label
      className={PREDEFINED_COMBO_LABEL_CLASS}
      htmlFor={PREDEFINED_COMBO_FORM_FIELD_ID.SELECT}
    >
      {PREDEFINED_COMBO_FORM_COPY.SELECT_COMBO}
    </Label>
    <select
      className={PREDEFINED_COMBO_SELECT_CLASS}
      id={PREDEFINED_COMBO_FORM_FIELD_ID.SELECT}
      onChange={(event) =>
        onComboSelection(event.target.value)
      }
      value={selectedComboId ?? ""}
    >
      <option value="">
        {
          PREDEFINED_COMBO_FORM_COPY.SELECT_COMBO_PLACEHOLDER
        }
      </option>
      {combos.map((combo) => (
        <PredefinedComboCatalogOption
          combo={combo}
          key={combo.id}
        />
      ))}
    </select>
  </div>
);

export default PredefinedComboCatalogSelect;
