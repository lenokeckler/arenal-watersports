"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { BUTTON_TYPES } from "@/app/constants";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import type { DispatchTakeCountProps } from "../models/DispatchTakeCountProps.interface";
import {
  DISPATCH_SHEET_LEGEND_CLASS,
  DISPATCH_SHEET_UNIT_NOTE_CLASS,
  DISPATCH_TAKE_BLOCK_CLASS,
  DISPATCH_TAKE_BUTTON_CLASS,
  DISPATCH_TAKE_ROW_CLASS,
  DISPATCH_TAKE_VALUE_CLASS,
} from "../styles/DispatchSheet.styles";

const DispatchTakeCount = ({
  requiredQuantity,
  take,
}: DispatchTakeCountProps): React.JSX.Element | null => {
  if (!take.isAdjustable) {
    return null;
  }

  return (
    <div className={DISPATCH_TAKE_BLOCK_CLASS}>
      <Text className={DISPATCH_SHEET_LEGEND_CLASS}>
        {DISPATCH_SHEET_COPY.TAKE_LABEL}
      </Text>
      <div className={DISPATCH_TAKE_ROW_CLASS}>
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.SECONDARY}
          className={DISPATCH_TAKE_BUTTON_CLASS}
          aria-label={DISPATCH_SHEET_COPY.TAKE_LESS}
          disabled={!take.canTakeLess}
          onClick={take.handleTakeLess}
        >
          {DISPATCH_SHEET_COPY.STEPPER_LESS_TEXT}
        </Button>
        <InlineText className={DISPATCH_TAKE_VALUE_CLASS}>
          {`${take.count}${DISPATCH_SHEET_COPY.SELECTED_OF}${requiredQuantity}`}
        </InlineText>
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.SECONDARY}
          className={DISPATCH_TAKE_BUTTON_CLASS}
          aria-label={DISPATCH_SHEET_COPY.TAKE_MORE}
          disabled={!take.canTakeMore}
          onClick={take.handleTakeMore}
        >
          {DISPATCH_SHEET_COPY.STEPPER_MORE_TEXT}
        </Button>
      </div>
      {take.pendingAfter > 0 && (
        <Text className={DISPATCH_SHEET_UNIT_NOTE_CLASS}>
          {DISPATCH_SHEET_COPY.TAKE_REST(take.pendingAfter)}
        </Text>
      )}
    </div>
  );
};

export default DispatchTakeCount;
