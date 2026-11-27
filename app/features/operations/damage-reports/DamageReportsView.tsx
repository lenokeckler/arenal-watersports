import ScreenBack from "@/app/components/screen-back/ScreenBack";
import ScreenHeading from "@/app/components/screen-heading/ScreenHeading";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import DamageReportsContent from "./components/DamageReportsContent";
import {
  DAMAGE_REPORTS_COPY,
  DAMAGE_REPORTS_HEADING_ID,
} from "./constants/DamageReportsCopy.constants";
import type { DamageReportsViewProps } from "./models/DamageReportsViewProps.interface";
import {
  DAMAGE_REPORTS_CLASS,
  DAMAGE_REPORTS_MESSAGE_CLASS,
  DAMAGE_REPORTS_SAVED_CLASS,
} from "./styles/DamageReports.styles";
import type { JSX } from "react";

const DamageReportsView = ({
  errorMessage,
  filters,
  overview,
  savedMessage,
}: DamageReportsViewProps): JSX.Element => (
  <main className={DAMAGE_REPORTS_CLASS}>
    <ScreenBack fallbackHref={PATHS.OPERATIONS.EQUIPMENT} />
    <ScreenHeading
      id={DAMAGE_REPORTS_HEADING_ID}
      title={DAMAGE_REPORTS_COPY.HEADING}
      action={
        errorMessage
          ? undefined
          : {
              href: PATHS.OPERATIONS.DAMAGE_REPORT,
              label: DAMAGE_REPORTS_COPY.NEW_REPORT,
            }
      }
    />
    {savedMessage && (
      <Text
        className={DAMAGE_REPORTS_SAVED_CLASS}
        role={ARIA_ROLE.STATUS}
      >
        {savedMessage}
      </Text>
    )}
    {errorMessage ? (
      <Text
        className={DAMAGE_REPORTS_MESSAGE_CLASS}
        role={ARIA_ROLE.ALERT}
      >
        {errorMessage}
      </Text>
    ) : (
      <DamageReportsContent
        filters={filters}
        overview={overview}
      />
    )}
  </main>
);

export default DamageReportsView;
