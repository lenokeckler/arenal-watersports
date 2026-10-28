import { E2E_LOGIN_ACCOUNT } from "../constants/E2eLogin.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { clearMailTo } from "./clearMailTo";
import { deleteAuthSessions } from "./deleteAuthSessions";
import type { SeededAdmin } from "./models/SeededAdmin.interface";
import { removeWorkerRecoveryPins } from "./removeWorkerRecoveryPins";
import { resetPasswordRecoveryRequests } from "./resetPasswordRecoveryRequests";
import { setAuthUserPassword } from "./setAuthUserPassword";
import { setWorkerFailedAttempts } from "./setWorkerFailedAttempts";

export const restoreSeededAdmin = async (
  admin: SeededAdmin
): Promise<void> => {
  await setAuthUserPassword(
    admin.id,
    E2E_LOGIN_ACCOUNT.PASSWORD
  );
  await setWorkerFailedAttempts(admin.id, E2E_COUNT.NONE);
  await deleteAuthSessions(admin.id);
  await removeWorkerRecoveryPins(admin.id);
  await clearMailTo(admin.personalEmail);
  await resetPasswordRecoveryRequests();
};
