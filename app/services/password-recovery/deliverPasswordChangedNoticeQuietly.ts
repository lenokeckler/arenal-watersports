import type { MailTransport } from "@/app/services/mail";
import { sendPasswordChangedNotice } from "./sendPasswordChangedNotice";

export const deliverPasswordChangedNoticeQuietly = async (
  workerId: string,
  transport?: MailTransport
): Promise<void> => {
  await sendPasswordChangedNotice(
    workerId,
    transport
  ).catch(() => undefined);
};
