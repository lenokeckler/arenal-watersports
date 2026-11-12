import { describe, expect, it } from "vitest";
import { E2E_DATABASE_CONTAINER_FIXTURE } from "./ResolveE2eDatabaseContainer.constants";
import {
  E2E_DOCKER_CONTAINER_METADATA_EXPECTED,
  E2E_DOCKER_CONTAINER_METADATA_FIXTURE,
} from "./E2eDockerContainerMetadata.constants";
import { parseE2eDockerContainerMetadata } from "../parseE2eDockerContainerMetadata";

describe("parseE2eDockerContainerMetadata", () => {
  it("parses the selected Docker container metadata", () => {
    const containers = parseE2eDockerContainerMetadata(
      E2E_DOCKER_CONTAINER_METADATA_FIXTURE.VALID,
      E2E_DOCKER_CONTAINER_METADATA_FIXTURE.CONTAINER_COUNT
    );

    expect(containers).toEqual([
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE,
    ]);
  });

  it("rejects an unexpected number of metadata lines", () => {
    expect(() =>
      parseE2eDockerContainerMetadata(
        E2E_DOCKER_CONTAINER_METADATA_FIXTURE.INVALID_LINE_COUNT,
        E2E_DOCKER_CONTAINER_METADATA_FIXTURE.CONTAINER_COUNT
      )
    ).toThrow(
      E2E_DOCKER_CONTAINER_METADATA_EXPECTED.INVALID_OUTPUT_MESSAGE
    );
  });

  it("rejects malformed JSON metadata", () => {
    expect(() =>
      parseE2eDockerContainerMetadata(
        E2E_DOCKER_CONTAINER_METADATA_FIXTURE.INVALID_JSON,
        E2E_DOCKER_CONTAINER_METADATA_FIXTURE.CONTAINER_COUNT
      )
    ).toThrow(
      E2E_DOCKER_CONTAINER_METADATA_EXPECTED.INVALID_OUTPUT_MESSAGE
    );
  });

  it("rejects metadata with an invalid container shape", () => {
    expect(() =>
      parseE2eDockerContainerMetadata(
        E2E_DOCKER_CONTAINER_METADATA_FIXTURE.INVALID_SHAPE,
        E2E_DOCKER_CONTAINER_METADATA_FIXTURE.CONTAINER_COUNT
      )
    ).toThrow(
      E2E_DOCKER_CONTAINER_METADATA_EXPECTED.INVALID_OUTPUT_MESSAGE
    );
  });
});
