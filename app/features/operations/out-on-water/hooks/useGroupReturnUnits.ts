"use client";

import { useEffect, useState } from "react";
import { loadGroupReturnUnits } from "../actions/loadGroupReturnUnits";
import { CLOSE_GROUP_PHASE } from "../constants/CloseGroup.constants";
import type { GroupReturnUnitsState } from "../models/GroupReturnUnitsState.interface";

export const useGroupReturnUnits = (
  dispatchId: string
): GroupReturnUnitsState => {
  const [state, setState] = useState<GroupReturnUnitsState>(
    {
      phase: CLOSE_GROUP_PHASE.LOADING,
      units: [],
    }
  );

  useEffect(() => {
    let isCurrent = true;

    loadGroupReturnUnits(dispatchId)
      .then((units) => {
        if (isCurrent) {
          setState({
            phase: CLOSE_GROUP_PHASE.READY,
            units,
          });
        }
      })
      .catch(() => {
        if (isCurrent) {
          setState({
            phase: CLOSE_GROUP_PHASE.FAILED,
            units: [],
          });
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [dispatchId]);

  return state;
};
