import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";
import type { MockPsqlProcess } from "./models/MockPsqlProcess.type";

export const createMockPsqlProcess =
  (): MockPsqlProcess => {
    const psql = Object.assign(new EventEmitter(), {
      stderr: new PassThrough(),
      stdin: new PassThrough(),
      stdout: new PassThrough(),
    });

    return psql as unknown as MockPsqlProcess;
  };
