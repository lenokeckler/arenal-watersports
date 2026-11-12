import {
  E2E_SESSION_ACTIVITY_ERROR,
  E2E_SESSION_ACTIVITY_SQL,
} from "../constants/E2eSessionIdle.constants";
import { failE2eOperation } from "./failE2eOperation";
import { runWorkerSql } from "./runWorkerSql";

export const readSecondsSinceSessionActivity = async (
  userId: string
): Promise<number> => {
  const output = await runWorkerSql(
    E2E_SESSION_ACTIVITY_ERROR.READ_OPERATION,
    E2E_SESSION_ACTIVITY_SQL.SECONDS_SINCE_LAST,
    userId
  );
  const seconds = Number(output);

  return Number.isInteger(seconds) && output !== ""
    ? seconds
    : failE2eOperation(
        E2E_SESSION_ACTIVITY_ERROR.READ_OPERATION,
        E2E_SESSION_ACTIVITY_ERROR.NOT_AN_INTEGER(output)
      );
};
