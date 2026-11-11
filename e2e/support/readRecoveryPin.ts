import { PASSWORD_RESET_PIN } from "@/app/constants";
import {
  E2E_MAIL_LINE_BREAK,
  E2E_MAILPIT,
} from "../constants/E2ePasswordRecovery.constants";
import { failE2eOperation } from "./failE2eOperation";
import { fetchMailpitJson } from "./fetchMailpitJson";
import { listMailTo } from "./listMailTo";
import type { MailpitMessageBody } from "./models/MailpitMessageBody.interface";

export const readRecoveryPin = async (
  address: string
): Promise<string> => {
  const [message] = await listMailTo(address);

  if (!message) {
    return failE2eOperation(
      "read the recovery PIN",
      `no mail to ${address}`
    );
  }

  const { Text } =
    await fetchMailpitJson<MailpitMessageBody>(
      `${E2E_MAILPIT.BASE_URL}${E2E_MAILPIT.MESSAGE_PATH}/${message.ID}`
    );
  const pin = Text.split(E2E_MAIL_LINE_BREAK)
    .map((line) => line.trim())
    .find((line) => PASSWORD_RESET_PIN.PATTERN.test(line));

  return (
    pin ??
    failE2eOperation(
      "read the recovery PIN",
      "no PIN line in the mail"
    )
  );
};
