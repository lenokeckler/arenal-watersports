import { buildE2eUsername } from "./buildE2eUsername";
import { createAuthUser } from "./createAuthUser";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { insertE2eWorker } from "./insertE2eWorker";
import type { E2eWorkerOptions } from "./models/E2eWorkerOptions.interface";
import type { ProvisionedE2eWorker } from "./models/ProvisionedE2eWorker.interface";
import { removeE2eWorker } from "./removeE2eWorker";
import { rollbackAuthUser } from "./rollbackAuthUser";

export const provisionE2eWorker = async ({
  mustChangePassword,
  password,
  personalEmail = null,
}: E2eWorkerOptions): Promise<ProvisionedE2eWorker> => {
  const supabase = createServiceRoleClient();
  const username = buildE2eUsername();
  const workerId = await createAuthUser(
    supabase,
    username,
    password
  );
  try {
    await insertE2eWorker(supabase, {
      mustChangePassword,
      personalEmail,
      username,
      workerId,
    });
  } catch (error) {
    return rollbackAuthUser(supabase, workerId, error);
  }

  return {
    remove: () => removeE2eWorker(supabase, workerId),
    username,
    workerId,
  };
};
