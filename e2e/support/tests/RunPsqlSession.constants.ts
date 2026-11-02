import { E2E_DOCKER } from "../../constants/E2eSupabase.constants";
import {
  E2E_DATABASE_CONTAINER_EXPECTED,
  E2E_DATABASE_CONTAINER_FIXTURE,
} from "./ResolveE2eDatabaseContainer.constants";

export const E2E_PSQL_SESSION_TEST = {
  ANON_KEY: "e2e-test-anon-key",
  CONTAINER_IDS: ["isolated-container-id"],
  DATABASE_CONTAINER_NAME:
    E2E_DATABASE_CONTAINER_EXPECTED.ISOLATED_NAME,
  DATABASE_URL: E2E_DATABASE_CONTAINER_FIXTURE.ISOLATED_URL,
  EXECUTABLE: E2E_DOCKER.EXECUTABLE,
  EXECUTION_ARGUMENTS: ["exec", "-i"],
  FAILED_EXIT_CODE: 2,
  PROCESS_ERROR: "Docker could not start psql.",
  REMOTE_URL: E2E_DATABASE_CONTAINER_FIXTURE.REMOTE_URL,
  SERVICE_ROLE_KEY: "e2e-test-service-role-key",
  SQL: "select 1;",
  STANDARD_OUTPUT: "1",
} as const;
