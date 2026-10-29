import { createClient } from "@supabase/supabase-js";
import { API, HTTP_STATUS } from "@/app/constants";
import type { Database } from "@/app/types";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationUnitCommitment } from "../models/ReservationUnitCommitment.interface";
import {
  AVAILABLE_UNIT_TEST,
  TEST_SUPABASE_CLIENT,
} from "./getAvailableReservationUnits.constants";

const getResponseBody = (
  path: string,
  units: ReservationCategoryUnitOption[],
  commitments: ReservationUnitCommitment[]
) => {
  if (path.endsWith("/equipment_categories")) {
    return { id: AVAILABLE_UNIT_TEST.CATEGORY_ID };
  }
  if (path.endsWith("/equipment_units")) {
    return units;
  }
  return commitments;
};

export const createReservationAvailabilityClient = (
  units: ReservationCategoryUnitOption[],
  commitments: ReservationUnitCommitment[]
) => {
  const requestPaths: string[] = [];
  const mockFetch: typeof fetch = (input) => {
    const requestUrl =
      input instanceof Request ? input.url : String(input);
    const path = new URL(requestUrl).pathname;
    requestPaths.push(path);
    const responseBody = getResponseBody(
      path,
      units,
      commitments
    );
    return Promise.resolve(
      new Response(JSON.stringify(responseBody), {
        headers: {
          [API.HEADERS.CONTENT_TYPE]: API.HEADERS.JSON,
        },
        status: HTTP_STATUS.OK,
      })
    );
  };

  return {
    client: createClient<Database>(
      TEST_SUPABASE_CLIENT.URL,
      TEST_SUPABASE_CLIENT.ANON_KEY,
      { global: { fetch: mockFetch } }
    ),
    requestPaths,
  };
};
