import type { MailMessage } from "./MailMessage.interface";

export type MailTransport = (
  message: MailMessage
) => Promise<void>;
