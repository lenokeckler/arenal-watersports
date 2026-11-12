"use client";

import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import { CLOSE_GROUP_PHASE } from "../constants/CloseGroup.constants";
import { CLOSE_GROUP_COPY } from "../constants/CloseGroupCopy.constants";
import { useGroupReturnUnits } from "../hooks/useGroupReturnUnits";
import type { CloseGroupSheetProps } from "../models/CloseGroupSheetProps.interface";
import {
  DURATION_ADJUST_ERROR_CLASS,
  OUT_ON_WATER_CARD_DETAIL_CLASS,
} from "../styles/OutOnWater.styles";
import CloseGroupFormView from "./CloseGroupFormView";

const CloseGroupSheet = ({
  group,
  onClose,
}: CloseGroupSheetProps): React.JSX.Element => {
  const { phase, units } = useGroupReturnUnits(
    group.dispatchId
  );

  return (
    <ActionSheet
      title={`${CLOSE_GROUP_COPY.TITLE_PREFIX}${group.customerName}`}
      onClose={onClose}
    >
      {phase === CLOSE_GROUP_PHASE.LOADING && (
        <Text className={OUT_ON_WATER_CARD_DETAIL_CLASS}>
          {CLOSE_GROUP_COPY.LOADING}
        </Text>
      )}
      {phase === CLOSE_GROUP_PHASE.FAILED && (
        <Text
          className={DURATION_ADJUST_ERROR_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {CLOSE_GROUP_COPY.LOAD_ERROR}
        </Text>
      )}
      {phase === CLOSE_GROUP_PHASE.READY && (
        <CloseGroupFormView
          group={group}
          onClosed={onClose}
          units={units}
        />
      )}
    </ActionSheet>
  );
};

export default CloseGroupSheet;
