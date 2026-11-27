import ScreenBack from "@/app/components/screen-back/ScreenBack";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ARIA_ROLE,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import DamageReportForm from "./components/DamageReportForm";
import { DAMAGE_REPORT_COPY } from "./constants/DamageReportCopy.constants";
import type { DamageReportProps } from "./models/DamageReportProps.interface";
import { loadDamageReportScreen } from "./services/loadDamageReportScreen";
import {
  DAMAGE_REPORT_MESSAGE_CLASS,
  DAMAGE_REPORT_PAGE_CLASS,
  DAMAGE_REPORT_TITLE_CLASS,
} from "./styles/DamageReportForm.styles";
import type { JSX } from "react";

const DamageReport = async (
  props: DamageReportProps = {}
): Promise<JSX.Element> => {
  const { errorMessage, screen } =
    await loadDamageReportScreen(props);

  return (
    <main className={DAMAGE_REPORT_PAGE_CLASS}>
      <ScreenBack
        fallbackHref={PATHS.OPERATIONS.DAMAGE_REPORTS}
      />
      <Title
        variant={TitleVariant.PRIMARY}
        text={
          props.reportParam
            ? DAMAGE_REPORT_COPY.TITLE_COMPLETE
            : DAMAGE_REPORT_COPY.TITLE
        }
        className={DAMAGE_REPORT_TITLE_CLASS}
      />
      {screen ? (
        <DamageReportForm screen={screen} />
      ) : (
        <Text
          className={DAMAGE_REPORT_MESSAGE_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {errorMessage}
        </Text>
      )}
    </main>
  );
};

export default DamageReport;
