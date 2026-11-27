import { UUID_PATTERN } from "@/app/constants";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import UnitHistoryView from "./UnitHistoryView";
import { UNIT_HISTORY_COPY } from "./constants/UnitHistoryCopy.constants";
import type { UnitHistoryData } from "./models/UnitHistoryData.interface";
import type { UnitHistoryProps } from "./models/UnitHistoryProps.interface";
import { getUnitHistory } from "./services/getUnitHistory";
import type { JSX } from "react";

const UnitHistory = async ({
  page,
  unitId,
}: UnitHistoryProps): Promise<JSX.Element> => {
  let data: NullableRef<UnitHistoryData> = null;
  let errorMessage: NullableRef<string> = null;

  try {
    data = UUID_PATTERN.test(unitId)
      ? await getUnitHistory(unitId)
      : null;
    errorMessage = data
      ? null
      : UNIT_HISTORY_COPY.NOT_FOUND;
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? UNIT_HISTORY_COPY.FORBIDDEN
        : UNIT_HISTORY_COPY.ERROR;
  }

  return (
    <UnitHistoryView
      data={data}
      errorMessage={errorMessage}
      page={page}
    />
  );
};

export default UnitHistory;
