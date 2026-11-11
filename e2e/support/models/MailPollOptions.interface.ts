import type { MailpitMessage } from "./MailpitMessage.interface";

export interface MailPollOptions {
  read: () => Promise<MailpitMessage[]>;
  timeoutMs: number;
}
