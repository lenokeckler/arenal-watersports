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
import {
  WORKER_AREA_CHANGE_ERROR,
  WORKER_AREAS_COPY,
} from "../constants/WorkerAreasCopy.constants";
import type { WorkerAreaChangeFormProps } from "../models/WorkerAreaChangeFormProps.interface";
import {
  WORKER_AREA_CHANGE_ERROR_CLASS,
  WORKER_AREA_CHANGE_FORM_CLASS,
  WORKER_AREA_GRANT_BUTTON_CLASS,
  WORKER_AREA_REVOKE_BUTTON_CLASS,
} from "../styles/WorkerAreas.styles";

const BUTTON_COPY = {
  [WORKER_AREA_INTENT.GRANT]: {
    className: WORKER_AREA_GRANT_BUTTON_CLASS,
    label: WORKER_AREAS_COPY.GRANT,
    pendingLabel: WORKER_AREAS_COPY.GRANTING,
  },
  [WORKER_AREA_INTENT.REVOKE]: {
    className: WORKER_AREA_REVOKE_BUTTON_CLASS,
    label: WORKER_AREAS_COPY.REVOKE,
    pendingLabel: WORKER_AREAS_COPY.REVOKING,
  },
} as const;

const WorkerAreaChangeForm = ({
  action,
  area,
  intent,
  username,
  workerId,
}: WorkerAreaChangeFormProps): React.JSX.Element => {
  const [refusal, formAction, isPending] = useActionState(
    action,
    null
  );
  const { className, label, pendingLabel } =
    BUTTON_COPY[intent];

  return (
    <form
      action={formAction}
      className={WORKER_AREA_CHANGE_FORM_CLASS}
    >
      <input
        type={INPUT_TYPES.HIDDEN}
        name={WORKER_AREA_FIELD.AREA}
        value={area}
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
        className={className}
      >
        {isPending ? pendingLabel : label}
      </Button>
      {refusal && (
        <Text
          role={ARIA_ROLE.ALERT}
          className={WORKER_AREA_CHANGE_ERROR_CLASS}
        >
          {WORKER_AREA_CHANGE_ERROR[refusal]}
        </Text>
      )}
    </form>
  );
};

export default WorkerAreaChangeForm;
