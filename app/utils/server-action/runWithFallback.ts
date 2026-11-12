export const runWithFallback = async <Input, Result>(
  operation: (input: Input) => Promise<Result>,
  input: Input,
  buildFallback: () => Result
): Promise<Result> => {
  try {
    return await operation(input);
  } catch {
    return buildFallback();
  }
};
