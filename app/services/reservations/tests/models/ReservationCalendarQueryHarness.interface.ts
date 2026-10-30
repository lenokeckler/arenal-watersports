import type { SupabaseClient } from "@supabase/supabase-js";
import type { Mock } from "vitest";
import type { Database } from "@/app/types";

export interface ReservationCalendarQueryHarness {
  client: SupabaseClient<Database>;
  fetchRequest: Mock<typeof fetch>;
}
