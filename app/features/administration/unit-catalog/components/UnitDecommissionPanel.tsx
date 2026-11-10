"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { UNIT_DECOMMISSION_COPY } from "../constants/UnitDecommissionCopy.constants";
import { useUnitDecommission } from "../hooks/useUnitDecommission";
import type { UnitDecommissionPanelProps } from "../models/UnitDecommissionPanelProps.interface";
import { UNIT_DECOMMISSION_PANEL_CLASS } from "../styles/UnitDecommission.styles";
import { UNIT_FORM_ACTION_BUTTON_CLASS } from "../styles/UnitForm.styles";
import UnitDecommissionConfirm from "./UnitDecommissionConfirm";

const UnitDecommissionPanel = (
  panelProps: UnitDecommissionPanelProps
): React.JSX.Element => {
  const { isConfirming, onStartClick, ...confirmProps } =
    useUnitDecommission(panelProps);

  return (
    <div className={UNIT_DECOMMISSION_PANEL_CLASS}>
      {isConfirming ? (
        <UnitDecommissionConfirm {...confirmProps} />
      ) : (
        <Button
          variant={BUTTON.DANGER}
          type="button"
          onClick={onStartClick}
          className={UNIT_FORM_ACTION_BUTTON_CLASS}
        >
          {UNIT_DECOMMISSION_COPY.OPEN_BUTTON}
        </Button>
      )}
    </div>
  );
};

export default UnitDecommissionPanel;
