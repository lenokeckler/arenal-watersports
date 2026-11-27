import type { NullableRef } from "@/app/types";
import type { DamageReportFailure } from "../models/DamageReportFailure.interface";
import type { DamageReportResult } from "../models/DamageReportResult.type";
import { resolveDamageReportFailure } from "./resolveDamageReportFailure";

export const toDamageReportResult = (
  error: NullableRef<DamageReportFailure>
): DamageReportResult =>
  error
    ? {
        message: resolveDamageReportFailure(error),
        ok: false,
      }
    : { ok: true };
