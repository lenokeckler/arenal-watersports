import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { E2E_SUPABASE_ENV } from "../../constants/E2eSupabase.constants";
import { E2E_DATABASE_CONTAINER_FIXTURE } from "./ResolveE2eDatabaseContainer.constants";
import { E2E_PSQL_SESSION_TEST } from "./RunPsqlSession.constants";
import { createPsqlSessionRunner } from "../runPsqlSession";
import { createMockPsqlProcess } from "./createMockPsqlProcess";

const mocks = vi.hoisted(() => ({
  inspectContainers: vi.fn(),
  readContainerIds: vi.fn(),
}));

vi.mock("@next/env", () => ({
  loadEnvConfig: vi.fn(),
}));

vi.mock("../inspectE2eDockerContainers", () => ({
  inspectE2eDockerContainers: mocks.inspectContainers,
}));

vi.mock("../readRunningE2eDockerContainerIds", () => ({
  readRunningE2eDockerContainerIds: mocks.readContainerIds,
}));

const setSupabaseEnvironment = (): void => {
  vi.stubEnv(
    E2E_SUPABASE_ENV.ANON_KEY,
    E2E_PSQL_SESSION_TEST.ANON_KEY
  );
  vi.stubEnv(
    E2E_SUPABASE_ENV.SERVICE_ROLE_KEY,
    E2E_PSQL_SESSION_TEST.SERVICE_ROLE_KEY
  );
  vi.stubEnv(
    E2E_SUPABASE_ENV.URL,
    E2E_PSQL_SESSION_TEST.DATABASE_URL
  );
};

describe("runPsqlSession process failures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setSupabaseEnvironment();
    mocks.readContainerIds.mockResolvedValue(
      E2E_PSQL_SESSION_TEST.CONTAINER_IDS
    );
    mocks.inspectContainers.mockResolvedValue([
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_GATEWAY,
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE,
    ]);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("rejects when Docker cannot start the process", async () => {
    const psql = createMockPsqlProcess();
    const spawnProcess = vi.fn().mockReturnValue(psql);
    const runPsqlSession =
      createPsqlSessionRunner(spawnProcess);
    const resultPromise = runPsqlSession(
      E2E_PSQL_SESSION_TEST.SQL
    );
    const processError = new Error(
      E2E_PSQL_SESSION_TEST.PROCESS_ERROR
    );

    await vi.waitFor(() => {
      expect(spawnProcess).toHaveBeenCalledOnce();
    });
    psql.emit("error", processError);

    await expect(resultPromise).rejects.toBe(processError);
  });

  it("reports a nonzero process exit code", async () => {
    const psql = createMockPsqlProcess();
    const spawnProcess = vi.fn().mockReturnValue(psql);
    const runPsqlSession =
      createPsqlSessionRunner(spawnProcess);
    const resultPromise = runPsqlSession(
      E2E_PSQL_SESSION_TEST.SQL
    );

    await vi.waitFor(() => {
      expect(spawnProcess).toHaveBeenCalledOnce();
    });
    psql.stderr.write(E2E_PSQL_SESSION_TEST.PROCESS_ERROR);
    psql.stdin.end();
    psql.emit(
      "close",
      E2E_PSQL_SESSION_TEST.FAILED_EXIT_CODE
    );

    await expect(resultPromise).resolves.toEqual(
      expect.objectContaining({
        exitCode: E2E_PSQL_SESSION_TEST.FAILED_EXIT_CODE,
        stderr: E2E_PSQL_SESSION_TEST.PROCESS_ERROR,
      })
    );
  });
});
