import type { NullableRef } from "@/app/types";

export interface ReservationDockNoticeViewModel {
  errorMessage: NullableRef<string>;
  handleToggle: () => void;
  isNotified: boolean;
  isPending: boolean;
}
