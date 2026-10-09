import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  E2E_AUTH_SESSIONS,
  E2E_AUTH_SESSIONS_ERROR,
} from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";
import { readLocalSupabaseEnvironment } from "./readLocalSupabaseEnvironment";

const run = promisify(execFile);

const readFailureReason = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

export const countAuthSessions = async (
  userId: string
): Promise<number> => {
  readLocalSupabaseEnvironment();

  const psql = run("docker", [
    "exec",
    "-i",
    E2E_AUTH_SESSIONS.DATABASE_CONTAINER,
    "psql",
    "-U",
    E2E_AUTH_SESSIONS.DATABASE_USER,
    "-d",
    E2E_AUTH_SESSIONS.DATABASE,
    "-tA",
    "-v",
    E2E_AUTH_SESSIONS.STOP_ON_ERROR_VARIABLE,
    "-v",
    `${E2E_AUTH_SESSIONS.USER_ID_VARIABLE}=${userId}`,
    "-f",
    "-",
  ]);
  psql.child.stdin?.end(E2E_AUTH_SESSIONS.QUERY);
  const output = await psql.then(
    ({ stdout }) => stdout.trim(),
    (error: unknown) =>
      failE2eOperation(
        E2E_AUTH_SESSIONS_ERROR.COUNT_OPERATION,
        E2E_AUTH_SESSIONS_ERROR.EXEC_FAILED(
          E2E_AUTH_SESSIONS.DATABASE_CONTAINER,
          readFailureReason(error)
        )
      )
  );
  const count = Number(output);

  return Number.isInteger(count) && output !== ""
    ? count
    : failE2eOperation(
        E2E_AUTH_SESSIONS_ERROR.COUNT_OPERATION,
        E2E_AUTH_SESSIONS_ERROR.NOT_AN_INTEGER(output)
      );
};
