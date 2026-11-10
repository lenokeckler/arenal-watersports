import { vi } from "vitest";

export const stubMailEnvironment = (
  values: Record<string, string>
): void => {
  Object.entries(values).forEach(([name, value]) =>
    vi.stubEnv(name, value)
  );
};
