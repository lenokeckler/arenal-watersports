import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import UnitReadingsView from "./UnitReadingsView";
import { UNIT_READINGS_COPY } from "./constants/UnitReadingsCopy.constants";
import type { UnitReading } from "./models/UnitReading.interface";
import { getMotorUnitReadings } from "./services/getMotorUnitReadings";
import type { JSX } from "react";

const UnitReadings = async (): Promise<JSX.Element> => {
  let units: UnitReading[] = [];
  let errorMessage: NullableRef<string> = null;

  try {
    units = await getMotorUnitReadings();
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? UNIT_READINGS_COPY.FORBIDDEN
        : UNIT_READINGS_COPY.ERROR;
  }

  return (
    <UnitReadingsView
      errorMessage={errorMessage}
      units={units}
    />
  );
};

export default UnitReadings;
