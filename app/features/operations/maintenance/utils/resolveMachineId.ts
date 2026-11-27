import { UUID_PATTERN } from "@/app/constants";
import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import { isString } from "@/app/utils/type-guards/isString";
import type { MaintenanceMachine } from "../models/MaintenanceMachine.interface";

export const resolveMachineId = (
  requested: NullableUndefined<string | string[]>,
  machines: MaintenanceMachine[]
): NullableRef<string> =>
  isString(requested) &&
  UUID_PATTERN.test(requested) &&
  machines.some((machine) => machine.id === requested)
    ? requested
    : null;
