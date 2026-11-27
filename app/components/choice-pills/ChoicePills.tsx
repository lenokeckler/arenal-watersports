"use client";

import { useId } from "react";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import ChoicePillList from "./components/ChoicePillList";
import type { ChoicePillsProps } from "./models/ChoicePillsProps.interface";
import {
  CHOICE_PILLS_CLASS,
  CHOICE_PILLS_ERROR_CLASS,
  CHOICE_PILLS_LEGEND_CLASS,
} from "./styles/ChoicePills.styles";

const ChoicePills = ({
  error = null,
  legend,
  name,
  onChange,
  options,
  value,
}: ChoicePillsProps): React.JSX.Element => {
  const errorId = useId();

  return (
    <fieldset
      className={CHOICE_PILLS_CLASS}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className={CHOICE_PILLS_LEGEND_CLASS}>
        {legend}
      </legend>
      <ChoicePillList
        name={name}
        onChange={onChange}
        options={options}
        value={value}
      />
      {error && (
        <Text
          id={errorId}
          className={CHOICE_PILLS_ERROR_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {error}
        </Text>
      )}
    </fieldset>
  );
};

export default ChoicePills;
