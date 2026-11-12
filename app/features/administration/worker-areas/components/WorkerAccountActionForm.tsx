"use client";

import { useActionState } from "react";
import { Button, Text } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  INPUT_TYPES,
  WORKER_ACCOUNT_FIELD,
  WORKER_AREA_FIELD,
} from "@/app/constants";
import { submitWorkerAccountChange } from "../actions/submitWorkerAccountChange";
import {
  WORKER_ACCOUNT_ACTION_LABEL,
  WORKER_ACCOUNT_ERROR,
} from "../constants/WorkerAccountCopy.constants";
import type { WorkerAccountActionFormProps } from "../models/WorkerAccountActionFormProps.interface";
import type { WorkerAccountChangeState } from "../models/WorkerAccountChangeState.type";
import {
  WORKER_AREA_CHANGE_ERROR_CLASS,
  WORKER_AREA_CHANGE_FORM_CLASS,
  WORKER_AREA_REVOKE_BUTTON_CLASS,
} from "../styles/WorkerAreas.styles";

const WorkerAccountActionForm = ({
  action,
  username,
  workerId,
}: WorkerAccountActionFormProps): React.JSX.Element => {
  const [refusal, formAction, isPending] = useActionState<
    WorkerAccountChangeState,
    FormData
  >(submitWorkerAccountChange, null);
  const { label, pendingLabel } =
    WORKER_ACCOUNT_ACTION_LABEL[action];

  return (
    <form
      action={formAction}
      className={WORKER_AREA_CHANGE_FORM_CLASS}
    >
      <input
        type={INPUT_TYPES.HIDDEN}
        name={WORKER_ACCOUNT_FIELD.ACTION}
        value={action}
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
        className={WORKER_AREA_REVOKE_BUTTON_CLASS}
      >
        {isPending ? pendingLabel : label}
      </Button>
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

export default WorkerAccountActionForm;
