import {
  E2E_DATABASE_RESOLVER,
  E2E_DOCKER,
  E2E_LOCAL_SUPABASE_HOSTS,
} from "../constants/E2eSupabase.constants";
import type { E2eDockerContainer } from "./models/E2eDockerContainer.interface";
import { failE2eOperation } from "./failE2eOperation";

const readLocalApiPort = (urlValue: string): string => {
  const url = new URL(urlValue);

  if (!E2E_LOCAL_SUPABASE_HOSTS.includes(url.hostname)) {
    return failE2eOperation(
      E2E_DATABASE_RESOLVER.ACTION,
      E2E_DATABASE_RESOLVER.NON_LOCAL_URL(url.hostname)
    );
  }

  if (!url.port) {
    return failE2eOperation(
      E2E_DATABASE_RESOLVER.ACTION,
      E2E_DATABASE_RESOLVER.MISSING_URL_PORT
    );
  }

  return url.port;
};

const isPublishedApiPort = (
  container: E2eDockerContainer,
  port: string
): boolean =>
  Boolean(
    container.NetworkSettings.Ports[
      `${E2E_DOCKER.KONG_API_PORT}/${E2E_DOCKER.PORT_PROTOCOL}`
    ]?.some((mapping) => mapping.HostPort === port)
  );

const findApiGateway = (
  port: string,
  containers: readonly E2eDockerContainer[]
): E2eDockerContainer => {
  const gateways = containers.filter((container) => {
    const labels = container.Config.Labels;
    const project = labels?.[E2E_DOCKER.PROJECT_LABEL];

    return (
      Boolean(project) &&
      container.Name ===
        `${E2E_DOCKER.KONG_CONTAINER_NAME_PREFIX}${project}` &&
      Boolean(labels?.[E2E_DOCKER.WORKDIR_LABEL]) &&
      isPublishedApiPort(container, port)
    );
  });

  if (gateways.length === 0) {
    return failE2eOperation(
      E2E_DATABASE_RESOLVER.ACTION,
      E2E_DATABASE_RESOLVER.NO_GATEWAY_FOR_URL(port)
    );
  }

  if (gateways.length > 1) {
    return failE2eOperation(
      E2E_DATABASE_RESOLVER.ACTION,
      E2E_DATABASE_RESOLVER.AMBIGUOUS_GATEWAY_FOR_URL(port)
    );
  }

  return gateways[0];
};

const findDatabaseContainer = (
  gateway: E2eDockerContainer,
  containers: readonly E2eDockerContainer[]
): string => {
  const project =
    gateway.Config.Labels?.[E2E_DOCKER.PROJECT_LABEL];
  const workdir =
    gateway.Config.Labels?.[E2E_DOCKER.WORKDIR_LABEL];

  if (!project || !workdir) {
    return failE2eOperation(
      E2E_DATABASE_RESOLVER.ACTION,
      E2E_DATABASE_RESOLVER.MISSING_PROJECT_METADATA
    );
  }

  const databases = containers.filter(
    (container) =>
      container.Name ===
        `${E2E_DOCKER.CONTAINER_NAME_PREFIX}${project}` &&
      container.Config.Labels?.[
        E2E_DOCKER.PROJECT_LABEL
      ] === project &&
      container.Config.Labels?.[
        E2E_DOCKER.WORKDIR_LABEL
      ] === workdir
  );

  if (databases.length !== 1) {
    return failE2eOperation(
      E2E_DATABASE_RESOLVER.ACTION,
      E2E_DATABASE_RESOLVER.MISSING_DATABASE_CONTAINER(
        project
      )
    );
  }

  return databases[0].Name.replace(/^\//, "");
};

export const selectE2eDatabaseContainer = (
  url: string,
  containers: readonly E2eDockerContainer[]
): string => {
  const apiPort = readLocalApiPort(url);
  const gateway = findApiGateway(apiPort, containers);

  return findDatabaseContainer(gateway, containers);
};
