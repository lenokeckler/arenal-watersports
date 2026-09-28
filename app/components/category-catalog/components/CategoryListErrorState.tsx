import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { BUTTON } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalog.copy";
import type { CategoryListErrorStateProps } from "../models/CategoryListErrorStateProps.interface";
import {
  CATEGORY_LIST_STATE_BUTTON_CLASS,
  CATEGORY_LIST_STATE_ERROR_BODY_CLASS,
  CATEGORY_LIST_STATE_WRAPPER_CLASS,
} from "../styles/CategoryListStates.styles";

const CategoryListErrorState = ({
  onRetry,
}: CategoryListErrorStateProps): React.JSX.Element => (
  <div className={CATEGORY_LIST_STATE_WRAPPER_CLASS}>
    <Text className={CATEGORY_LIST_STATE_ERROR_BODY_CLASS}>
      {CATEGORY_CATALOG_COPY.FETCH_ERROR_MESSAGE}
    </Text>
    <Button
      variant={BUTTON.SECONDARY}
      onClick={onRetry}
      className={CATEGORY_LIST_STATE_BUTTON_CLASS}
    >
      {CATEGORY_CATALOG_COPY.RETRY_BUTTON}
    </Button>
  </div>
);

export default CategoryListErrorState;
