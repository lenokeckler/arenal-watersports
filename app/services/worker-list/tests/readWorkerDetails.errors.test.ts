import { describe, expect, it } from "vitest";
import { WORKER_LIST_QUERY } from "@/app/constants/supabase/WorkerListQuery.constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import type { WorkerDetailsQueryResponse } from "./models/WorkerDetailsQueryResponse.interface";
import { readWorkerDetails } from "../readWorkerDetails";

const WORKER_IDS = ["11111111-1111-1111-1111-111111111111"];
const QUERY_ERROR = {
  code: "WORKER_DETAILS_QUERY_FAILED",
  details: "",
  hint: "",
  message: "Worker details query failed",
};

const createSupabase = (
  areasResponse: WorkerDetailsQueryResponse,
  marksResponse: WorkerDetailsQueryResponse
): ServerSupabaseClient =>
  ({
    from: (table: string) => ({
      select: () => ({
        in: () =>
          Promise.resolve(
            table === WORKER_LIST_QUERY.TABLES.AREAS
              ? areasResponse
              : marksResponse
          ),
      }),
    }),
  }) as unknown as ServerSupabaseClient;

describe("readWorkerDetails", () => {
  it("propagates an area query error", async () => {
    const supabase = createSupabase(
      { data: null, error: QUERY_ERROR },
      { data: [], error: null }
    );

    await expect(
      readWorkerDetails(supabase, WORKER_IDS)
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });

  it("propagates a mark query error", async () => {
    const supabase = createSupabase(
      { data: [], error: null },
      { data: null, error: QUERY_ERROR }
    );

    await expect(
      readWorkerDetails(supabase, WORKER_IDS)
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });
});
