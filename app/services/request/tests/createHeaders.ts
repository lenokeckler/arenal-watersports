import type { ClientHeaders } from "../models/ClientHeaders.interface";

export const createHeaders = (
  values: Record<string, string>
): ClientHeaders => new Headers(values);
