import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  E2E_SUPABASE_ENV,
  E2E_SUPABASE_ERROR,
} from "../../constants/E2eSupabase.constants";
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

const setSupabaseEnvironment = (url: string): void => {
  vi.stubEnv(
    E2E_SUPABASE_ENV.ANON_KEY,
    E2E_PSQL_SESSION_TEST.ANON_KEY
  );
  vi.stubEnv(
    E2E_SUPABASE_ENV.SERVICE_ROLE_KEY,
    E2E_PSQL_SESSION_TEST.SERVICE_ROLE_KEY
  );
  vi.stubEnv(E2E_SUPABASE_ENV.URL, url);
};

describe("runPsqlSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setSupabaseEnvironment(
      E2E_PSQL_SESSION_TEST.DATABASE_URL
    );
    mocks.readContainerIds.mockResolvedValue(
      E2E_PSQL_SESSION_TEST.CONTAINER_IDS
    );
    mocks.inspectContainers.mockResolvedValue([
      E2E_DATABASE_CONTAINER_FIXTURE.DEFAULT_GATEWAY,
      E2E_DATABASE_CONTAINER_FIXTURE.DEFAULT_DATABASE,
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_GATEWAY,
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE,
    ]);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("runs SQL in the database matching the local API port", async () => {
    const psql = createMockPsqlProcess();
    const spawnProcess = vi.fn().mockReturnValue(psql);
    const runPsqlSession =
      createPsqlSessionRunner(spawnProcess);
    const resultPromise = runPsqlSession(
      E2E_PSQL_SESSION_TEST.SQL
    );

    await vi.waitFor(() => {
      expect(mocks.readContainerIds).toHaveBeenCalledOnce();
    });
    await vi.waitFor(() => {
      expect(
        mocks.inspectContainers
      ).toHaveBeenCalledOnce();
    });
    await vi.waitFor(() => {
      expect(spawnProcess).toHaveBeenCalledOnce();
    });
    psql.stdout.write(
      E2E_PSQL_SESSION_TEST.STANDARD_OUTPUT
    );
    psql.stdin.end();
    psql.emit("close", 0);

    const result = await resultPromise;

    expect(spawnProcess).toHaveBeenCalledWith(
      E2E_PSQL_SESSION_TEST.EXECUTABLE,
      expect.arrayContaining([
        ...E2E_PSQL_SESSION_TEST.EXECUTION_ARGUMENTS,
        E2E_PSQL_SESSION_TEST.DATABASE_CONTAINER_NAME,
      ])
    );
    expect(psql.stdin.read()?.toString()).toBe(
      E2E_PSQL_SESSION_TEST.SQL
    );
    expect(result).toEqual(
      expect.objectContaining({
        exitCode: 0,
        stdout: E2E_PSQL_SESSION_TEST.STANDARD_OUTPUT,
      })
    );
    expect(mocks.inspectContainers).toHaveBeenCalledOnce();
  });

  it("rejects a hosted URL before starting Docker", async () => {
    setSupabaseEnvironment(
      E2E_PSQL_SESSION_TEST.REMOTE_URL
    );

    await expect(
      createPsqlSessionRunner(vi.fn())(
        E2E_PSQL_SESSION_TEST.SQL
      )
    ).rejects.toThrow(
      E2E_SUPABASE_ERROR.NOT_LOCAL(
        new URL(E2E_PSQL_SESSION_TEST.REMOTE_URL).hostname
      )
    );

    expect(mocks.inspectContainers).not.toHaveBeenCalled();
    expect(mocks.readContainerIds).not.toHaveBeenCalled();
  });
});
