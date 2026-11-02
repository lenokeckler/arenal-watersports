import { describe, expect, it } from "vitest";
import {
  E2E_DATABASE_CONTAINER_EXPECTED,
  E2E_DATABASE_CONTAINER_FIXTURE,
} from "./ResolveE2eDatabaseContainer.constants";
import { selectE2eDatabaseContainer } from "../resolveE2eDatabaseContainer";

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
