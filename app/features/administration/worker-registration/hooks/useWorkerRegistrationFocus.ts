import { useEffect, useMemo, useRef } from "react";
import { WORKER_REGISTRATION_FIELD } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { WORKER_REGISTRATION_FOCUS_ORDER } from "../constants/WorkerRegistrationForm.constants";
import { WORKER_REGISTRATION_STATUS } from "../constants/WorkerRegistrationStatus.constants";
import type { WorkerRegistrationFieldRefs } from "../models/WorkerRegistrationFieldRefs.type";
import type { WorkerRegistrationState } from "../models/WorkerRegistrationState.type";

export const useWorkerRegistrationFocus = (
  state: WorkerRegistrationState
): WorkerRegistrationFieldRefs => {
  const fullNameRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const usernameRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const fieldRefs = useMemo<WorkerRegistrationFieldRefs>(
    () => ({
      [WORKER_REGISTRATION_FIELD.FULL_NAME]: fullNameRef,
      [WORKER_REGISTRATION_FIELD.USERNAME]: usernameRef,
    }),
    []
  );

  useEffect(() => {
    if (
      state.status !== WORKER_REGISTRATION_STATUS.INVALID
    ) {
      return;
    }

    const firstInvalidField =
      WORKER_REGISTRATION_FOCUS_ORDER.find(
        (field) => state.fieldErrors[field]
      );

    if (firstInvalidField) {
      fieldRefs[firstInvalidField].current?.focus();
    }
  }, [fieldRefs, state]);

  return fieldRefs;
};
