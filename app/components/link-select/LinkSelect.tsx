"use client";

import FormField from "@/app/components/form-field/FormField";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { useLinkSelectViewModel } from "./hooks/useLinkSelectViewModel";
import type { LinkSelectProps } from "./models/LinkSelectProps.interface";
import type { JSX } from "react";

const LinkSelect = (
  props: LinkSelectProps
): JSX.Element => {
  const { handleChange, selectOptions } =
    useLinkSelectViewModel(props);

  return (
    <FormField
      id={props.id}
      name={props.id}
      label={props.label}
      labelSuffix={STRING.Empty}
      type={INPUT_TYPES.SELECT}
      value={safeString(props.value)}
      onChange={handleChange}
      options={selectOptions}
    />
  );
};

export default LinkSelect;
