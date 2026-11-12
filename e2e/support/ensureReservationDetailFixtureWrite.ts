import type { PostgrestError } from "@supabase/supabase-js";
import type { NullableRef } from "@/app/types";
import { E2E_RESERVATION_DETAIL_FIXTURE } from "../constants/E2eReservationDetail.constants";

export const ensureReservationDetailFixtureWrite = (
  error: NullableRef<PostgrestError>
): void => {
  if (error) {
    throw new Error(
      E2E_RESERVATION_DETAIL_FIXTURE.FAILURE,
      {
        cause: error,
      }
    );
  }
};
