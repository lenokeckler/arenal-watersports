import { REALTIME } from "../constants/Realtime.constants";

let subscriptionCount = 0;

export const buildRealtimeChannelName = (
  channelName: string
): string => {
  subscriptionCount += 1;

  return `${channelName}${REALTIME.CHANNEL_SEPARATOR}${subscriptionCount}`;
};
