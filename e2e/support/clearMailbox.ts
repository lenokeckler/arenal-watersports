import { E2E_MAILPIT } from "../constants/E2ePasswordRecovery.constants";
import { failE2eOperation } from "./failE2eOperation";

export const clearMailbox = async (): Promise<void> => {
  const response = await fetch(
    `${E2E_MAILPIT.BASE_URL}${E2E_MAILPIT.MESSAGES_PATH}`,
    { method: E2E_MAILPIT.CLEAR_METHOD }
  );

  if (!response.ok) {
    failE2eOperation(
      "clear the mailbox",
      `status ${response.status}`
    );
  }
};
