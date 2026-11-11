import {
  E2E_AUTH_SESSIONS,
  E2E_AUTH_SESSIONS_ERROR,
} from "../constants/E2eSupabase.constants";
import { runAuthSessionsPsql } from "./runAuthSessionsPsql";

export const deleteAuthSessions = async (
  userId: string
): Promise<void> => {
  await runAuthSessionsPsql(
    E2E_AUTH_SESSIONS_ERROR.DELETE_OPERATION,
    E2E_AUTH_SESSIONS.DELETE_QUERY,
    userId
  );
};
