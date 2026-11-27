import type { ReservationChargeFixture } from "./ReservationChargeFixture.interface";

export interface DepositResolutionFixture extends ReservationChargeFixture {
  depositId: string;
}
