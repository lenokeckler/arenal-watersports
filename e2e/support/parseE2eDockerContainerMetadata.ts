import {
  E2E_DATABASE_RESOLVER,
  E2E_DOCKER,
} from "../constants/E2eSupabase.constants";
import type { E2eDockerContainer } from "./models/E2eDockerContainer.interface";
import { failE2eOperation } from "./failE2eOperation";

const isRecord = (
  value: unknown
): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object";

const isPortMapping = (value: unknown): boolean =>
  isRecord(value) &&
  typeof value.HostIp === "string" &&
  typeof value.HostPort === "string";

const isContainer = (
  value: unknown
): value is E2eDockerContainer => {
  if (!isRecord(value)) {
    return false;
  }

  const configuration = value.Config;
  const networkSettings = value.NetworkSettings;

  return (
    typeof value.Name === "string" &&
    isRecord(configuration) &&
    (configuration.Labels === null ||
      (isRecord(configuration.Labels) &&
        Object.values(configuration.Labels).every(
          (label) => typeof label === "string"
        ))) &&
    isRecord(networkSettings) &&
    isRecord(networkSettings.Ports) &&
    Object.values(networkSettings.Ports).every(
      (portMappings) =>
        portMappings === null ||
        (Array.isArray(portMappings) &&
          portMappings.every(isPortMapping))
    )
  );
};

const parseContainerMetadata = (
  lines: readonly string[],
  offset: number,
  metadataLinesPerContainer: number
): unknown => {
  const [nameOutput, labelsOutput, portsOutput] =
    lines.slice(offset, offset + metadataLinesPerContainer);

  return {
    Config: { Labels: JSON.parse(labelsOutput) },
    Name: JSON.parse(nameOutput),
    NetworkSettings: { Ports: JSON.parse(portsOutput) },
  };
};

const parseMetadataLines = (
  lines: readonly string[],
  containerCount: number
): unknown[] => {
  const metadataLinesPerContainer =
    E2E_DOCKER.INSPECTED_METADATA_LINES_PER_CONTAINER;

  if (
    lines.length !==
    containerCount * metadataLinesPerContainer
  ) {
    return failE2eOperation(
      E2E_DATABASE_RESOLVER.ACTION,
      E2E_DATABASE_RESOLVER.INVALID_DOCKER_OUTPUT
    );
  }

  return Array.from(
    { length: containerCount },
    (_, index) =>
      parseContainerMetadata(
        lines,
        index * metadataLinesPerContainer,
        metadataLinesPerContainer
      )
  );
};

export const parseE2eDockerContainerMetadata = (
  output: string,
  containerCount: number
): E2eDockerContainer[] => {
  let containers: unknown[];

  try {
    containers = parseMetadataLines(
      output.trim().split(/\r?\n/),
      containerCount
    );
  } catch (error: unknown) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }

    return failE2eOperation(
      E2E_DATABASE_RESOLVER.ACTION,
      E2E_DATABASE_RESOLVER.INVALID_DOCKER_OUTPUT
    );
  }

  if (!containers.every(isContainer)) {
    return failE2eOperation(
      E2E_DATABASE_RESOLVER.ACTION,
      E2E_DATABASE_RESOLVER.INVALID_DOCKER_OUTPUT
    );
  }

  return containers;
};
