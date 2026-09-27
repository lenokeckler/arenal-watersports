import { STRING } from "@/app/constants";

export const formatMessages = (
  messages: string | string[] | undefined
) => {
  if (Array.isArray(messages)) {
    return messages.join(STRING.SPACE);
  }
  return messages;
};
