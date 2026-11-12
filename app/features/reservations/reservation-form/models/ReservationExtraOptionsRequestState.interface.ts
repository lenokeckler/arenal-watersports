import type { NullableRef } from "@/app/types";
import type { ReservationExtraOption } from "./ReservationExtraOption.interface";
import type { ReservationExtrasViewModelResult } from "./ReservationExtrasViewModelResult.interface";

export interface ReservationExtraOptionsRequestState {
  error: NullableRef<
    ReservationExtrasViewModelResult<string>
  >;
  options: NullableRef<
    ReservationExtrasViewModelResult<
      ReservationExtraOption[]
    >
  >;
}
