import type { MailpitMessage } from "./models/MailpitMessage.interface";

export const readMessageRecipients = (
  message: MailpitMessage
): string[] => message.To.map(({ Address }) => Address);
