import type { E2eChargeSeed } from "./E2eChargeSeed.interface";

export interface E2eSeededCharge extends E2eChargeSeed {
  chargeId: string;
  paymentMethod: string;
  reservationId: string;
}
