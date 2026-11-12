import {
  POSTGRES_ERROR_CODE,
  SUPABASE_TABLE,
  WORKER_REGISTRATION_ERROR_CODE,
  type WorkerRegistrationErrorCode,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import type { NewWorkerRecord } from "./models/NewWorkerRecord.interface";

export const insertRegisteredWorker = async (
  supabase: ServerSupabaseClient,
  { createdBy, registration, userId }: NewWorkerRecord
): Promise<NullableRef<WorkerRegistrationErrorCode>> => {
  const { error } = await supabase
    .from(SUPABASE_TABLE.WORKERS)
    .insert({
      base_role: registration.baseRole,
      created_by: createdBy,
      full_name: registration.fullName,
      id: userId,
      must_change_password: true,
      updated_by: createdBy,
      username: registration.username,
    });

  if (!error) {
    return null;
  }

  return error.code === POSTGRES_ERROR_CODE.UNIQUE_VIOLATION
    ? WORKER_REGISTRATION_ERROR_CODE.USERNAME_TAKEN
    : WORKER_REGISTRATION_ERROR_CODE.FAILED;
};
