import { createClient } from "@supabase/supabase-js";
import { vi } from "vitest";
import type { Database } from "@/app/types";
import { RESERVATION_DETAIL_TEST } from "./ReservationDetailTest.constants";

export const createReservationDetailSupabaseClient = () => {
  const query = {
    eq: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn(),
    order: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
  };
  const from = vi.fn().mockReturnValue(query);
  const rpc = vi.fn();
  const client = new Proxy(
    createClient<Database>(
      RESERVATION_DETAIL_TEST.SUPABASE_URL,
      RESERVATION_DETAIL_TEST.SUPABASE_ANON_KEY
    ),
    {
      get: (target, property, receiver) => {
        if (property === "from") {
          return from;
        }
        if (property === "rpc") {
          return rpc;
        }
        return Reflect.get(target, property, receiver);
      },
    }
  );

  return { client, from, query, rpc };
};
