import { describe, expect, it, vi } from "vitest";
import {
  E2E_DATABASE_CONTAINER_EXPECTED,
  E2E_DATABASE_CONTAINER_FIXTURE,
} from "./ResolveE2eDatabaseContainer.constants";
import {
  resolveE2eDatabaseContainer,
  selectE2eDatabaseContainer,
} from "../resolveE2eDatabaseContainer";

const mocks = vi.hoisted(() => ({
  inspectContainers: vi.fn(),
  readContainerIds: vi.fn(),
}));

vi.mock("../inspectE2eDockerContainers", () => ({
  inspectE2eDockerContainers: mocks.inspectContainers,
}));

vi.mock("../readRunningE2eDockerContainerIds", () => ({
  readRunningE2eDockerContainerIds: mocks.readContainerIds,
}));

describe("selectE2eDatabaseContainer", () => {
  it("selects the isolated database matching the local API port", () => {
    const container = selectE2eDatabaseContainer(
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_URL,
      [
        E2E_DATABASE_CONTAINER_FIXTURE.DEFAULT_GATEWAY,
        E2E_DATABASE_CONTAINER_FIXTURE.DEFAULT_DATABASE,
        E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_GATEWAY,
        E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE,
      ]
    );

    expect(container).toBe(
      E2E_DATABASE_CONTAINER_EXPECTED.ISOLATED_NAME
    );
  });

  it("preserves the default local Supabase stack selection", () => {
    const container = selectE2eDatabaseContainer(
      E2E_DATABASE_CONTAINER_FIXTURE.DEFAULT_URL,
      [
        E2E_DATABASE_CONTAINER_FIXTURE.DEFAULT_GATEWAY,
        E2E_DATABASE_CONTAINER_FIXTURE.DEFAULT_DATABASE,
      ]
    );

    expect(container).toBe(
      E2E_DATABASE_CONTAINER_EXPECTED.DEFAULT_NAME
    );
  });
});

describe("rejects non-local database targets", () => {
  it("rejects a hosted Supabase URL", () => {
    expect(() =>
      selectE2eDatabaseContainer(
        E2E_DATABASE_CONTAINER_FIXTURE.REMOTE_URL,
        []
      )
    ).toThrow(
      E2E_DATABASE_CONTAINER_EXPECTED.REMOTE_URL_MESSAGE
    );
  });

  it("rejects when no gateway publishes the configured API port", () => {
    expect(() =>
      selectE2eDatabaseContainer(
        E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_URL,
        [E2E_DATABASE_CONTAINER_FIXTURE.DEFAULT_GATEWAY]
      )
    ).toThrow(
      E2E_DATABASE_CONTAINER_EXPECTED.MISSING_GATEWAY_MESSAGE
    );
  });
});

describe("rejects ambiguous or unmatched database containers", () => {
  it("rejects multiple gateways publishing the configured API port", () => {
    expect(() =>
      selectE2eDatabaseContainer(
        E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_URL,
        [
          E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_GATEWAY,
          E2E_DATABASE_CONTAINER_FIXTURE.SECOND_GATEWAY_ON_SAME_PORT,
        ]
      )
    ).toThrow(
      E2E_DATABASE_CONTAINER_EXPECTED.AMBIGUOUS_GATEWAY_MESSAGE
    );
  });

  it("rejects when the gateway has no matching database container", () => {
    expect(() =>
      selectE2eDatabaseContainer(
        E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_URL,
        [
          E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_GATEWAY,
          E2E_DATABASE_CONTAINER_FIXTURE.DEFAULT_DATABASE,
        ]
      )
    ).toThrow(
      E2E_DATABASE_CONTAINER_EXPECTED.MISSING_DATABASE_MESSAGE
    );
  });
});

describe("resolveE2eDatabaseContainer", () => {
  it("retries a URL after its first resolution fails", async () => {
    mocks.readContainerIds
      .mockRejectedValueOnce(
        new Error(
          E2E_DATABASE_CONTAINER_EXPECTED.TRANSIENT_INSPECTION_ERROR
        )
      )
      .mockResolvedValue(
        E2E_DATABASE_CONTAINER_FIXTURE.CONTAINER_IDS
      );
    mocks.inspectContainers.mockResolvedValue([
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_GATEWAY,
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE,
    ]);

    await expect(
      resolveE2eDatabaseContainer(
        E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_URL
      )
    ).rejects.toThrow(
      E2E_DATABASE_CONTAINER_EXPECTED.TRANSIENT_INSPECTION_ERROR
    );

    await expect(
      resolveE2eDatabaseContainer(
        E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_URL
      )
    ).resolves.toBe(
      E2E_DATABASE_CONTAINER_EXPECTED.ISOLATED_NAME
    );
    expect(mocks.readContainerIds).toHaveBeenCalledTimes(2);
  });
});
