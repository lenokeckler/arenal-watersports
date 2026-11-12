import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryCardActionButtonProps } from "../models/CategoryCardActionButtonProps.interface";
import { CATEGORY_CARD_ACTIONS_DELETE_BUTTON_CLASS } from "../styles/CategoryCardActions.styles";

const CategoryCardDeleteButton = ({
  isLoading,
  onClick,
}: CategoryCardActionButtonProps): React.JSX.Element => (
  <Button
    variant={BUTTON.BASE}
    isLoading={isLoading}
    loadingText={
      CATEGORY_CATALOG_COPY.LOADING_TEXT_DELETING
    }
    onClick={onClick}
    className={CATEGORY_CARD_ACTIONS_DELETE_BUTTON_CLASS}
  >
    {CATEGORY_CATALOG_COPY.DELETE_CATEGORY_BUTTON}
  </Button>
);

export default CategoryCardDeleteButton;
