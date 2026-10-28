import {
  E2E_AUTH_SESSIONS,
  E2E_AUTH_SESSIONS_ERROR,
} from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";
import { runAuthSessionsPsql } from "./runAuthSessionsPsql";

export const countAuthSessions = async (
  userId: string
): Promise<number> => {
  const output = await runAuthSessionsPsql(
    E2E_AUTH_SESSIONS_ERROR.COUNT_OPERATION,
    E2E_AUTH_SESSIONS.COUNT_QUERY,
    userId
  );
  const count = Number(output);

  return Number.isInteger(count) && output !== ""
    ? count
    : failE2eOperation(
        E2E_AUTH_SESSIONS_ERROR.COUNT_OPERATION,
        E2E_AUTH_SESSIONS_ERROR.NOT_AN_INTEGER(output)
      );
};
