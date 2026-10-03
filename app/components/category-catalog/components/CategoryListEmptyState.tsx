import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { BUTTON, TitleVariant } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryListCreateCtaProps } from "../models/CategoryListCreateCtaProps.interface";
import {
  CATEGORY_LIST_STATE_BODY_CLASS,
  CATEGORY_LIST_STATE_BUTTON_CLASS,
  CATEGORY_LIST_STATE_TITLE_CLASS,
  CATEGORY_LIST_STATE_WRAPPER_CLASS,
} from "../styles/CategoryListStates.styles";

const CategoryListEmptyState = ({
  onCreateCategory,
}: CategoryListCreateCtaProps): React.JSX.Element => (
  <div className={CATEGORY_LIST_STATE_WRAPPER_CLASS}>
    <Title
      variant={TitleVariant.AUXILIAR}
      text={CATEGORY_CATALOG_COPY.EMPTY_STATE_TITLE}
      className={CATEGORY_LIST_STATE_TITLE_CLASS}
    />
    <Text className={CATEGORY_LIST_STATE_BODY_CLASS}>
      {CATEGORY_CATALOG_COPY.EMPTY_STATE_BODY}
    </Text>
    <Button
      variant={BUTTON.PRIMARY}
      onClick={onCreateCategory}
      className={CATEGORY_LIST_STATE_BUTTON_CLASS}
    >
      {CATEGORY_CATALOG_COPY.CREATE_CTA}
    </Button>
  </div>
);

export default CategoryListEmptyState;
