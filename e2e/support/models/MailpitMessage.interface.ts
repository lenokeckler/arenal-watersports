export interface MailpitRecipient {
  Address: string;
}

export interface MailpitMessage {
  ID: string;
  Subject: string;
  To: MailpitRecipient[];
}
