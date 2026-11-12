import { UNIT_FORM_COPY } from "./UnitFormCopy.constants";
import {
  UNIT_USAGE_METRIC,
  type UnitUsageMetric,
} from "./UnitUsageMetric.constants";

export const UNIT_USAGE_FIELD_LABEL: Record<
  UnitUsageMetric,
  string
> = {
  [UNIT_USAGE_METRIC.ENGINE_HOURS]:
    UNIT_FORM_COPY.USAGE_HOURS_LABEL,
  [UNIT_USAGE_METRIC.KILOMETERS]:
    UNIT_FORM_COPY.USAGE_KILOMETERS_LABEL,
};
