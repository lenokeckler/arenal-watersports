import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import OutOnWaterView from "./OutOnWaterView";
import { OUT_ON_WATER_COPY } from "./constants/OutOnWaterCopy.constants";
import type { DispatchedGroupOut } from "./models/DispatchedGroupOut.interface";
import { getDispatchedGroupsOut } from "./services/getDispatchedGroupsOut";
import type { JSX } from "react";

const OutOnWater = async (): Promise<JSX.Element> => {
  let groups: DispatchedGroupOut[] = [];
  let errorMessage: NullableRef<string> = null;

  try {
    groups = await getDispatchedGroupsOut();
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? OUT_ON_WATER_COPY.FORBIDDEN
        : OUT_ON_WATER_COPY.ERROR;
  }

  return (
    <OutOnWaterView
      errorMessage={errorMessage}
      groups={groups}
      nowIso={new Date().toISOString()}
    />
  );
};

export default OutOnWater;
