import type { SupabaseClient } from "@supabase/supabase-js";
import { E2E_ADMIN_ACCOUNT } from "../constants/E2eAccounts.constants";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { buildE2eUsername } from "./buildE2eUsername";
import { createAuthUser } from "./createAuthUser";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";
import { removeE2eWorker } from "./removeE2eWorker";
import { E2E_WORKER_LIST_FILTER_COLUMN } from "../constants/E2eWorkerListFilters.constants";
import type { WorkerListFilterFixtureWorker } from "./models/WorkerListFilterFixtureWorker.interface";
import type { WorkerListFilterFixtureWorkerOptions } from "./models/WorkerListFilterFixtureWorkerOptions.interface";
import { E2E_WORKER_LIST_FILTER_PASSWORD } from "../constants/E2eWorkerListFilters.constants";

const insertWorker = async (
  supabase: SupabaseClient,
  workerId: string,
  username: string,
  fullName: string,
  options: WorkerListFilterFixtureWorkerOptions
): Promise<void> => {
  const { error } = await supabase
    .from(E2E_SUPABASE_TABLE.WORKERS)
    .insert({
      [E2E_WORKER_LIST_FILTER_COLUMN.BASE_ROLE]:
        options.baseRole,
      [E2E_SUPABASE_COLUMN.CREATED_BY]:
        E2E_ADMIN_ACCOUNT.workerId,
      [E2E_SUPABASE_COLUMN.EXPIRES_AT]: options.expiresAt,
      [E2E_WORKER_LIST_FILTER_COLUMN.FULL_NAME]: fullName,
      [E2E_SUPABASE_COLUMN.ID]: workerId,
      [E2E_WORKER_LIST_FILTER_COLUMN.IS_EXTERNAL_GUIDE]:
        options.isExternalGuide,
      [E2E_SUPABASE_COLUMN.MUST_CHANGE_PASSWORD]: false,
      [E2E_WORKER_LIST_FILTER_COLUMN.NATIONAL_ID]:
        options.isExternalGuide ? username : null,
      [E2E_SUPABASE_COLUMN.USERNAME]: username,
    });

  if (error) {
    failE2eOperation(
      "insert a worker-list filter fixture",
      error.message
    );
  }
};

const insertExternalGuideMark = async (
  supabase: SupabaseClient,
  workerId: string,
  options: WorkerListFilterFixtureWorkerOptions
): Promise<void> => {
  if (!options.mark) {
    return;
  }

  const { error } = await supabase
    .from(E2E_SUPABASE_TABLE.WORKER_MARKS)
    .insert({
      [E2E_WORKER_LIST_FILTER_COLUMN.GRANTED_BY]:
        E2E_ADMIN_ACCOUNT.workerId,
      mark: options.mark,
      [E2E_SUPABASE_COLUMN.WORKER_ID]: workerId,
    });

  if (error) {
    failE2eOperation(
      "insert the worker-list filter fixture mark",
      error.message
    );
  }
};

export const createWorkerListFilterFixtureWorker = async (
  options: WorkerListFilterFixtureWorkerOptions
): Promise<WorkerListFilterFixtureWorker> => {
  const supabase = createServiceRoleClient();
  const username = buildE2eUsername();
  const fullName = `${options.fullName} ${username}`;
  const workerId = await createAuthUser(
    supabase,
    username,
    E2E_WORKER_LIST_FILTER_PASSWORD
  );

  try {
    await insertWorker(
      supabase,
      workerId,
      username,
      fullName,
      options
    );
    await insertExternalGuideMark(
      supabase,
      workerId,
      options
    );
  } catch (error) {
    await removeE2eWorker(supabase, workerId);
    throw error;
  }

  return {
    fullName,
    remove: () => removeE2eWorker(supabase, workerId),
    username,
  };
};
