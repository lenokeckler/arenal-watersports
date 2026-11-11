import { deliverPasswordResetPin } from "./deliverPasswordResetPin";
import { markPasswordResetPinUndeliveredQuietly } from "./markPasswordResetPinUndeliveredQuietly";
import type { DeferredTask } from "./models/DeferredTask.type";
import type { IssuedPasswordResetPin } from "./models/IssuedPasswordResetPin.interface";

export const schedulePasswordResetPinDelivery = async (
  defer: DeferredTask,
  issued: IssuedPasswordResetPin,
  pin: string
): Promise<void> => {
  try {
    defer(() => deliverPasswordResetPin(issued, pin));
  } catch {
    await markPasswordResetPinUndeliveredQuietly(
      issued.pinId
    );
  }
};
