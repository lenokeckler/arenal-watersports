import { createServiceRoleClient } from "./createServiceRoleClient";
import { readWorkerIdByUsername } from "./readWorkerIdByUsername";
import { removeE2eWorker } from "./removeE2eWorker";

export const removeRegisteredWorker = async (
  username: string
): Promise<void> => {
  await removeE2eWorker(
    createServiceRoleClient(),
    await readWorkerIdByUsername(username)
  );
};
