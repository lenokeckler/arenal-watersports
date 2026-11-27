"use client";

import FormField from "@/app/components/form-field/FormField";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { DAMAGE_REPORT_FIELD_ID } from "../constants/DamageReport.constants";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportTripFieldProps } from "../models/DamageReportTripFieldProps.interface";
import type { JSX } from "react";

const DamageReportTripField = ({
  hasNotedTrip,
  onChange,
  trips,
  value,
}: DamageReportTripFieldProps): JSX.Element => (
  <FormField
    id={DAMAGE_REPORT_FIELD_ID.TRIP}
    name={DAMAGE_REPORT_FIELD_ID.TRIP}
    label={DAMAGE_REPORT_COPY.TRIP_LABEL}
    labelSuffix={STRING.Empty}
    type={INPUT_TYPES.SELECT}
    value={value}
    onChange={onChange}
    options={[
      {
        key: STRING.Empty,
        label: hasNotedTrip
          ? DAMAGE_REPORT_COPY.TRIP_KEEP
          : DAMAGE_REPORT_COPY.TRIP_NONE,
        value: STRING.Empty,
      },
      ...trips.map((trip) => ({
        key: trip.reservationId,
        label: trip.label,
        value: trip.reservationId,
      })),
    ]}
  />
);

export default DamageReportTripField;
