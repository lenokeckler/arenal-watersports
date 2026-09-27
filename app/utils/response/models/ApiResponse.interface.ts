import type { SuccessResponse } from "./SuccessResponse.interface";
import type { ErrorResponse } from "./ErrorResponse.interface";

export type ApiResponse<T = Record<string, unknown>> =
  SuccessResponse<T> | ErrorResponse;
