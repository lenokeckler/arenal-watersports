import { setTimeout as pause } from "node:timers/promises";
import { E2E_MAIL_WAIT_MS } from "../constants/E2ePasswordRecovery.constants";
import { failE2eOperation } from "./failE2eOperation";
import { readRecoveryPin } from "./readRecoveryPin";

export const waitForNewRecoveryPin = async (
  address: string,
  previousPin: string
): Promise<string> => {
  const deadline =
    Date.now() + E2E_MAIL_WAIT_MS.ARRIVAL_TIMEOUT;

  while (Date.now() < deadline) {
    const pin = await readRecoveryPin(address);

    if (pin !== previousPin) {
      return pin;
    }

    await pause(E2E_MAIL_WAIT_MS.POLL_INTERVAL);
  }

  return failE2eOperation(
    "receive a new recovery PIN",
    `no newer PIN reached ${address}`
  );
};
