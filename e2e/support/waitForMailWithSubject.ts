import { E2E_MAIL_WAIT_MS } from "../constants/E2ePasswordRecovery.constants";
import { failE2eOperation } from "./failE2eOperation";
import { listMailTo } from "./listMailTo";
import type { MailpitMessage } from "./models/MailpitMessage.interface";
import { pollMail } from "./pollMail";

export const waitForMailWithSubject = async (
  address: string,
  subject: string
): Promise<MailpitMessage> => {
  const [message] = await pollMail({
    read: async () =>
      (await listMailTo(address)).filter(
        (candidate) => candidate.Subject === subject
      ),
    timeoutMs: E2E_MAIL_WAIT_MS.ARRIVAL_TIMEOUT,
  });

  return (
    message ??
    failE2eOperation(
      "receive the password changed mail",
      `no mail with subject "${subject}" reached ${address}`
    )
  );
};
