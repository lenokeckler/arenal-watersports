import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import { isString } from "@/app/utils/type-guards/isString";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportLoad } from "../models/DamageReportLoad.interface";
import type { DamageReportProps } from "../models/DamageReportProps.interface";
import { getDamageReportScreen } from "./getDamageReportScreen";

const readParam = (
  value: DamageReportProps["unitParam"]
): NullableRef<string> => (isString(value) ? value : null);

export const loadDamageReportScreen = async ({
  reportParam,
  unitParam,
}: DamageReportProps): Promise<DamageReportLoad> => {
  try {
    const screen = await getDamageReportScreen(
      readParam(unitParam),
      readParam(reportParam)
    );

    return {
      errorMessage: screen
        ? null
        : DAMAGE_REPORT_COPY.REPORT_NOT_FOUND,
      screen,
    };
  } catch (error) {
    return {
      errorMessage:
        error instanceof OperationsAccessError
          ? DAMAGE_REPORT_COPY.FORBIDDEN
          : DAMAGE_REPORT_COPY.ERROR_LOAD,
      screen: null,
    };
  }
};
