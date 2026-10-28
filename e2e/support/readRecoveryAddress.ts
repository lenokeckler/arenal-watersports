import { E2E_RECOVERY_ADDRESS_ERROR } from "../constants/E2ePasswordRecoveryReset.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { RecoveryAccount } from "./models/RecoveryAccount.interface";

export const readRecoveryAddress = (
  account: RecoveryAccount
): string =>
  account.address ??
  failE2eOperation(
    E2E_RECOVERY_ADDRESS_ERROR.OPERATION,
    E2E_RECOVERY_ADDRESS_ERROR.MISSING
  );
