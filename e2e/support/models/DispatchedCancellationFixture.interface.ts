import type { ReservationCancellationFixture } from "./ReservationCancellationFixture.interface";

export interface DispatchedCancellationFixture extends ReservationCancellationFixture {
  unitCode: string;
}
