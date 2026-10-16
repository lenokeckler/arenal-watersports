import { E2E_MAILPIT } from "../constants/E2ePasswordRecovery.constants";
import { fetchMailpitJson } from "./fetchMailpitJson";
import type { MailpitMessage } from "./models/MailpitMessage.interface";
import type { MailpitMessageList } from "./models/MailpitMessageList.interface";

export const listMailbox = async (): Promise<
  MailpitMessage[]
> => {
  const { messages } =
    await fetchMailpitJson<MailpitMessageList>(
      `${E2E_MAILPIT.BASE_URL}${E2E_MAILPIT.MESSAGES_PATH}`
    );

  return messages;
};
