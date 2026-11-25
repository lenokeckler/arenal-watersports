import type { NullableRef } from "@/app/types";

export interface ReservationDetailDockActionProps {
  dockNotifiedAt: NullableRef<string>;
  reservationId: string;
  status: string;
}
