import type { Mock } from "vitest";

export const captureArguments = (
  mock: Mock,
  results: unknown[] = [undefined]
): (() => unknown[][]) => {
  const calls: unknown[][] = [];
  const lastResultIndex = results.length - 1;

  mock.mockImplementation((...args: unknown[]) => {
    const result =
      results[Math.min(calls.length, lastResultIndex)];
    calls.push(args);

    return Promise.resolve(result);
  });

  return () => calls;
};
