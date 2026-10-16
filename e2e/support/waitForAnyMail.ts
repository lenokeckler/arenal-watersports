import { E2E_MAIL_WAIT_MS } from "../constants/E2ePasswordRecovery.constants";
import { listMailbox } from "./listMailbox";
import type { MailpitMessage } from "./models/MailpitMessage.interface";
import { pollMail } from "./pollMail";

export const waitForAnyMail = (
  timeoutMs: number = E2E_MAIL_WAIT_MS.QUIET_WINDOW
): Promise<MailpitMessage[]> =>
  pollMail({ read: listMailbox, timeoutMs });
