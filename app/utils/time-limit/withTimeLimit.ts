import { TIME_LIMIT } from "@/app/constants";
import type { TimeLimited } from "./models/TimeLimited.type";

export const withTimeLimit = <Value>(
  pending: Promise<Value>,
  limitMs: number
): Promise<TimeLimited<Value>> =>
  new Promise<TimeLimited<Value>>((resolve, reject) => {
    const timer = setTimeout(
      () => resolve(TIME_LIMIT.REACHED),
      limitMs
    );

    pending.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (reason: unknown) => {
        clearTimeout(timer);
        reject(reason);
      }
    );
  });
