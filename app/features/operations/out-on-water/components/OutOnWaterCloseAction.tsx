"use client";

import { useState } from "react";
import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import { BUTTON_TYPES } from "@/app/constants";
import { CLOSE_GROUP_COPY } from "../constants/CloseGroupCopy.constants";
import type { OutOnWaterAdjustActionProps } from "../models/OutOnWaterAdjustActionProps.interface";
import { OUT_ON_WATER_ADJUST_BUTTON_CLASS } from "../styles/OutOnWater.styles";
import CloseGroupSheet from "./CloseGroupSheet";

const OutOnWaterCloseAction = ({
  group,
}: OutOnWaterAdjustActionProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.PRIMARY}
        className={OUT_ON_WATER_ADJUST_BUTTON_CLASS}
        onClick={() => setIsOpen(true)}
      >
        {CLOSE_GROUP_COPY.BUTTON}
      </Button>
      {isOpen && (
        <CloseGroupSheet
          group={group}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default OutOnWaterCloseAction;
