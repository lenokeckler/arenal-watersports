import { randomUUID } from "node:crypto";
import { STRING } from "@/app/constants";
import { E2E_WORKER } from "../constants/E2eWorker.constants";

export const buildE2eUsername = (): string =>
  `${E2E_WORKER.USERNAME_PREFIX}${randomUUID()
    .replaceAll("-", STRING.Empty)
    .slice(0, E2E_WORKER.USERNAME_SUFFIX_LENGTH)}`;
