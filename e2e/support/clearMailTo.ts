import { E2E_MAILPIT } from "../constants/E2ePasswordRecovery.constants";
import { failE2eOperation } from "./failE2eOperation";

export const clearMailTo = async (
  address: string
): Promise<void> => {
  const query = new URLSearchParams({
    [E2E_MAILPIT.SEARCH_PARAM]: `${E2E_MAILPIT.RECIPIENT_QUERY}${address}`,
  });
  const response = await fetch(
    `${E2E_MAILPIT.BASE_URL}${E2E_MAILPIT.SEARCH_PATH}?${query}`,
    { method: E2E_MAILPIT.DELETE_METHOD }
  );

  if (!response.ok) {
    failE2eOperation(
      "clear the mailbox",
      `status ${response.status}`
    );
  }
};
