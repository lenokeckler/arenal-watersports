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

export const runWorkerSql = (
  operation: string,
  query: string,
  userId: string,
  variables: Readonly<Record<string, string>> = {}
): Promise<string> => {
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
    ...Object.entries(variables).flatMap(
      ([name, value]) => ["-v", `${name}=${value}`]
    ),
    "-f",
    "-",
  ]);
  psql.child.stdin?.end(query);

  return psql.then(
    ({ stdout }) => stdout.trim(),
    (error: unknown) =>
      failE2eOperation(
        operation,
        E2E_AUTH_SESSIONS_ERROR.EXEC_FAILED(
          E2E_AUTH_SESSIONS.DATABASE_CONTAINER,
          readFailureReason(error)
        )
      )
  );
};
