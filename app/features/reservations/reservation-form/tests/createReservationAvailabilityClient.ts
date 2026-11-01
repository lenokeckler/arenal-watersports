import { createClient } from "@supabase/supabase-js";
import { API, HTTP_STATUS } from "@/app/constants";
import type { Database } from "@/app/types";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationUnitCommitment } from "../models/ReservationUnitCommitment.interface";
import type { ReservationAvailabilityClientOptions } from "./models/ReservationAvailabilityClientOptions.interface";
import type { ReservationAvailabilityClientRequest } from "./models/ReservationAvailabilityClientRequest.interface";
import type { ReservationAvailabilityClientState } from "./models/ReservationAvailabilityClientState.interface";
import {
  AVAILABLE_UNIT_TEST,
  TEST_SUPABASE_CLIENT,
} from "./getAvailableReservationUnits.constants";

const getResponseBody = (
  path: string,
  state: ReservationAvailabilityClientState
) => {
  if (path.endsWith("/equipment_categories")) {
    return {
      id: AVAILABLE_UNIT_TEST.CATEGORY_ID,
      units_are_interchangeable:
        state.options.categoryIsInterchangeable ?? false,
    };
  }
  if (
    path.endsWith(
      AVAILABLE_UNIT_TEST.CATEGORY_AVAILABILITY_RPC_PATH
    )
  ) {
    if (
      state.options.hasCategoryAvailabilityRow === false
    ) {
      return [];
    }
    const free =
      state.options.availableQuantity ??
      AVAILABLE_UNIT_TEST.FREE_QUANTITY;
    return [
      {
        committed:
          AVAILABLE_UNIT_TEST.CATEGORY_COMMITTED_QUANTITY,
        free,
        usable:
          AVAILABLE_UNIT_TEST.CATEGORY_COMMITTED_QUANTITY +
          free,
      },
    ];
  }
  if (path.endsWith("/equipment_units")) {
    return state.units;
  }
  return state.commitments;
};

export const createReservationAvailabilityClient = (
  units: ReservationCategoryUnitOption[],
  commitments: ReservationUnitCommitment[] = [],
  options: ReservationAvailabilityClientOptions = {}
) => {
  const requestPaths: string[] = [];
  const requests: ReservationAvailabilityClientRequest[] =
    [];
  const state = { commitments, options, units };
  const mockFetch: typeof fetch = (input, init) => {
    const requestUrl =
      input instanceof Request ? input.url : String(input);
    const path = new URL(requestUrl).pathname;
    requestPaths.push(path);
    requests.push({ body: init?.body, url: requestUrl });
    const responseBody = getResponseBody(path, state);
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
    requests,
  };
};
