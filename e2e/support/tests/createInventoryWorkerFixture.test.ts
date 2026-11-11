import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { WORK_AREA } from "@/app/constants";
import { E2E_INVENTORY_WORKER_FIXTURE_TEST } from "./CreateInventoryWorkerFixture.constants";
import { createInventoryWorkerFixture } from "../createInventoryWorkerFixture";

const mocks = vi.hoisted(() => ({
  adminDeleteUser: vi.fn(),
  authUser: vi.fn(),
  from: vi.fn(),
  insert: vi.fn(),
  localClient: vi.fn(),
}));

vi.mock("../createInventoryAuthUser", () => ({
  createInventoryAuthUser: mocks.authUser,
}));

vi.mock("../createLocalInventoryClient", () => ({
  createLocalInventoryClient: mocks.localClient,
}));

describe("createInventoryWorkerFixture", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.localClient.mockReturnValue({
      auth: {
        admin: {
          deleteUser: mocks.adminDeleteUser,
        },
      },
      from: mocks.from,
    });
    mocks.from.mockReturnValue({ insert: mocks.insert });
    mocks.authUser.mockResolvedValue(
      E2E_INVENTORY_WORKER_FIXTURE_TEST.USER_ID
    );
  });

  it("preserves the worker insert and cleanup failures", async () => {
    const workerError = new Error();
    const cleanupError = new Error();
    mocks.insert.mockResolvedValue({ error: workerError });
    mocks.adminDeleteUser.mockResolvedValue({
      error: cleanupError,
    });

    await expect(
      createInventoryWorkerFixture(WORK_AREA.OPERATIONS)
    ).rejects.toMatchObject({
      errors: [workerError, cleanupError],
    });
  });
});
