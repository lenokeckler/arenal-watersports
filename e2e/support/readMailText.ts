import { E2E_MAILPIT } from "../constants/E2ePasswordRecovery.constants";
import { fetchMailpitJson } from "./fetchMailpitJson";
import type { MailpitMessageBody } from "./models/MailpitMessageBody.interface";

export const readMailText = async (
  messageId: string
): Promise<string> => {
  const { Text } =
    await fetchMailpitJson<MailpitMessageBody>(
      `${E2E_MAILPIT.BASE_URL}${E2E_MAILPIT.MESSAGE_PATH}/${messageId}`
    );

  return Text;
};
