import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ARIA_ROLE,
  UUID_PATTERN,
  TitleVariant,
} from "@/app/constants";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import UnitCorrectionForm from "./components/UnitCorrectionForm";
import { UNIT_CORRECTION_COPY } from "./constants/UnitCorrectionCopy.constants";
import { UNIT_READINGS_COPY } from "./constants/UnitReadingsCopy.constants";
import type { UnitCorrectionProps } from "./models/UnitCorrectionProps.interface";
import type { UnitReading } from "./models/UnitReading.interface";
import { getMotorUnitReading } from "./services/getMotorUnitReadings";
import {
  UNIT_CORRECTION_ERROR_CLASS,
  UNIT_CORRECTION_PAGE_CLASS,
  UNIT_READINGS_HEADING_CLASS,
} from "./styles/UnitReadings.styles";
import type { JSX } from "react";

const UnitCorrection = async ({
  unitId,
}: UnitCorrectionProps): Promise<JSX.Element> => {
  let unit: NullableRef<UnitReading> = null;
  let errorMessage: NullableRef<string> = null;

  try {
    unit = UUID_PATTERN.test(unitId)
      ? await getMotorUnitReading(unitId)
      : null;
    errorMessage = unit
      ? null
      : UNIT_CORRECTION_COPY.NOT_FOUND;
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? UNIT_READINGS_COPY.FORBIDDEN
        : UNIT_CORRECTION_COPY.ERROR_LOAD;
  }

  return (
    <main className={UNIT_CORRECTION_PAGE_CLASS}>
      <Title
        variant={TitleVariant.PRIMARY}
        text={UNIT_CORRECTION_COPY.HEADING}
        className={UNIT_READINGS_HEADING_CLASS}
      />
      {errorMessage && (
        <Text
          className={UNIT_CORRECTION_ERROR_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {errorMessage}
        </Text>
      )}
      {!errorMessage && unit && (
        <UnitCorrectionForm unit={unit} />
      )}
    </main>
  );
};

export default UnitCorrection;
