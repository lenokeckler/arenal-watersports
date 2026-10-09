import { randomUUID } from "node:crypto";
import { STRING } from "@/app/constants";
import { E2E_PENDING_WORKER } from "../constants/E2eFirstSignIn.constants";
import { createAuthUser } from "./createAuthUser";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { insertE2eWorker } from "./insertE2eWorker";
import type { E2eWorkerOptions } from "./models/E2eWorkerOptions.interface";
import type { ProvisionedE2eWorker } from "./models/ProvisionedE2eWorker.interface";
import { removeE2eWorker } from "./removeE2eWorker";

const buildUsername = (): string =>
  `${E2E_PENDING_WORKER.USERNAME_PREFIX}${randomUUID()
    .replaceAll("-", STRING.Empty)
    .slice(0, E2E_PENDING_WORKER.USERNAME_SUFFIX_LENGTH)}`;

export const provisionE2eWorker = async ({
  mustChangePassword,
  password,
}: E2eWorkerOptions): Promise<ProvisionedE2eWorker> => {
  const supabase = createServiceRoleClient();
  const username = buildUsername();
  const workerId = await createAuthUser(
    supabase,
    username,
    password
  );
  await insertE2eWorker(supabase, {
    mustChangePassword,
    username,
    workerId,
  });

  return {
    remove: () => removeE2eWorker(supabase, workerId),
    username,
    workerId,
  };
};
