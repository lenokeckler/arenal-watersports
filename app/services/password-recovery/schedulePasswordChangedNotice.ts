import { deliverPasswordChangedNotice } from "./deliverPasswordChangedNotice";
import type { DeferredTask } from "./models/DeferredTask.type";

export const schedulePasswordChangedNotice = (
  defer: DeferredTask,
  workerId: string
): boolean => {
  try {
    defer(() => deliverPasswordChangedNotice(workerId));

    return true;
  } catch {
    return false;
  }
};
