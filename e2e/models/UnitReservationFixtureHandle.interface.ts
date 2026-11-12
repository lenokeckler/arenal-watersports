import type { UnitReservationFixtureRecord } from "./UnitReservationFixtureRecord.interface";

export interface UnitReservationFixtureHandle {
  cleanup: () => Promise<void>;
  records: UnitReservationFixtureRecord[];
}
