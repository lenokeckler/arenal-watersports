import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import type { ExtraCardActionButtonProps } from "../models/ExtraCardActionButtonProps.interface";
import { EXTRA_CARD_REACTIVATE_BUTTON_CLASS } from "../styles/ExtraCardActions.styles";

const ExtraCardReactivateButton = ({
  isLoading,
  onClick,
}: ExtraCardActionButtonProps): React.JSX.Element => (
  <Button
    variant={BUTTON.BASE}
    isLoading={isLoading}
    loadingText={EXTRA_CATALOG_COPY.LOADING_TEXT_UPDATING}
    onClick={onClick}
    className={EXTRA_CARD_REACTIVATE_BUTTON_CLASS}
  >
    {EXTRA_CATALOG_COPY.REACTIVATE_BUTTON}
  </Button>
);

export default ExtraCardReactivateButton;
