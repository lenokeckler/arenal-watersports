import { E2E_MAIL_MISSING_MESSAGE } from "../constants/E2ePasswordRecovery.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { MailpitMessage } from "./models/MailpitMessage.interface";
import { waitForMailTo } from "./waitForMailTo";

export const waitForDeliveredMail = async (
  address: string
): Promise<MailpitMessage[]> => {
  const messages = await waitForMailTo(address);

  if (messages.length === 0) {
    failE2eOperation(
      "receive the recovery mail",
      E2E_MAIL_MISSING_MESSAGE(address)
    );
  }

  return messages;
};
