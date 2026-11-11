import { E2E_FIRST_SIGN_IN_PASSWORDS } from "../constants/E2eFirstSignIn.constants";
import type { PendingWorker } from "./models/PendingWorker.interface";
import { provisionE2eWorker } from "./provisionE2eWorker";

export const createPendingWorker =
  async (): Promise<PendingWorker> => {
    const temporaryPassword =
      E2E_FIRST_SIGN_IN_PASSWORDS.TEMPORARY;
    const { remove, username } = await provisionE2eWorker({
      mustChangePassword: true,
      password: temporaryPassword,
    });

    return { remove, temporaryPassword, username };
  };
