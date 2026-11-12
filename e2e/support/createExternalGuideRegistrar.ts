import { toAuthEmail } from "@/app/utils/username/toAuthEmail";
import { E2E_EXTERNAL_GUIDE } from "../constants/E2eExternalGuideRegistration.constants";
import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { buildE2eUsername } from "./buildE2eUsername";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { removeE2eWorker } from "./removeE2eWorker";
import type { ExternalGuideRegistrar } from "./models/ExternalGuideRegistrar.interface";

export const createExternalGuideRegistrar = async (
  withMark: boolean
): Promise<ExternalGuideRegistrar> => {
  const client = createServiceRoleClient();
  const username = buildE2eUsername();
  const { data, error: authError } =
    await client.auth.admin.createUser({
      email: toAuthEmail(username),
      email_confirm: true,
      password: E2E_EXTERNAL_GUIDE.CREATOR_PASSWORD,
    });

  if (authError) {
    throw authError;
  }

  const workerId = data.user.id;

  try {
    const { error: workerError } = await client
      .from(E2E_SUPABASE_TABLE.WORKERS)
      .insert({
        base_role: E2E_EXTERNAL_GUIDE.RESERVATIONS_ROLE,
        full_name: E2E_EXTERNAL_GUIDE.CREATOR_NAME,
        id: workerId,
        must_change_password: false,
        username,
      });

    if (workerError) {
      throw workerError;
    }

    if (withMark) {
      const { error: markError } = await client
        .from(E2E_SUPABASE_TABLE.WORKER_MARKS)
        .insert({
          granted_by: workerId,
          mark: E2E_EXTERNAL_GUIDE.REGISTRAR_MARK,
          worker_id: workerId,
        });

      if (markError) {
        throw markError;
      }
    }
  } catch (error) {
    await removeE2eWorker(client, workerId);
    throw error;
  }

  return {
    password: E2E_EXTERNAL_GUIDE.CREATOR_PASSWORD,
    remove: () => removeE2eWorker(client, workerId),
    username,
    workerId,
  };
};
