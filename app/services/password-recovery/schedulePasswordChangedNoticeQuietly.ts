import { deliverPasswordChangedNoticeQuietly } from "./deliverPasswordChangedNoticeQuietly";
import type { DeferredTask } from "./models/DeferredTask.type";

export const schedulePasswordChangedNoticeQuietly = async (
  defer: DeferredTask,
  workerId: string
): Promise<void> => {
  await new Promise<void>((resolve) => {
    defer(() =>
      deliverPasswordChangedNoticeQuietly(workerId)
    );
    resolve();
  }).catch(() => undefined);
};
