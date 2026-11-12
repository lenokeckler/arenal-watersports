import type { ServerErrorReportLevel } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export interface ServerErrorReport {
  errorCode: NullableRef<string>;
  errorName: string;
  level: ServerErrorReportLevel;
  operation: string;
}
