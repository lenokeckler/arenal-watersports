import {
  E2E_SESSION_ACTIVITY_ERROR,
  E2E_SESSION_ACTIVITY_SQL,
} from "../constants/E2eSessionIdle.constants";
import { runWorkerSql } from "./runWorkerSql";

export const setSessionActivityAge = async (
  userId: string,
  age: string
): Promise<void> => {
  await runWorkerSql(
    E2E_SESSION_ACTIVITY_ERROR.SET_OPERATION,
    E2E_SESSION_ACTIVITY_SQL.SET_AGE,
    userId,
    { [E2E_SESSION_ACTIVITY_SQL.AGE_VARIABLE]: age }
  );
};
