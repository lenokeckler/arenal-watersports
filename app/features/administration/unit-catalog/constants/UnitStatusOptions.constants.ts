import type { UnitFormSelectOption } from "../models/UnitFormSelectOption.interface";
import { UNIT_STATUS_LABEL } from "./UnitStatusLabel.constants";
import { UNIT_EDITABLE_STATUS } from "./UnitStatus.constants";

export const UNIT_STATUS_OPTIONS: UnitFormSelectOption[] =
  Object.values(UNIT_EDITABLE_STATUS).map((status) => ({
    key: status,
    value: status,
    label: UNIT_STATUS_LABEL[status],
  }));
