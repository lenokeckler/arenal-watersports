import { useActionState, useState } from "react";
import {
  WORKER_REGISTRATION_EMPTY_VALUES,
  WORKER_REGISTRATION_INITIAL_STATE,
} from "../constants/WorkerRegistrationForm.constants";
import type { WorkerRegistrationFieldEdits } from "../models/WorkerRegistrationFieldEdits.interface";
import type { WorkerRegistrationServerAction } from "../models/WorkerRegistrationServerAction.type";
import type { WorkerRegistrationViewModel } from "../models/WorkerRegistrationViewModel.interface";
import { isWorkerRegistrationValueName } from "../utils/isWorkerRegistrationValueName";
import { resolveWorkerRegistrationErrorCopy } from "../utils/resolveWorkerRegistrationErrorCopy";
import { useWorkerRegistrationFocus } from "./useWorkerRegistrationFocus";

export const useWorkerRegistrationViewModel = (
  action: WorkerRegistrationServerAction
): WorkerRegistrationViewModel => {
  const [state, formAction, isPending] = useActionState(
    action,
    WORKER_REGISTRATION_INITIAL_STATE
  );
  const [values, setValues] = useState(
    WORKER_REGISTRATION_EMPTY_VALUES
  );
  const [edits, setEdits] =
    useState<WorkerRegistrationFieldEdits>({
      answer: state,
      fields: [],
    });
  const editedFields =
    edits.answer === state ? edits.fields : [];
  const fieldRefs = useWorkerRegistrationFocus(state);

  return {
    errors: resolveWorkerRegistrationErrorCopy(
      state,
      editedFields
    ),
    fieldRefs,
    formAction,
    isPending,
    onChange: ({ target: { name, value } }) => {
      if (!isWorkerRegistrationValueName(name)) {
        return;
      }

      setValues((current) => ({
        ...current,
        [name]: value,
      }));
      setEdits({
        answer: state,
        fields: [...editedFields, name],
      });
    },
    state,
    values,
  };
};
