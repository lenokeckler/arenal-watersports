import type { E2eDockerContainer } from "../models/E2eDockerContainer.interface";

const createDockerContainer = (
  name: string,
  project: string,
  workdir: string,
  hostPort?: string
): E2eDockerContainer => ({
  Config: {
    Labels: {
      "com.supabase.cli.project": project,
      "com.supabase.cli.workdir": workdir,
    },
  },
  Name: name,
  NetworkSettings: {
    Ports: {
      "8000/tcp": hostPort
        ? [{ HostIp: "127.0.0.1", HostPort: hostPort }]
        : null,
    },
  },
});

export const E2E_DATABASE_CONTAINER_FIXTURE = {
  DEFAULT_DATABASE: createDockerContainer(
    "/supabase_db_arenal-watersports",
    "arenal-watersports",
    "C:\\projects\\arenal-watersports"
  ),
  DEFAULT_GATEWAY: createDockerContainer(
    "/supabase_kong_arenal-watersports",
    "arenal-watersports",
    "C:\\projects\\arenal-watersports",
    "54321"
  ),
  DEFAULT_URL: "http://127.0.0.1:54321",
  CONTAINER_IDS: [
    "isolated-gateway-id",
    "isolated-database-id",
  ],
  ISOLATED_DATABASE: createDockerContainer(
    "/supabase_db_arenal-adm29-test",
    "arenal-adm29-test",
    "D:\\codex-task-artifacts\\arenal-adm29-test"
  ),
  ISOLATED_GATEWAY: createDockerContainer(
    "/supabase_kong_arenal-adm29-test",
    "arenal-adm29-test",
    "D:\\codex-task-artifacts\\arenal-adm29-test",
    "58521"
  ),
  ISOLATED_URL: "http://localhost:58521",
  REMOTE_URL: "https://project.supabase.co",
  SECOND_GATEWAY_ON_SAME_PORT: createDockerContainer(
    "/supabase_kong_arenal-other-project",
    "arenal-other-project",
    "D:\\codex-task-artifacts\\arenal-other-project",
    "58521"
  ),
} as const;

export const E2E_DATABASE_CONTAINER_EXPECTED = {
  AMBIGUOUS_GATEWAY_MESSAGE:
    "E2E could not resolve the local database container: More than one local Supabase API gateway publishes port 58521.",
  DEFAULT_NAME: "supabase_db_arenal-watersports",
  ISOLATED_NAME: "supabase_db_arenal-adm29-test",
  MISSING_DATABASE_MESSAGE:
    "E2E could not resolve the local database container: No database container was found for the local Supabase project arenal-adm29-test.",
  MISSING_GATEWAY_MESSAGE:
    "E2E could not resolve the local database container: No local Supabase API gateway publishes port 58521.",
  REMOTE_URL_MESSAGE:
    "E2E could not resolve the local database container: E2E only runs against the local Supabase, not project.supabase.co.",
  TRANSIENT_INSPECTION_ERROR:
    "Temporary Docker inspection failure.",
} as const;
