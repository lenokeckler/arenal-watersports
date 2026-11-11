import type { ClientHeaders } from "../models/ClientHeaders.interface";

export const createStubHeaders = (
  values: Record<string, string>
): ClientHeaders => ({
  get: (name) => values[name] ?? null,
});
