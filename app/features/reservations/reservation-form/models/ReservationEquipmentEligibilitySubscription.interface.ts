import type {
  REALTIME_SUBSCRIBE_STATES,
  SupabaseClient,
} from "@supabase/supabase-js";
import type { Database } from "@/app/types";

export interface ReservationEquipmentEligibilitySubscription {
  isActive: () => boolean;
  onChange: () => void;
  onStatus: (status: REALTIME_SUBSCRIBE_STATES) => void;
  subscriptionAttempt: number;
  supabase: SupabaseClient<Database>;
}
