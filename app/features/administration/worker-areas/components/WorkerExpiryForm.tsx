"use client";

import { useActionState, useState } from "react";
import { Text } from "@/app/components";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import {
  ARIA_ROLE,
  INPUT_TYPES,
  STRING,
  WORKER_ACCOUNT_FIELD,
  WORKER_AREA_FIELD,
} from "@/app/constants";
import { submitWorkerExpiryExtension } from "../actions/submitWorkerExpiryExtension";
import { WORKER_ACCOUNT_ERROR } from "../constants/WorkerAccountCopy.constants";
import { WORKER_EXPIRY_COPY } from "../constants/WorkerExpiryCopy.constants";
import type { WorkerAccountChangeState } from "../models/WorkerAccountChangeState.type";
import type { WorkerExpiryFormProps } from "../models/WorkerExpiryFormProps.interface";
import {
  WORKER_AREA_CHANGE_ERROR_CLASS,
  WORKER_AREA_CHANGE_FORM_CLASS,
} from "../styles/WorkerAreas.styles";

const WorkerExpiryForm = ({
  username,
  workerId,
}: WorkerExpiryFormProps): React.JSX.Element => {
  const [refusal, formAction, isPending] = useActionState<
    WorkerAccountChangeState,
    FormData
  >(submitWorkerExpiryExtension, null);
  const [expiresOn, setExpiresOn] = useState<string>(
    STRING.Empty
  );

  return (
    <form
      action={formAction}
      className={WORKER_AREA_CHANGE_FORM_CLASS}
    >
      <input
        type={INPUT_TYPES.HIDDEN}
        name={WORKER_AREA_FIELD.USERNAME}
        value={username}
      />
      <input
        type={INPUT_TYPES.HIDDEN}
        name={WORKER_AREA_FIELD.WORKER_ID}
        value={workerId}
      />
      <FormField
        id={WORKER_ACCOUNT_FIELD.EXPIRES_ON}
        name={WORKER_ACCOUNT_FIELD.EXPIRES_ON}
        label={WORKER_EXPIRY_COPY.DATE_LABEL}
        type={INPUT_TYPES.DATE}
        variant={FORM_FIELD_VARIANT.DEFAULT}
        labelSuffix={STRING.Empty}
        value={expiresOn}
        onChange={(event) =>
          setExpiresOn(event.target.value)
        }
      />
      <FormSubmitButton
        icon={MATERIAL_ICON_NAME.EVENT_AVAILABLE}
        isPending={isPending}
        label={WORKER_EXPIRY_COPY.EXTEND}
        pendingLabel={WORKER_EXPIRY_COPY.EXTEND_PENDING}
      />
      {refusal && (
        <Text
          role={ARIA_ROLE.ALERT}
          className={WORKER_AREA_CHANGE_ERROR_CLASS}
        >
          {WORKER_ACCOUNT_ERROR[refusal]}
        </Text>
      )}
    </form>
  );
};

export default WorkerExpiryForm;
