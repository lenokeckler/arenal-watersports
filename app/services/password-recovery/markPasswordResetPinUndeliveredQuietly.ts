import { markPasswordResetPinUndelivered } from "./markPasswordResetPinUndelivered";

export const markPasswordResetPinUndeliveredQuietly =
  async (pinId: string): Promise<void> => {
    await markPasswordResetPinUndelivered(pinId).catch(
      () => undefined
    );
  };
