import { spawn } from "node:child_process";
import { E2E_UNIT_CONCURRENCY } from "../constants/E2eUnitConcurrency.constants";
import { E2E_DOCKER } from "../constants/E2eSupabase.constants";
import type { PsqlSessionResult } from "./models/PsqlSessionResult.interface";
import type { PsqlSessionSpawnProcess } from "./models/PsqlSessionSpawnProcess.type";
import { readLocalSupabaseEnvironment } from "./readLocalSupabaseEnvironment";
import { resolveE2eDatabaseContainer } from "./resolveE2eDatabaseContainer";

const executePsqlSession = (
  spawnProcess: PsqlSessionSpawnProcess,
  databaseContainer: string,
  sql: string
): Promise<PsqlSessionResult> =>
  new Promise((resolve, reject) => {
    const startedAt = Date.now();
    const psql = spawnProcess(E2E_DOCKER.EXECUTABLE, [
      "exec",
      "-i",
      databaseContainer,
      "psql",
      "-U",
      E2E_UNIT_CONCURRENCY.DATABASE_USER,
      "-d",
      E2E_UNIT_CONCURRENCY.DATABASE,
      "-tA",
      "-v",
      "ON_ERROR_STOP=1",
      "-f",
      "-",
    ]);
    const output = { stderr: "", stdout: "" };
    psql.stdout.on("data", (chunk: Buffer) => {
      output.stdout += chunk.toString();
    });
    psql.stderr.on("data", (chunk: Buffer) => {
      output.stderr += chunk.toString();
    });
    psql.on("error", reject);
    psql.on("close", (code) =>
      resolve({
        durationMilliseconds: Date.now() - startedAt,
        exitCode: code ?? 1,
        ...output,
      })
    );
    psql.stdin.end(sql);
  });

export const createPsqlSessionRunner =
  (spawnProcess: PsqlSessionSpawnProcess = spawn) =>
  async (sql: string): Promise<PsqlSessionResult> => {
    const { url } = readLocalSupabaseEnvironment();
    const databaseContainer =
      await resolveE2eDatabaseContainer(url);

    return executePsqlSession(
      spawnProcess,
      databaseContainer,
      sql
    );
  };

export const runPsqlSession = createPsqlSessionRunner();
