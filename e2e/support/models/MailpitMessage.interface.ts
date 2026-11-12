import type { MailpitRecipient } from "./MailpitRecipient.interface";

export interface MailpitMessage {
  ID: string;
  Subject: string;
  To: MailpitRecipient[];
}
