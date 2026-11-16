import type { NullableRef } from "@/app/types/Nullable";

export interface ReservationDetailChargesPage {
  getChargeLink: () => HTMLElement;
  getRefundLink: () => HTMLElement;
  getRegion: () => HTMLElement;
  queryChargeLink: () => NullableRef<HTMLElement>;
  queryRefundLink: () => NullableRef<HTMLElement>;
}
