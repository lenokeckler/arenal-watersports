import { act } from "@testing-library/react";
import type { Deferred } from "./Deferred.interface";

export const settleDeferred = <T>(
  deferred: Deferred<T>,
  value: T
): Promise<void> =>
  act(async () => {
    deferred.resolve(value);
    await deferred.promise;
  });
