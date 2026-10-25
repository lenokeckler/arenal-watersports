"use client";

import { useActionState } from "react";
import { Button, Text } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import FormSuccessNotice from "@/app/components/form-success-notice/FormSuccessNotice";
import TemporaryPasswordBox from "@/app/components/temporary-password-box/TemporaryPasswordBox";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  INPUT_TYPES,
  WORKER_AREA_FIELD,
} from "@/app/constants";
import { submitWorkerTemporaryPassword } from "../actions/submitWorkerTemporaryPassword";
import {
  WORKER_ACCOUNT_COPY,
  WORKER_ACCOUNT_ERROR,
} from "../constants/WorkerAccountCopy.constants";
import type { WorkerTemporaryPasswordFormProps } from "../models/WorkerTemporaryPasswordFormProps.interface";
import type { WorkerTemporaryPasswordState } from "../models/WorkerTemporaryPasswordState.type";
import {
  WORKER_AREA_CHANGE_ERROR_CLASS,
  WORKER_AREA_GRANT_BUTTON_CLASS,
  WORKER_TEMPORARY_PASSWORD_FORM_CLASS,
} from "../styles/WorkerAreas.styles";

const WorkerTemporaryPasswordForm = ({
  workerId,
}: WorkerTemporaryPasswordFormProps): React.JSX.Element => {
  const [grant, formAction, isPending] = useActionState<
    WorkerTemporaryPasswordState,
    FormData
  >(submitWorkerTemporaryPassword, null);

  if (grant?.ok) {
    return (
      <div className={WORKER_TEMPORARY_PASSWORD_FORM_CLASS}>
        <FormSuccessNotice
          message={
            WORKER_ACCOUNT_COPY.TEMPORARY_PASSWORD_DONE
          }
        />
        <TemporaryPasswordBox
          temporaryPassword={grant.temporaryPassword}
        />
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className={WORKER_TEMPORARY_PASSWORD_FORM_CLASS}
    >
      <input
        type={INPUT_TYPES.HIDDEN}
        name={WORKER_AREA_FIELD.WORKER_ID}
        value={workerId}
      />
      <Button
        type={BUTTON_TYPES.SUBMIT}
        variant={BUTTON.BASE}
        aria-disabled={isPending}
        className={WORKER_AREA_GRANT_BUTTON_CLASS}
      >
        {isPending
          ? WORKER_ACCOUNT_COPY.TEMPORARY_PASSWORD_PENDING
          : WORKER_ACCOUNT_COPY.TEMPORARY_PASSWORD}
      </Button>
      {grant && (
        <Text
          role={ARIA_ROLE.ALERT}
          className={WORKER_AREA_CHANGE_ERROR_CLASS}
        >
          {WORKER_ACCOUNT_ERROR[grant.result]}
        </Text>
      )}
    </form>
  );
};

export default WorkerTemporaryPasswordForm;
