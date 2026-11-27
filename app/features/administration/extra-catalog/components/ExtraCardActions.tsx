import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import { EXTRA_CARD_ACTION_STATE } from "../constants/ExtraCardActionState.constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import type { ExtraCardActionsProps } from "../models/ExtraCardActionsProps.interface";
import {
  EXTRA_CARD_ACTION_ICON_CLASS,
  EXTRA_CARD_ACTIONS_ROW_CLASS,
  EXTRA_CARD_COMPATIBILITY_LINK_CLASS,
} from "../styles/ExtraCardActions.styles";
import ExtraCardSingleAction from "./ExtraCardSingleAction";

const ExtraCardActions = ({
  compatibilityHref,
  ...singleActionProps
}: ExtraCardActionsProps): React.JSX.Element => {
  const isInactive =
    singleActionProps.actionState ===
    EXTRA_CARD_ACTION_STATE.REACTIVATE;
  const compatibilityLink = (
    <Link
      href={compatibilityHref}
      className={EXTRA_CARD_COMPATIBILITY_LINK_CLASS}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.DIRECTIONS_BOAT}
        className={EXTRA_CARD_ACTION_ICON_CLASS}
      />
      <InlineText>
        {EXTRA_COMPATIBILITY_COPY.LINK}
      </InlineText>
    </Link>
  );

  return (
    <div className={EXTRA_CARD_ACTIONS_ROW_CLASS}>
      {isInactive ? null : compatibilityLink}
      <ExtraCardSingleAction {...singleActionProps} />
      {isInactive ? compatibilityLink : null}
    </div>
  );
};

export default ExtraCardActions;
