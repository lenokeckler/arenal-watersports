export interface ErrorResponse {
  success: false;
  error: string;
  field?: string;
  details?: Record<string, unknown>;
}
