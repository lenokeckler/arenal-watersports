import Link from "@/app/components/link/Link";
import { EXTRA_CARD_ACTION_STATE } from "../constants/ExtraCardActionState.constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import type { ExtraCardActionsProps } from "../models/ExtraCardActionsProps.interface";
import {
  EXTRA_CARD_ACTIONS_ROW_CLASS,
  EXTRA_CARD_EDIT_LINK_CLASS,
} from "../styles/ExtraCardActions.styles";
import ExtraCardConfirmRemovalActions from "./ExtraCardConfirmRemovalActions";
import ExtraCardSingleAction from "./ExtraCardSingleAction";

const ExtraCardActions = ({
  editHref,
  onCancelClick,
  onConfirmRemovalClick,
  ...singleActionProps
}: ExtraCardActionsProps): React.JSX.Element =>
  singleActionProps.actionState ===
  EXTRA_CARD_ACTION_STATE.CONFIRM_REMOVAL ? (
    <ExtraCardConfirmRemovalActions
      isActionLoading={singleActionProps.isActionLoading}
      onCancelClick={onCancelClick}
      onConfirmRemovalClick={onConfirmRemovalClick}
    />
  ) : (
    <div className={EXTRA_CARD_ACTIONS_ROW_CLASS}>
      <Link
        href={editHref}
        className={EXTRA_CARD_EDIT_LINK_CLASS}
      >
        {EXTRA_CATALOG_COPY.EDIT_LINK}
      </Link>
      <ExtraCardSingleAction {...singleActionProps} />
    </div>
  );

export default ExtraCardActions;
