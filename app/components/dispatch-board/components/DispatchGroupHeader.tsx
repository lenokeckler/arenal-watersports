"use client";

import Text from "@/app/components/text/Text";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import type { DispatchGroupHeaderProps } from "../models/DispatchGroupHeaderProps.interface";
import {
  DISPATCH_GROUP_HEADER_CLASS,
  DISPATCH_GROUP_TITLE_CLASS,
  DISPATCH_SHEET_MESSAGE_CLASS,
} from "../styles/DispatchSheet.styles";

const DispatchGroupHeader = ({
  group,
}: DispatchGroupHeaderProps): React.JSX.Element => {
  const motorLabel = group.hasMotor
    ? DISPATCH_SHEET_COPY.WITH_MOTOR
    : DISPATCH_SHEET_COPY.WITHOUT_MOTOR;
  const committedCount = group.isTrackedByUnit
    ? group.fixedUnitIds.length + group.requiredQuantity
    : group.requiredQuantity;

  return (
    <div className={DISPATCH_GROUP_HEADER_CLASS}>
      <Text className={DISPATCH_GROUP_TITLE_CLASS}>
        {group.categoryName}
      </Text>
      <Text className={DISPATCH_SHEET_MESSAGE_CLASS}>
        {`${DISPATCH_SHEET_COPY.PENDING_LABEL} ${committedCount}${DISPATCH_SHEET_COPY.GROUP_SEPARATOR}${motorLabel}`}
      </Text>
    </div>
  );
};

export default DispatchGroupHeader;
