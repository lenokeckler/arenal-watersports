import { failE2eOperation } from "./failE2eOperation";

export const fetchMailpitJson = async <Payload>(
  url: string
): Promise<Payload> => {
  const response = await fetch(url);

  if (!response.ok) {
    return failE2eOperation(
      "read the mailbox",
      `status ${response.status}`
    );
  }

  return (await response.json()) as Payload;
};
