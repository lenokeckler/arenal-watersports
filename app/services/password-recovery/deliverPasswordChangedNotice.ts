import type { MailTransport } from "@/app/services/mail";
import { sendPasswordChangedNotice } from "./sendPasswordChangedNotice";

export const deliverPasswordChangedNotice = async (
  workerId: string,
  transport?: MailTransport
): Promise<void> => {
  await sendPasswordChangedNotice(
    workerId,
    transport
  ).catch(() => undefined);
};
