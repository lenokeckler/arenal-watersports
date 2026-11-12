export const createDeferred = <T>() => {
  let resolve = (_value: T): void => undefined;
  let reject = (_error: Error): void => undefined;
  const promise = new Promise<T>(
    (resolvePromise, rejectPromise) => {
      resolve = resolvePromise;
      reject = rejectPromise;
    }
  );

  return { promise, reject, resolve };
};
