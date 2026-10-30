import { E2E_DATABASE_RESOLVER } from "../../constants/E2eSupabase.constants";
import { E2E_DATABASE_CONTAINER_FIXTURE } from "./ResolveE2eDatabaseContainer.constants";

export const E2E_DOCKER_CONTAINER_METADATA_FIXTURE = {
  CONTAINER_COUNT: 1,
  INVALID_JSON: [
    JSON.stringify(
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE.Name
    ),
    "{",
    JSON.stringify(
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE
        .NetworkSettings.Ports
    ),
  ].join("\n"),
  INVALID_LINE_COUNT: [
    JSON.stringify(
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE.Name
    ),
    JSON.stringify(
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE
        .Config.Labels
    ),
  ].join("\n"),
  INVALID_SHAPE: [
    "null",
    JSON.stringify(
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE
        .Config.Labels
    ),
    JSON.stringify(
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE
        .NetworkSettings.Ports
    ),
  ].join("\n"),
  VALID: [
    JSON.stringify(
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE.Name
    ),
    JSON.stringify(
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE
        .Config.Labels
    ),
    JSON.stringify(
      E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_DATABASE
        .NetworkSettings.Ports
    ),
  ].join("\n"),
} as const;

export const E2E_DOCKER_CONTAINER_METADATA_EXPECTED = {
  INVALID_OUTPUT_MESSAGE: `E2E could not ${E2E_DATABASE_RESOLVER.ACTION}: ${E2E_DATABASE_RESOLVER.INVALID_DOCKER_OUTPUT}`,
} as const;
