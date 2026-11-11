import { setTimeout as pause } from "node:timers/promises";
import { E2E_MAIL_WAIT_MS } from "../constants/E2ePasswordRecovery.constants";
import type { MailPollOptions } from "./models/MailPollOptions.interface";
import type { MailpitMessage } from "./models/MailpitMessage.interface";

export const pollMail = async ({
  read,
  timeoutMs,
}: MailPollOptions): Promise<MailpitMessage[]> => {
  const deadline = Date.now() + timeoutMs;
  let messages = await read();

  while (messages.length === 0 && Date.now() < deadline) {
    await pause(E2E_MAIL_WAIT_MS.POLL_INTERVAL);
    messages = await read();
  }

  return messages;
};
