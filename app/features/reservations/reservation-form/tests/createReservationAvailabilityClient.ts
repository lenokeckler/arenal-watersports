import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationUnitCommitment } from "../models/ReservationUnitCommitment.interface";
import {
  AVAILABLE_UNIT_TEST,
  TEST_SUPABASE_CLIENT,
} from "./getAvailableReservationUnits.constants";

export const createReservationAvailabilityClient = (
  freeQuantity: number,
  units: ReservationCategoryUnitOption[],
  commitments: ReservationUnitCommitment[],
  unitsAreInterchangeable: boolean
) => {
  const requestPaths: string[] = [];
  const getResponseBody = (path: string) => {
    if (path.endsWith("/category_availability")) {
      return [{ free: freeQuantity }];
    }
    if (path.endsWith("/equipment_categories")) {
      return {
        id: AVAILABLE_UNIT_TEST.CATEGORY_ID,
        units_are_interchangeable: unitsAreInterchangeable,
      };
    }
    if (path.endsWith("/equipment_units")) {
      return units;
    }
    return commitments;
  };
  const mockFetch: typeof fetch = (input) => {
    const requestUrl =
      input instanceof Request ? input.url : String(input);
    const path = new URL(requestUrl).pathname;
    requestPaths.push(path);
    const result = getResponseBody(path);
    return Promise.resolve(
      new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
        status: 200,
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
