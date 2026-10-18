import { readdirSync } from "node:fs";
import path from "node:path";
import {
  E2E_PAGE_FILE_NAME,
  E2E_ROUTE_GROUP_PATTERN,
  E2E_ROUTE_SEPARATOR,
} from "../constants/E2eSessionBarPresence.constants";

const isRouteGroup = (segment: string): boolean =>
  E2E_ROUTE_GROUP_PATTERN.test(segment);

const toRoute = (
  pageFile: string,
  appDirectory: string
): string => {
  const segments = path
    .relative(
      path.join(process.cwd(), appDirectory),
      path.dirname(pageFile)
    )
    .split(path.sep)
    .filter(Boolean)
    .filter((segment) => !isRouteGroup(segment));
  const prefix = appDirectory
    .split(E2E_ROUTE_SEPARATOR)
    .filter((segment) => !isRouteGroup(segment))
    .slice(1);

  return (
    E2E_ROUTE_SEPARATOR +
    [...prefix, ...segments].join(E2E_ROUTE_SEPARATOR)
  );
};

export const listPageRoutes = (
  appDirectory: string
): string[] =>
  readdirSync(path.join(process.cwd(), appDirectory), {
    recursive: true,
    withFileTypes: true,
  })
    .filter(
      (entry) =>
        entry.isFile() && entry.name === E2E_PAGE_FILE_NAME
    )
    .map((entry) =>
      toRoute(
        path.join(entry.parentPath, entry.name),
        appDirectory
      )
    )
    .sort();
