import { E2E_MAILPIT } from "../constants/E2ePasswordRecovery.constants";
import { fetchMailpitJson } from "./fetchMailpitJson";
import type { MailpitMessage } from "./models/MailpitMessage.interface";
import type { MailpitMessageList } from "./models/MailpitMessageList.interface";

export const listMailTo = async (
  address: string
): Promise<MailpitMessage[]> => {
  const query = new URLSearchParams({
    [E2E_MAILPIT.SEARCH_PARAM]: `${E2E_MAILPIT.RECIPIENT_QUERY}${address}`,
  });
  const { messages } =
    await fetchMailpitJson<MailpitMessageList>(
      `${E2E_MAILPIT.BASE_URL}${E2E_MAILPIT.SEARCH_PATH}?${query}`
    );

  return messages;
};
