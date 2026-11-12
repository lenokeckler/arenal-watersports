import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  E2E_DATABASE_RESOLVER,
  E2E_DOCKER,
} from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";

const run = promisify(execFile);

const readFailureReason = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

export const readRunningE2eDockerContainerIds =
  async (): Promise<string[]> => {
    let output: string;

    try {
      ({ stdout: output } = await run(
        E2E_DOCKER.EXECUTABLE,
        [E2E_DOCKER.PS_COMMAND, E2E_DOCKER.QUIET_FLAG]
      ));
    } catch (error: unknown) {
      return failE2eOperation(
        E2E_DATABASE_RESOLVER.ACTION,
        readFailureReason(error)
      );
    }

    const containerIds = output
      .split(/\s+/)
      .filter(Boolean);

    if (containerIds.length === 0) {
      return failE2eOperation(
        E2E_DATABASE_RESOLVER.ACTION,
        E2E_DATABASE_RESOLVER.EMPTY_CONTAINER_LIST
      );
    }

    return containerIds;
  };
