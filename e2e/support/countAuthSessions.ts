import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { E2E_AUTH_SESSIONS } from "../constants/E2eSupabase.constants";
import { readLocalSupabaseEnvironment } from "./readLocalSupabaseEnvironment";

const run = promisify(execFile);

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
    `${E2E_AUTH_SESSIONS.USER_ID_VARIABLE}=${userId}`,
    "-f",
    "-",
  ]);
  psql.child.stdin?.end(E2E_AUTH_SESSIONS.QUERY);
  const { stdout } = await psql;

  return Number(stdout.trim());
};
