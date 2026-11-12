import { normalizeUsername } from "@/app/utils/username/normalizeUsername";
import { findWorkerRegistrationErrors } from "./findWorkerRegistrationErrors";
import { isAssignableBaseRole } from "./isAssignableBaseRole";
import type { WorkerRegistrationCheck } from "./models/WorkerRegistrationCheck.type";
import type { WorkerRegistrationInput } from "./models/WorkerRegistrationInput.interface";
import { normalizeWorkerFullName } from "./normalizeWorkerFullName";

export const checkWorkerRegistration = ({
  baseRole,
  fullName,
  username,
}: WorkerRegistrationInput): WorkerRegistrationCheck => {
  const normalized = {
    fullName: normalizeWorkerFullName(fullName),
    username: normalizeUsername(username),
  };
  const fieldErrors = findWorkerRegistrationErrors({
    ...normalized,
    baseRole,
  });

  if (
    !isAssignableBaseRole(baseRole) ||
    Object.keys(fieldErrors).length > 0
  ) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    registration: { ...normalized, baseRole },
  };
};
