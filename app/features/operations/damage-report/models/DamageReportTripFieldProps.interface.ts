import type { DamageReportFormViewModel } from "./DamageReportFormViewModel.interface";
import type { DamageReportTrip } from "./DamageReportTrip.interface";

export interface DamageReportTripFieldProps {
  hasNotedTrip: boolean;
  onChange: DamageReportFormViewModel["handleTripChange"];
  trips: DamageReportTrip[];
  value: string;
}
