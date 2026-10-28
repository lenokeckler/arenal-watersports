import { WORKER_REGISTRATION_ERROR_CODE } from "@/app/constants";
import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { WorkerRegistration } from "@/app/utils/worker-registration/models/WorkerRegistration.interface";
import { createWorkerAuthUser } from "./createWorkerAuthUser";
import { deleteWorkerAuthUser } from "./deleteWorkerAuthUser";
import { generateTemporaryPassword } from "./generateTemporaryPassword";
import { insertRegisteredWorker } from "./insertRegisteredWorker";
import { isSignedInAdministrator } from "./isSignedInAdministrator";
import type { WorkerRegistrationResult } from "./models/WorkerRegistrationResult.type";

export const registerWorker = async (
  supabase: ServerSupabaseClient,
  registration: WorkerRegistration
): Promise<WorkerRegistrationResult> => {
  const createdBy = await readSignedInUserId(supabase);

  if (
    !createdBy ||
    !(await isSignedInAdministrator(supabase))
  ) {
    return {
      ok: false,
      code: WORKER_REGISTRATION_ERROR_CODE.NOT_ALLOWED,
    };
  }

  const temporaryPassword = generateTemporaryPassword();
  const authUser = await createWorkerAuthUser(
    registration.username,
    temporaryPassword
  );

  if (!authUser.ok) {
    return authUser;
  }

  const insertError = await insertRegisteredWorker(
    supabase,
    {
      createdBy,
      registration,
      userId: authUser.userId,
    }
  );

  if (insertError) {
    await deleteWorkerAuthUser(authUser.userId);

    return { ok: false, code: insertError };
  }

  return {
    ok: true,
    registered: { ...registration, temporaryPassword },
  };
};
