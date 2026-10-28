import type { NetworkKeyErrorCode } from "@/app/constants";

export class NetworkKeyError extends Error {
  readonly code: NetworkKeyErrorCode;

  constructor(
    code: NetworkKeyErrorCode,
    options?: ErrorOptions
  ) {
    super(code, options);
    this.name = "NetworkKeyError";
    this.code = code;
  }
}
