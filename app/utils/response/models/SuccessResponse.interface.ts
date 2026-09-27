export type SuccessResponse<T = Record<string, unknown>> = {
  success: true;
  message?: string;
} & T;
