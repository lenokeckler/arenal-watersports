import type { NetworkKeyError } from "../NetworkKeyError";

export const captureNetworkKeyError = (
  action: () => unknown
): NetworkKeyError => {
  try {
    action();
  } catch (error) {
    return error as NetworkKeyError;
  }

  throw new Error("expected the action to throw");
};
