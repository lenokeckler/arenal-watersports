import { readRecoveryPin } from "./readRecoveryPin";
import { waitForDeliveredMail } from "./waitForDeliveredMail";

export const readDeliveredRecoveryPin = async (
  address: string
): Promise<string> => {
  await waitForDeliveredMail(address);

  return readRecoveryPin(address);
};
