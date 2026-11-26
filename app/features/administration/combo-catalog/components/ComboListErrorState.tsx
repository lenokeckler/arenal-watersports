import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { BUTTON } from "@/app/constants";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import type { ComboListErrorStateProps } from "../models/ComboListErrorStateProps.interface";
import {
  COMBO_LIST_BUTTON_CLASS,
  COMBO_LIST_ERROR_BODY_CLASS,
  COMBO_LIST_ERROR_WRAPPER_CLASS,
} from "../styles/ComboList.styles";

const ComboListErrorState = ({
  onRetry,
}: ComboListErrorStateProps): React.JSX.Element => (
  <div className={COMBO_LIST_ERROR_WRAPPER_CLASS}>
    <Text className={COMBO_LIST_ERROR_BODY_CLASS}>
      {COMBO_CATALOG_COPY.FETCH_ERROR_MESSAGE}
    </Text>
    <Button
      variant={BUTTON.SECONDARY}
      onClick={onRetry}
      className={COMBO_LIST_BUTTON_CLASS}
    >
      {COMBO_CATALOG_COPY.RETRY_BUTTON}
    </Button>
  </div>
);

export default ComboListErrorState;
