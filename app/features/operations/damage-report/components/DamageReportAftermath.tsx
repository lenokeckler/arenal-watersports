"use client";

import ChoicePills from "@/app/components/choice-pills/ChoicePills";
import Text from "@/app/components/text/Text";
import { DAMAGE_REPORT_FIELD_ID } from "../constants/DamageReport.constants";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportAftermathProps } from "../models/DamageReportAftermathProps.interface";
import { buildDamageStateOptions } from "../utils/buildDamageStateOptions";
import { DAMAGE_REPORT_NOTE_CLASS } from "../styles/DamageReportForm.styles";
import DamageReportTripField from "./DamageReportTripField";
import type { JSX } from "react";

const DamageReportAftermath = ({
  draft,
  hasNotedTrip,
  onStateChange,
  onTripChange,
  selectedUnit,
}: DamageReportAftermathProps): JSX.Element => (
  <>
    {selectedUnit?.isOut ? (
      <Text className={DAMAGE_REPORT_NOTE_CLASS}>
        {DAMAGE_REPORT_COPY.OUT_NOTE}
      </Text>
    ) : (
      <ChoicePills
        legend={DAMAGE_REPORT_COPY.STATE_LABEL}
        name={DAMAGE_REPORT_FIELD_ID.STATE}
        onChange={onStateChange}
        value={draft.state}
        options={buildDamageStateOptions(selectedUnit)}
      />
    )}
    {selectedUnit && selectedUnit.trips.length > 0 && (
      <DamageReportTripField
        hasNotedTrip={hasNotedTrip}
        onChange={onTripChange}
        trips={selectedUnit.trips}
        value={draft.reservationId}
      />
    )}
  </>
);

export default DamageReportAftermath;
