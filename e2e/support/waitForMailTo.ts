import { E2E_MAIL_WAIT_MS } from "../constants/E2ePasswordRecovery.constants";
import { listMailTo } from "./listMailTo";
import type { MailpitMessage } from "./models/MailpitMessage.interface";
import { pollMail } from "./pollMail";

export const waitForMailTo = (
  address: string,
  timeoutMs: number = E2E_MAIL_WAIT_MS.ARRIVAL_TIMEOUT
): Promise<MailpitMessage[]> =>
  pollMail({ read: () => listMailTo(address), timeoutMs });
