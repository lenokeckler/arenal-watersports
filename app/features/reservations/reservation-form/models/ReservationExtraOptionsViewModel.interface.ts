import type { NullableRef } from "@/app/types";
import type { ReservationExtraOption } from "./ReservationExtraOption.interface";

export interface ReservationExtraOptionsViewModel {
  error: NullableRef<string>;
  isLoading: boolean;
  options: ReservationExtraOption[];
  retry: () => void;
}
