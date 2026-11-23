import type { NullableRef } from "@/app/types";
import { DISPATCH_RADIO_CHANNEL } from "../constants/DispatchSheet.constants";

export const parseRadioChannel = (
  text: string
): NullableRef<number> => {
  const trimmed = text.trim();

  if (!DISPATCH_RADIO_CHANNEL.PATTERN.test(trimmed)) {
    return null;
  }

  const channel = Number(trimmed);

  return channel >= DISPATCH_RADIO_CHANNEL.MIN &&
    channel <= DISPATCH_RADIO_CHANNEL.MAX
    ? channel
    : null;
};
