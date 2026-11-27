import ImpactCount from "@/app/components/impact-count/ImpactCount";
import InlineText from "@/app/components/text/InlineText";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportLockedUnitProps } from "../models/DamageReportLockedUnitProps.interface";
import {
  DAMAGE_REPORT_UNIT_BOX_CLASS,
  DAMAGE_REPORT_UNIT_CODE_CLASS,
} from "../styles/DamageReportForm.styles";
import type { JSX } from "react";

const DamageReportLockedUnit = ({
  unit,
}: DamageReportLockedUnitProps): JSX.Element => (
  <div className={DAMAGE_REPORT_UNIT_BOX_CLASS}>
    <InlineText className={DAMAGE_REPORT_UNIT_CODE_CLASS}>
      {DAMAGE_REPORT_COPY.UNIT_OPTION(
        unit.code,
        unit.categoryName
      )}
    </InlineText>
    <ImpactCount count={unit.impactCount} />
  </div>
);

export default DamageReportLockedUnit;
