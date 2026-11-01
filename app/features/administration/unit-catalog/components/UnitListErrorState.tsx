import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { BUTTON } from "@/app/constants";
import { UNIT_LIST_COPY } from "../constants/UnitListCopy.constants";
import type { UnitListErrorStateProps } from "../models/UnitListErrorStateProps.interface";
import {
  UNIT_LIST_STATE_BUTTON_CLASS,
  UNIT_LIST_STATE_ERROR_BODY_CLASS,
  UNIT_LIST_STATE_WRAPPER_CLASS,
} from "../styles/UnitListStates.styles";

const UnitListErrorState = ({
  onRetry,
}: UnitListErrorStateProps): React.JSX.Element => (
  <div className={UNIT_LIST_STATE_WRAPPER_CLASS}>
    <Text className={UNIT_LIST_STATE_ERROR_BODY_CLASS}>
      {UNIT_LIST_COPY.FETCH_ERROR_MESSAGE}
    </Text>
    <Button
      variant={BUTTON.SECONDARY}
      onClick={onRetry}
      className={UNIT_LIST_STATE_BUTTON_CLASS}
    >
      {UNIT_LIST_COPY.RETRY_BUTTON}
    </Button>
  </div>
);

export default UnitListErrorState;
