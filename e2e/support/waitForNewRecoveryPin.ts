import { E2E_MAIL_WAIT_MS } from "../constants/E2ePasswordRecovery.constants";
import { failE2eOperation } from "./failE2eOperation";
import { listMailTo } from "./listMailTo";
import { pollMail } from "./pollMail";
import { readRecoveryPin } from "./readRecoveryPin";

export const waitForNewRecoveryPin = async (
  address: string,
  previousPin: string
): Promise<string> => {
  let latestPin = previousPin;
  await pollMail({
    read: async () => {
      latestPin = await readRecoveryPin(address);

      return latestPin === previousPin
        ? []
        : listMailTo(address);
    },
    timeoutMs: E2E_MAIL_WAIT_MS.ARRIVAL_TIMEOUT,
  });

  return latestPin === previousPin
    ? failE2eOperation(
        "receive a new recovery PIN",
        `no newer PIN reached ${address}`
      )
    : latestPin;
};
