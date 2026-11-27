import type { DayEntry } from "../models/DayEntry.interface";
import type { DaySelection } from "../models/DaySelection.type";
import { matchesMachine } from "./matchesMachine";

export const matchesDayEntry = (
  entry: DayEntry,
  { day, machineId }: DaySelection
): boolean =>
  entry.date === day && matchesMachine(entry, machineId);
