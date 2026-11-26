"use client";

import Text from "@/app/components/text/Text";
import {
  DISPATCH_SHEET_COPY,
  DISPATCH_SHEET_FIELD_ID,
} from "../constants/DispatchSheetCopy.constants";
import type { DispatchTimesStepProps } from "../models/DispatchTimesStepProps.interface";
import { DISPATCH_SHEET_UNIT_NOTE_CLASS } from "../styles/DispatchSheet.styles";
import {
  DISPATCH_DURATION_CLASS,
  DISPATCH_TIMES_GRID_CLASS,
} from "../styles/DispatchSteps.styles";
import { formatDispatchDuration } from "../utils/formatDispatchDuration";
import DispatchTimeAdjuster from "./DispatchTimeAdjuster";

const DispatchTimesStep = ({
  timeState,
}: DispatchTimesStepProps): React.JSX.Element => (
  <>
    <div className={DISPATCH_TIMES_GRID_CLASS}>
      <DispatchTimeAdjuster
        fieldId={DISPATCH_SHEET_FIELD_ID.DEPARTURE}
        label={DISPATCH_SHEET_COPY.DEPARTURE_LABEL}
        laterLabel={
          DISPATCH_SHEET_COPY.DEPARTURE_SHIFT_LATER
        }
        onChange={timeState.handleDepartureChange}
        onShift={timeState.handleShiftDeparture}
        soonerLabel={
          DISPATCH_SHEET_COPY.DEPARTURE_SHIFT_SOONER
        }
        value={timeState.departureTime}
      />
      <DispatchTimeAdjuster
        fieldId={DISPATCH_SHEET_FIELD_ID.RETURN}
        label={DISPATCH_SHEET_COPY.RETURN_LABEL}
        laterLabel={DISPATCH_SHEET_COPY.RETURN_SHIFT_LATER}
        onChange={timeState.handleReturnChange}
        onShift={timeState.handleShiftReturn}
        soonerLabel={
          DISPATCH_SHEET_COPY.RETURN_SHIFT_SOONER
        }
        value={timeState.returnTime}
      />
    </div>
    {timeState.durationMinutes !== null && (
      <Text className={DISPATCH_DURATION_CLASS}>
        {`${DISPATCH_SHEET_COPY.DURATION_LABEL}: ${formatDispatchDuration(timeState.durationMinutes)}`}
      </Text>
    )}
    {timeState.isNextDay && (
      <Text className={DISPATCH_SHEET_UNIT_NOTE_CLASS}>
        {DISPATCH_SHEET_COPY.NEXT_DAY_NOTE}
      </Text>
    )}
  </>
);

export default DispatchTimesStep;
