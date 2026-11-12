import { EXTRA_CARD_ACTION_STATE } from "../constants/ExtraCardActionState.constants";
import type { ExtraCardSingleActionProps } from "../models/ExtraCardSingleActionProps.interface";
import ExtraCardReactivateButton from "./ExtraCardReactivateButton";
import ExtraCardRemoveButton from "./ExtraCardRemoveButton";

const ExtraCardSingleAction = ({
  actionState,
  isActionLoading,
  onReactivateClick,
  onRemoveClick,
}: ExtraCardSingleActionProps): React.JSX.Element =>
  actionState === EXTRA_CARD_ACTION_STATE.REACTIVATE ? (
    <ExtraCardReactivateButton
      isLoading={isActionLoading}
      onClick={onReactivateClick}
    />
  ) : (
    <ExtraCardRemoveButton
      isLoading={isActionLoading}
      onClick={onRemoveClick}
    />
  );

export default ExtraCardSingleAction;
