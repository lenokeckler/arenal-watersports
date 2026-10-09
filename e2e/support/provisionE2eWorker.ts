import { randomUUID } from "node:crypto";
import { STRING } from "@/app/constants";
import { E2E_WORKER } from "../constants/E2eWorker.constants";
import { createAuthUser } from "./createAuthUser";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { insertE2eWorker } from "./insertE2eWorker";
import type { E2eWorkerOptions } from "./models/E2eWorkerOptions.interface";
import type { ProvisionedE2eWorker } from "./models/ProvisionedE2eWorker.interface";
import { removeE2eWorker } from "./removeE2eWorker";
import { rollbackAuthUser } from "./rollbackAuthUser";

const buildUsername = (): string =>
  `${E2E_WORKER.USERNAME_PREFIX}${randomUUID()
    .replaceAll("-", STRING.Empty)
    .slice(0, E2E_WORKER.USERNAME_SUFFIX_LENGTH)}`;

export const provisionE2eWorker = async ({
  mustChangePassword,
  password,
  personalEmail = null,
}: E2eWorkerOptions): Promise<ProvisionedE2eWorker> => {
  const supabase = createServiceRoleClient();
  const username = buildUsername();
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
