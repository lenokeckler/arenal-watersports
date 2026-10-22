import InlineText from "@/app/components/text/InlineText";
import Label from "@/app/components/text/Label";
import type { PredefinedComboModeOptionProps } from "../models/PredefinedComboModeOptionProps.interface";
import {
  PREDEFINED_COMBO_MODE_OPTION_CLASS,
  PREDEFINED_COMBO_RADIO_CLASS,
} from "../styles/PredefinedComboSelection.styles";

const PredefinedComboModeOption = ({
  label,
  groupName,
  id,
  mode,
  onModeChange,
  selectedMode,
}: PredefinedComboModeOptionProps): React.JSX.Element => (
  <Label
    className={PREDEFINED_COMBO_MODE_OPTION_CLASS}
    htmlFor={id}
  >
    <input
      checked={selectedMode === mode}
      className={PREDEFINED_COMBO_RADIO_CLASS}
      id={id}
      name={groupName}
      onChange={() => onModeChange(mode)}
      type="radio"
      value={mode}
    />
    <InlineText>{label}</InlineText>
  </Label>
);

export default PredefinedComboModeOption;
