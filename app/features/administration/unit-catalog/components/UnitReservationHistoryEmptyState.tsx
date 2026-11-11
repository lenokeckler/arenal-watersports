import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { UNIT_RESERVATION_HISTORY_COPY } from "../constants/UnitReservationHistoryCopy.constants";
import {
  UNIT_LIST_STATE_BODY_CLASS,
  UNIT_LIST_STATE_TITLE_CLASS,
  UNIT_LIST_STATE_WRAPPER_CLASS,
} from "../styles/UnitListStates.styles";

const UnitReservationHistoryEmptyState =
  (): React.JSX.Element => (
    <div className={UNIT_LIST_STATE_WRAPPER_CLASS}>
      <Title
        variant={TitleVariant.AUXILIAR}
        text={
          UNIT_RESERVATION_HISTORY_COPY.EMPTY_STATE_TITLE
        }
        className={UNIT_LIST_STATE_TITLE_CLASS}
      />
      <Text className={UNIT_LIST_STATE_BODY_CLASS}>
        {UNIT_RESERVATION_HISTORY_COPY.EMPTY_STATE_BODY}
      </Text>
    </div>
  );

export default UnitReservationHistoryEmptyState;
