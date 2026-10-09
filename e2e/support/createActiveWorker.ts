import { E2E_ACTIVE_WORKER } from "../constants/E2eActiveWorker.constants";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import type { ActiveWorkerOptions } from "./models/ActiveWorkerOptions.interface";
import { provisionE2eWorker } from "./provisionE2eWorker";

export const createActiveWorker = async ({
  personalEmail = null,
}: ActiveWorkerOptions = {}): Promise<ActiveWorker> => {
  const password = E2E_ACTIVE_WORKER.PASSWORD;
  const { remove, username, workerId } =
    await provisionE2eWorker({
      mustChangePassword: false,
      password,
      personalEmail,
    });

  return { id: workerId, password, remove, username };
};
