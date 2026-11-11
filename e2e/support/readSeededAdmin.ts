import { E2E_LOGIN_ACCOUNT } from "../constants/E2eLogin.constants";
import { E2E_SEEDED_ADMIN_ERROR } from "../constants/E2eAdminRecovery.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { SeededAdmin } from "./models/SeededAdmin.interface";
import { readWorkerIdByUsername } from "./readWorkerIdByUsername";
import { readWorkerPersonalEmail } from "./readWorkerPersonalEmail";

export const readSeededAdmin =
  async (): Promise<SeededAdmin> => {
    const id = await readWorkerIdByUsername(
      E2E_LOGIN_ACCOUNT.USERNAME
    );
    const personalEmail = await readWorkerPersonalEmail(id);

    if (!personalEmail) {
      return failE2eOperation(
        E2E_SEEDED_ADMIN_ERROR.OPERATION,
        E2E_SEEDED_ADMIN_ERROR.NO_PERSONAL_EMAIL
      );
    }

    return { id, personalEmail };
  };
