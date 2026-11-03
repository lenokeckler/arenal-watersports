import type { ChildProcessWithoutNullStreams } from "node:child_process";
import type { PassThrough } from "node:stream";

export type MockPsqlProcess =
  ChildProcessWithoutNullStreams & {
    stderr: PassThrough;
    stdin: PassThrough;
    stdout: PassThrough;
  };
