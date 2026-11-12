"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import Text from "@/app/components/text/Text";
import { BUTTON_TYPES } from "@/app/constants";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";
import {
  DISPATCH_SHEET_GROUP_BUTTON_CLASS,
  DISPATCH_SHEET_GROUP_LIST_CLASS,
  DISPATCH_SHEET_MESSAGE_CLASS,
  DISPATCH_SHEET_STACK_CLASS,
} from "../styles/DispatchSheet.styles";

interface DispatchSheetGroupChooserProps {
  groups: DispatchSheetGroup[];
  onSelect: (categoryId: string) => void;
}

const DispatchSheetGroupChooser = ({
  groups,
  onSelect,
}: DispatchSheetGroupChooserProps): React.JSX.Element => (
  <div className={DISPATCH_SHEET_STACK_CLASS}>
    <Text className={DISPATCH_SHEET_MESSAGE_CLASS}>
      {DISPATCH_SHEET_COPY.CHOOSE_GROUP}
    </Text>
    <div className={DISPATCH_SHEET_GROUP_LIST_CLASS}>
      {groups.map((group) => (
        <Button
          key={group.categoryId}
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.BASE}
          className={DISPATCH_SHEET_GROUP_BUTTON_CLASS}
          onClick={() => onSelect(group.categoryId)}
        >
          {`${group.categoryName}${DISPATCH_SHEET_COPY.GROUP_SEPARATOR}${
            group.hasMotor
              ? DISPATCH_SHEET_COPY.WITH_MOTOR
              : DISPATCH_SHEET_COPY.WITHOUT_MOTOR
          }`}
        </Button>
      ))}
    </div>
  </div>
);

export default DispatchSheetGroupChooser;
