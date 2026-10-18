import {
  buildPasswordChangedMail,
  createSmtpMailTransport,
  type MailTransport,
} from "@/app/services/mail";
import { readWorkerPersonalEmail } from "./readWorkerPersonalEmail";

export const sendPasswordChangedNotice = async (
  workerId: string,
  transport?: MailTransport
): Promise<void> => {
  const personalEmail =
    await readWorkerPersonalEmail(workerId);

  if (!personalEmail) {
    return;
  }

  const send = transport ?? createSmtpMailTransport();

  await send(buildPasswordChangedMail({ personalEmail }));
};
