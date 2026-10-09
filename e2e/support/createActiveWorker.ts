import { E2E_ACTIVE_WORKER } from "../constants/E2eActiveWorker.constants";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { provisionE2eWorker } from "./provisionE2eWorker";

export const createActiveWorker =
  async (): Promise<ActiveWorker> => {
    const password = E2E_ACTIVE_WORKER.PASSWORD;
    const { remove, username, workerId } =
      await provisionE2eWorker({
        mustChangePassword: false,
        password,
      });

    return { id: workerId, password, remove, username };
  };
