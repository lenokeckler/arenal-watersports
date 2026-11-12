import { NetworkKeyError } from "../NetworkKeyError";

export const captureNetworkKeyError = (
  action: () => unknown
): NetworkKeyError => {
  try {
    action();
  } catch (error) {
    if (error instanceof NetworkKeyError) {
      return error;
    }

    throw error;
  }

  throw new Error("expected the action to throw");
};
