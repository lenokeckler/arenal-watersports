import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import { COMBO_STATUS } from "../constants/ComboStatus.constants";
import type { ComboCardViewModel } from "../models/ComboCardViewModel.interface";
import {
  COMBO_CARD_REACTIVATE_BUTTON_CLASS,
  COMBO_CARD_REMOVE_BUTTON_CLASS,
} from "../styles/ComboCard.styles";

const ComboCardActions = ({
  isActionLoading,
  onReactivateClick,
  onRemoveClick,
  status,
}: ComboCardViewModel): React.JSX.Element =>
  status === COMBO_STATUS.INACTIVE ? (
    <Button
      variant={BUTTON.BASE}
      isLoading={isActionLoading}
      loadingText={COMBO_CATALOG_COPY.LOADING_TEXT_UPDATING}
      onClick={onReactivateClick}
      className={COMBO_CARD_REACTIVATE_BUTTON_CLASS}
    >
      {COMBO_CATALOG_COPY.REACTIVATE_BUTTON}
    </Button>
  ) : (
    <Button
      variant={BUTTON.BASE}
      isLoading={isActionLoading}
      loadingText={COMBO_CATALOG_COPY.LOADING_TEXT_DELETING}
      onClick={onRemoveClick}
      className={COMBO_CARD_REMOVE_BUTTON_CLASS}
    >
      {COMBO_CATALOG_COPY.REMOVE_BUTTON}
    </Button>
  );

export default ComboCardActions;
