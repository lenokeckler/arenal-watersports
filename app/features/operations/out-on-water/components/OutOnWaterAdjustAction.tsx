"use client";

import { useState } from "react";
import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import { BUTTON_TYPES } from "@/app/constants";
import { OUT_ON_WATER_COPY } from "../constants/OutOnWaterCopy.constants";
import type { OutOnWaterAdjustActionProps } from "../models/OutOnWaterAdjustActionProps.interface";
import { OUT_ON_WATER_ADJUST_BUTTON_CLASS } from "../styles/OutOnWater.styles";
import DurationAdjustSheet from "./DurationAdjustSheet";

const OutOnWaterAdjustAction = ({
  group,
}: OutOnWaterAdjustActionProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.SECONDARY}
        className={OUT_ON_WATER_ADJUST_BUTTON_CLASS}
        onClick={() => setIsOpen(true)}
      >
        {OUT_ON_WATER_COPY.ADJUST_BUTTON}
      </Button>
      {isOpen && (
        <DurationAdjustSheet
          group={group}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default OutOnWaterAdjustAction;
