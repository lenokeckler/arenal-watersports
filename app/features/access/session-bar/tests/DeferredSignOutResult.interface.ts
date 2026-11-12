import type { SignOutThisDeviceResult } from "@/app/services/authentication/models/SignOutThisDeviceResult.interface";

export interface DeferredSignOutResult {
  promise: Promise<SignOutThisDeviceResult>;
  resolve: (result: SignOutThisDeviceResult) => void;
}
