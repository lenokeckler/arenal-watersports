import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { BUTTON } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import type { ExtraListErrorStateProps } from "../models/ExtraListErrorStateProps.interface";
import {
  EXTRA_LIST_STATE_BUTTON_CLASS,
  EXTRA_LIST_STATE_ERROR_BODY_CLASS,
  EXTRA_LIST_STATE_WRAPPER_CLASS,
} from "../styles/ExtraListStates.styles";

const ExtraListErrorState = ({
  onRetry,
}: ExtraListErrorStateProps): React.JSX.Element => (
  <div className={EXTRA_LIST_STATE_WRAPPER_CLASS}>
    <Text className={EXTRA_LIST_STATE_ERROR_BODY_CLASS}>
      {EXTRA_CATALOG_COPY.FETCH_ERROR_MESSAGE}
    </Text>
    <Button
      variant={BUTTON.SECONDARY}
      onClick={onRetry}
      className={EXTRA_LIST_STATE_BUTTON_CLASS}
    >
      {EXTRA_CATALOG_COPY.RETRY_BUTTON}
    </Button>
  </div>
);

export default ExtraListErrorState;
