import type { ChildProcessWithoutNullStreams } from "node:child_process";

export type PsqlSessionSpawnProcess = (
  command: string,
  arguments_: string[]
) => ChildProcessWithoutNullStreams;
