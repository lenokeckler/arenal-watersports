import { inspectE2eDockerContainers } from "./inspectE2eDockerContainers";
import { readRunningE2eDockerContainerIds } from "./readRunningE2eDockerContainerIds";
import { selectE2eDatabaseContainer } from "./selectE2eDatabaseContainer";

const resolvedContainers = new Map<
  string,
  Promise<string>
>();

export { selectE2eDatabaseContainer };

export const resolveE2eDatabaseContainer = (
  url: string
): Promise<string> => {
  const existingResolution = resolvedContainers.get(url);

  if (existingResolution) {
    return existingResolution;
  }

  const resolution = readRunningE2eDockerContainerIds()
    .then(inspectE2eDockerContainers)
    .then((containers) =>
      selectE2eDatabaseContainer(url, containers)
    );

  resolvedContainers.set(url, resolution);

  return resolution;
};
