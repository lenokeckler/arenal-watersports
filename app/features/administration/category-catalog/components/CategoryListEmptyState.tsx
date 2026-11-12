import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import {
  CATEGORY_LIST_STATE_BODY_CLASS,
  CATEGORY_LIST_STATE_TITLE_CLASS,
  CATEGORY_LIST_STATE_WRAPPER_CLASS,
} from "../styles/CategoryListStates.styles";

const CategoryListEmptyState = (): React.JSX.Element => (
  <div className={CATEGORY_LIST_STATE_WRAPPER_CLASS}>
    <Title
      variant={TitleVariant.AUXILIAR}
      text={CATEGORY_CATALOG_COPY.EMPTY_STATE_TITLE}
      className={CATEGORY_LIST_STATE_TITLE_CLASS}
    />
    <Text className={CATEGORY_LIST_STATE_BODY_CLASS}>
      {CATEGORY_CATALOG_COPY.EMPTY_STATE_BODY}
    </Text>
  </div>
);

export default CategoryListEmptyState;
