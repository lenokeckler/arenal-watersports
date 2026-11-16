import Label from "@/app/components/text/Label";
import InlineText from "@/app/components/text/InlineText";
import { INPUT_TYPES } from "@/app/constants";
import type { ExtraCompatibilityUnitCheckboxRowProps } from "../models/ExtraCompatibilityUnitCheckboxRowProps.interface";
import {
  EXTRA_COMPATIBILITY_UNIT_CHECKBOX_CLASS,
  EXTRA_COMPATIBILITY_UNIT_CODE_CLASS,
  EXTRA_COMPATIBILITY_UNIT_STATUS_CLASS,
  EXTRA_COMPATIBILITY_UNIT_TEXT_CLASS,
  resolveExtraCompatibilityUnitRowClass,
} from "../styles/ExtraCompatibilityUnits.styles";

const ExtraCompatibilityUnitCheckboxRow = ({
  isSubmitting,
  onToggleUnit,
  option,
}: ExtraCompatibilityUnitCheckboxRowProps): React.JSX.Element => (
  <Label
    className={resolveExtraCompatibilityUnitRowClass(
      option.isChecked
    )}
  >
    <input
      type={INPUT_TYPES.CHECKBOX}
      className={EXTRA_COMPATIBILITY_UNIT_CHECKBOX_CLASS}
      checked={option.isChecked}
      disabled={isSubmitting}
      onChange={() => onToggleUnit(option.id)}
    />
    <div className={EXTRA_COMPATIBILITY_UNIT_TEXT_CLASS}>
      <InlineText
        className={EXTRA_COMPATIBILITY_UNIT_CODE_CLASS}
      >
        {option.code}
      </InlineText>
      <InlineText
        className={EXTRA_COMPATIBILITY_UNIT_STATUS_CLASS}
      >
        {option.statusLabel}
      </InlineText>
    </div>
  </Label>
);

export default ExtraCompatibilityUnitCheckboxRow;
