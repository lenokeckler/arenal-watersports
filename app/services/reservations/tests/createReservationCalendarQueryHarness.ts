import { createClient } from "@supabase/supabase-js";
import { vi } from "vitest";
import { HTTP_STATUS } from "@/app/constants";
import type { Database } from "@/app/types";
import type { ReservationCalendarQueryHarness } from "./models/ReservationCalendarQueryHarness.interface";
import { QUERY_TEST } from "./ReservationCalendarQuery.constants";

export const createReservationCalendarQueryHarness =
  (): ReservationCalendarQueryHarness => {
    const fetchRequest = vi.fn<typeof fetch>(
      (): Promise<Response> =>
        Promise.resolve(
          new Response(JSON.stringify([]), {
            headers: QUERY_TEST.HEADERS,
            status: HTTP_STATUS.OK,
          })
        )
    );
    return {
      client: createClient<Database>(
        QUERY_TEST.URL,
        QUERY_TEST.KEY,
        {
          auth: {
            autoRefreshToken: false,
            detectSessionInUrl: false,
            persistSession: false,
          },
          global: { fetch: fetchRequest },
        }
      ),
      fetchRequest,
    };
  };
