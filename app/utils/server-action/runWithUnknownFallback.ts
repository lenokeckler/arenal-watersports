export const runWithUnknownFallback = async <Input, Result>(
  operation: (input: Input) => Promise<Result>,
  input: Input,
  fallback: Result
): Promise<Result> => {
  try {
    return await operation(input);
  } catch {
    return fallback;
  }
};
