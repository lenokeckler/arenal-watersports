import { PREDEFINED_COMBO_FORM_COPY } from "../constants/PredefinedComboFormCopy.constants";
import { PREDEFINED_COMBO_MODE_OPTIONS } from "../constants/PredefinedComboForm.constants";
import type { PredefinedComboModeSelectorProps } from "../models/PredefinedComboModeSelectorProps.interface";
import {
  PREDEFINED_COMBO_LABEL_CLASS,
  PREDEFINED_COMBO_MODE_GRID_CLASS,
} from "../styles/PredefinedComboSelection.styles";
import PredefinedComboModeOption from "./PredefinedComboModeOption";

const PredefinedComboModeSelector = ({
  mode,
  onModeChange,
}: PredefinedComboModeSelectorProps): React.JSX.Element => (
  <fieldset>
    <legend className={PREDEFINED_COMBO_LABEL_CLASS}>
      {PREDEFINED_COMBO_FORM_COPY.MODE_LABEL}
    </legend>
    <div className={PREDEFINED_COMBO_MODE_GRID_CLASS}>
      {PREDEFINED_COMBO_MODE_OPTIONS.map((option) => (
        <PredefinedComboModeOption
          groupName={PREDEFINED_COMBO_FORM_COPY.MODE_LABEL}
          id={option.id}
          key={option.value}
          label={option.label}
          mode={option.value}
          onModeChange={onModeChange}
          selectedMode={mode}
        />
      ))}
    </div>
  </fieldset>
);

export default PredefinedComboModeSelector;
