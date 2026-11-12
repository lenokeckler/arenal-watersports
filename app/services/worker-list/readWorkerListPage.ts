import type { NullableRef } from "@/app/types";
import { isSignedInAdministrator } from "@/app/services/worker-registration/isSignedInAdministrator";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { WorkerListPage } from "./models/WorkerListPage.interface";
import type { WorkerListSearch } from "./models/WorkerListSearch.interface";
import { readWorkerListPageData } from "./readWorkerListPageData";

export const readWorkerListPage = async (
  search: WorkerListSearch
): Promise<NullableRef<WorkerListPage>> => {
  const supabase = await createServerSupabaseClient();

  if (!(await isSignedInAdministrator(supabase))) {
    return null;
  }

  return readWorkerListPageData(
    supabase,
    search,
    new Date().toISOString()
  );
};
