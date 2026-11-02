"use client";

import { useState } from "react";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import {
  AUTOCAPITALIZE,
  AUTOCOMPLETE,
  INPUT_TYPES,
  PATHS,
  STRING,
  WORKER_AREA_FIELD,
} from "@/app/constants";
import { WORKER_AREAS_COPY } from "../constants/WorkerAreasCopy.constants";
import type { WorkerLookupFormProps } from "../models/WorkerLookupFormProps.interface";
import { WORKER_LOOKUP_FORM_CLASS } from "../styles/WorkerAreas.styles";

const WorkerLookupForm = ({
  username,
}: WorkerLookupFormProps): React.JSX.Element => {
  const [value, setValue] = useState(username);

  return (
    <form
      action={PATHS.ADMINISTRATION.WORKER_AREAS}
      className={WORKER_LOOKUP_FORM_CLASS}
    >
      <FormField
        id={WORKER_AREA_FIELD.USERNAME}
        name={WORKER_AREA_FIELD.USERNAME}
        label={WORKER_AREAS_COPY.USERNAME_LABEL}
        placeholder={WORKER_AREAS_COPY.USERNAME_PLACEHOLDER}
        type={INPUT_TYPES.TEXT}
        variant={FORM_FIELD_VARIANT.GLASS}
        labelSuffix={STRING.Empty}
        autoComplete={AUTOCOMPLETE.OFF}
        autoCapitalize={AUTOCAPITALIZE.NONE}
        spellCheck={false}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <FormSubmitButton
        icon={MATERIAL_ICON_NAME.SEARCH}
        isPending={false}
        label={WORKER_AREAS_COPY.SEARCH}
        pendingLabel={WORKER_AREAS_COPY.SEARCH}
      />
    </form>
  );
};

export default WorkerLookupForm;
