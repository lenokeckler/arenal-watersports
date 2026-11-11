import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  E2E_DATABASE_RESOLVER,
  E2E_DOCKER,
} from "../constants/E2eSupabase.constants";
import type { E2eDockerContainer } from "./models/E2eDockerContainer.interface";
import { failE2eOperation } from "./failE2eOperation";
import { parseE2eDockerContainerMetadata } from "./parseE2eDockerContainerMetadata";

const run = promisify(execFile);
const readFailureReason = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

export const inspectE2eDockerContainers = async (
  containerIds: readonly string[]
): Promise<E2eDockerContainer[]> => {
  let output: string;

  try {
    ({ stdout: output } = await run(E2E_DOCKER.EXECUTABLE, [
      E2E_DOCKER.INSPECT_COMMAND,
      E2E_DOCKER.FORMAT_FLAG,
      E2E_DOCKER.INSPECT_FORMAT,
      ...containerIds,
    ]));
  } catch (error: unknown) {
    return failE2eOperation(
      E2E_DATABASE_RESOLVER.ACTION,
      E2E_DATABASE_RESOLVER.DOCKER_COMMAND_FAILED(
        readFailureReason(error)
      )
    );
  }

  return parseE2eDockerContainerMetadata(
    output,
    containerIds.length
  );
};
