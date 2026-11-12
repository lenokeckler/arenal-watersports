"use client";

import { useActionState } from "react";
import { Button, Text } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  INPUT_TYPES,
  WORKER_AREA_FIELD,
  WORKER_AREA_INTENT,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { WorkerAccessChangeFormProps } from "../models/WorkerAccessChangeFormProps.interface";
import {
  WORKER_AREA_CHANGE_ERROR_CLASS,
  WORKER_AREA_CHANGE_FORM_CLASS,
  WORKER_AREA_GRANT_BUTTON_CLASS,
  WORKER_AREA_REVOKE_BUTTON_CLASS,
} from "../styles/WorkerAreas.styles";

const BUTTON_CLASS = {
  [WORKER_AREA_INTENT.GRANT]:
    WORKER_AREA_GRANT_BUTTON_CLASS,
  [WORKER_AREA_INTENT.REVOKE]:
    WORKER_AREA_REVOKE_BUTTON_CLASS,
} as const;

const WorkerAccessChangeForm = <Result extends string>({
  action,
  errorCopy,
  intent,
  labels,
  targetName,
  targetValue,
  username,
  workerId,
}: WorkerAccessChangeFormProps<Result>): React.JSX.Element => {
  const [refusal, formAction, isPending] = useActionState<
    NullableRef<Result>,
    FormData
  >(action, null);
  const label = {
    [WORKER_AREA_INTENT.GRANT]: isPending
      ? labels.granting
      : labels.grant,
    [WORKER_AREA_INTENT.REVOKE]: isPending
      ? labels.revoking
      : labels.revoke,
  }[intent];

  return (
    <form
      action={formAction}
      className={WORKER_AREA_CHANGE_FORM_CLASS}
    >
      <input
        type={INPUT_TYPES.HIDDEN}
        name={targetName}
        value={targetValue}
      />
      <input
        type={INPUT_TYPES.HIDDEN}
        name={WORKER_AREA_FIELD.INTENT}
        value={intent}
      />
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
      <Button
        type={BUTTON_TYPES.SUBMIT}
        variant={BUTTON.BASE}
        aria-disabled={isPending}
        className={BUTTON_CLASS[intent]}
      >
        {label}
      </Button>
      {refusal && (
        <Text
          role={ARIA_ROLE.ALERT}
          className={WORKER_AREA_CHANGE_ERROR_CLASS}
        >
          {errorCopy[refusal]}
        </Text>
      )}
    </form>
  );
};

export default WorkerAccessChangeForm;
