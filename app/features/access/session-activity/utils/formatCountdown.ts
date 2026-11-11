import { SESSION_ACTIVITY } from "../constants/SessionActivity.constants";

const PAD_DIGIT = "0";

export const formatCountdown = (
  seconds: number
): string => {
  const minutes = Math.floor(
    seconds / SESSION_ACTIVITY.SECONDS_PER_MINUTE
  );
  const remainder = String(
    seconds % SESSION_ACTIVITY.SECONDS_PER_MINUTE
  ).padStart(
    SESSION_ACTIVITY.COUNTDOWN_SECONDS_DIGITS,
    PAD_DIGIT
  );

  return `${minutes}:${remainder}`;
};
