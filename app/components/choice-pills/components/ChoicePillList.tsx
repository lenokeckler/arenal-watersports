import type { ChoicePillListProps } from "../models/ChoicePillListProps.type";
import { CHOICE_PILLS_LIST_CLASS } from "../styles/ChoicePills.styles";
import ChoicePillOption from "./ChoicePillOption";
import type { JSX } from "react";

const ChoicePillList = ({
  name,
  onChange,
  options,
  value,
}: ChoicePillListProps): JSX.Element => (
  <div className={CHOICE_PILLS_LIST_CLASS}>
    {options.map((option) => (
      <ChoicePillOption
        key={option.value}
        isChecked={value === option.value}
        name={name}
        onChange={onChange}
        option={option}
      />
    ))}
  </div>
);

export default ChoicePillList;
