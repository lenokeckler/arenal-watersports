import {
  SUPABASE_AUTH_ERROR_CODE,
  WORKER_REGISTRATION_ERROR_CODE,
} from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { toAuthEmail } from "@/app/utils/username/toAuthEmail";
import type { WorkerAuthUserResult } from "./models/WorkerAuthUserResult.type";

export const createWorkerAuthUser = async (
  username: string,
  temporaryPassword: string
): Promise<WorkerAuthUserResult> => {
  const { data, error } =
    await createServiceRoleSupabaseClient().auth.admin.createUser(
      {
        email: toAuthEmail(username),
        email_confirm: true,
        password: temporaryPassword,
      }
    );

  if (error) {
    return {
      ok: false,
      code:
        error.code === SUPABASE_AUTH_ERROR_CODE.EMAIL_EXISTS
          ? WORKER_REGISTRATION_ERROR_CODE.USERNAME_TAKEN
          : WORKER_REGISTRATION_ERROR_CODE.FAILED,
    };
  }

  return { ok: true, userId: data.user.id };
};
