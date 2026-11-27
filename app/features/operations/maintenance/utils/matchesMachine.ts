import type { NullableRef } from "@/app/types";
import type { DayEntry } from "../models/DayEntry.interface";

export const matchesMachine = (
  entry: DayEntry,
  machineId: NullableRef<string>
): boolean => !machineId || entry.unitId === machineId;
