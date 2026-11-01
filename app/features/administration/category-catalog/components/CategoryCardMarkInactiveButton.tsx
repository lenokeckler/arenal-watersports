import Button from "@/app/components/button/Button";
import { BUTTON, SIZE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryCardActionButtonProps } from "../models/CategoryCardActionButtonProps.interface";
import { CATEGORY_CARD_ACTIONS_BUTTON_CLASS } from "../styles/CategoryCardActions.styles";

const CategoryCardMarkInactiveButton = ({
  isLoading,
  onClick,
}: CategoryCardActionButtonProps): React.JSX.Element => (
  <Button
    variant={BUTTON.SECONDARY}
    size={SIZE.FULL}
    isLoading={isLoading}
    loadingText={
      CATEGORY_CATALOG_COPY.LOADING_TEXT_UPDATING
    }
    onClick={onClick}
    className={CATEGORY_CARD_ACTIONS_BUTTON_CLASS}
  >
    {CATEGORY_CATALOG_COPY.MARK_INACTIVE_BUTTON}
  </Button>
);

export default CategoryCardMarkInactiveButton;
