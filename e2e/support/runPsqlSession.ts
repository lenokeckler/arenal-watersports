import { spawn } from "node:child_process";
import { E2E_UNIT_CONCURRENCY } from "../constants/E2eUnitConcurrency.constants";
import type { PsqlSessionResult } from "./models/PsqlSessionResult.interface";

export const runPsqlSession = (
  sql: string
): Promise<PsqlSessionResult> =>
  new Promise((resolve) => {
    const startedAt = Date.now();
    const psql = spawn("docker", [
      "exec",
      "-i",
      E2E_UNIT_CONCURRENCY.CONTAINER,
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
    let stdout = "";
    let stderr = "";
    psql.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    psql.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    psql.on("close", (code) => {
      resolve({
        durationMilliseconds: Date.now() - startedAt,
        exitCode: code ?? 1,
        stderr,
        stdout,
      });
    });
    psql.stdin.end(sql);
  });
