import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { getDamageReportUnits } from "@/app/features/operations/damage-report/services/getDamageReportUnits";
import DamageReportFormContainer from "@/app/features/operations/damage-report/components/DamageReportFormContainer";
import { DAMAGE_REPORT_COPY } from "@/app/features/operations/damage-report/constants/DamageReportCopy.constants";
import {
  DAMAGE_REPORT_PAGE_CLASS,
  DAMAGE_REPORT_CONTENT_CLASS,
} from "./styles/DamageReportPage.style";
import { DAMAGE_REPORT_TITLE_CLASS } from "@/app/features/operations/damage-report/styles/DamageReportForm.styles";

export default async function DamageReportPage() {
  const units = await getDamageReportUnits();

  return (
    <main className={DAMAGE_REPORT_PAGE_CLASS}>
      <div className={DAMAGE_REPORT_CONTENT_CLASS}>
        <Title
          variant={TitleVariant.PRIMARY}
          text={DAMAGE_REPORT_COPY.TITLE}
          className={DAMAGE_REPORT_TITLE_CLASS}
        />
        <DamageReportFormContainer units={units} />
      </div>
    </main>
  );
}
