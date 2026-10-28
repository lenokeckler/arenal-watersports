import type { SignOutThisDeviceResult } from "@/app/services/authentication/models/SignOutThisDeviceResult.interface";
import type { DeferredSignOutResult } from "./DeferredSignOutResult.interface";

export const deferSignOutResult =
  (): DeferredSignOutResult => {
    let resolveResult: DeferredSignOutResult["resolve"] =
      () => undefined;
    const promise = new Promise<SignOutThisDeviceResult>(
      (resolve) => {
        resolveResult = resolve;
      }
    );

    return {
      promise,
      resolve: (result) => resolveResult(result),
    };
  };
