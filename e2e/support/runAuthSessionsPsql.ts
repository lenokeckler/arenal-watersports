import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  E2E_AUTH_SESSIONS,
  E2E_AUTH_SESSIONS_ERROR,
} from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";
import { readLocalSupabaseEnvironment } from "./readLocalSupabaseEnvironment";
import { resolveE2eDatabaseContainer } from "./resolveE2eDatabaseContainer";

const run = promisify(execFile);

const readFailureReason = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

export const runAuthSessionsPsql = async (
  operation: string,
  query: string,
  userId: string
): Promise<string> => {
  const { url } = readLocalSupabaseEnvironment();
  const databaseContainer =
    await resolveE2eDatabaseContainer(url);

  const psql = run("docker", [
    "exec",
    "-i",
    databaseContainer,
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
  psql.child.stdin?.end(query);

  return psql.then(
    ({ stdout }) => stdout.trim(),
    (error: unknown) =>
      failE2eOperation(
        operation,
        E2E_AUTH_SESSIONS_ERROR.EXEC_FAILED(
          databaseContainer,
          readFailureReason(error)
        )
      )
  );
};
