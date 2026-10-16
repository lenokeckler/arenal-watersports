import { E2E_MAIL_WAIT_MS } from "../constants/E2ePasswordRecovery.constants";
import { E2E_NOTICE_MAIL_ERROR } from "../constants/E2ePasswordRecoveryReset.constants";
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
      E2E_NOTICE_MAIL_ERROR.OPERATION,
      E2E_NOTICE_MAIL_ERROR.MISSING(address, subject)
    )
  );
};
