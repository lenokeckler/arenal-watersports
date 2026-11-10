import { expect } from "@playwright/test";
import { E2E_RECOVERY_MAIL_COUNT } from "../constants/E2ePasswordRecovery.constants";
import { readMessageRecipients } from "./readMessageRecipients";
import { waitForDeliveredMail } from "./waitForDeliveredMail";

export const expectSingleMailTo = async (
  address: string
): Promise<void> => {
  const messages = await waitForDeliveredMail(address);

  expect(messages).toHaveLength(
    E2E_RECOVERY_MAIL_COUNT.ONE
  );
  expect(messages.flatMap(readMessageRecipients)).toEqual([
    address,
  ]);
};
