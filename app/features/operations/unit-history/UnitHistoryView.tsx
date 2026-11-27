import ImpactCount from "@/app/components/impact-count/ImpactCount";
import ScreenBack from "@/app/components/screen-back/ScreenBack";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ARIA_ROLE,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import UnitHistoryContent from "./components/UnitHistoryContent";
import { UNIT_HISTORY_COPY } from "./constants/UnitHistoryCopy.constants";
import type { UnitHistoryViewProps } from "./models/UnitHistoryViewProps.interface";
import {
  UNIT_HISTORY_CLASS,
  UNIT_HISTORY_HEADING_CLASS,
  UNIT_HISTORY_HEADING_ROW_CLASS,
  UNIT_HISTORY_MESSAGE_CLASS,
} from "./styles/UnitHistory.styles";
import type { JSX } from "react";

const UnitHistoryView = ({
  data,
  errorMessage,
  page,
}: UnitHistoryViewProps): JSX.Element => (
  <main className={UNIT_HISTORY_CLASS}>
    <ScreenBack
      fallbackHref={PATHS.OPERATIONS.MAINTENANCE}
    />
    <div className={UNIT_HISTORY_HEADING_ROW_CLASS}>
      <Title
        variant={TitleVariant.PRIMARY}
        text={
          data ? data.unit.code : UNIT_HISTORY_COPY.HEADING
        }
        className={UNIT_HISTORY_HEADING_CLASS}
      />
      {data && (
        <ImpactCount count={data.unit.impactCount} />
      )}
    </div>
    {data ? (
      <UnitHistoryContent
        data={data}
        page={page}
      />
    ) : (
      <Text
        className={UNIT_HISTORY_MESSAGE_CLASS}
        role={ARIA_ROLE.ALERT}
      >
        {errorMessage}
      </Text>
    )}
  </main>
);

export default UnitHistoryView;
