import InlineText from "@/app/components/text/InlineText";
import { INPUT_TYPES } from "@/app/constants";
import type { ChoicePillOptionProps } from "../models/ChoicePillOptionProps.interface";
import {
  CHOICE_PILL_CLASS,
  CHOICE_PILL_INPUT_CLASS,
} from "../styles/ChoicePills.styles";
import type { JSX } from "react";

const ChoicePillOption = ({
  isChecked,
  name,
  onChange,
  option,
}: ChoicePillOptionProps): JSX.Element => (
  <label className={CHOICE_PILL_CLASS}>
    <input
      className={CHOICE_PILL_INPUT_CLASS}
      type={INPUT_TYPES.RADIO}
      name={name}
      value={option.value}
      checked={isChecked}
      onChange={() => onChange(option.value)}
    />
    <InlineText>{option.label}</InlineText>
  </label>
);

export default ChoicePillOption;
